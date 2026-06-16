---
title: Simple K3s Cluster Setup
sidebar_position: 1
---

# Complete Tutorial: Configuring a 3‑Node K3s Cluster (1 Master + 2 Workers) with a Static‑IP Load Balancer and Portainer CE Web UI

This step‑by‑step guide walks you through setting up a lightweight Kubernetes cluster using K3s. It covers everything you requested: prerequisites, SSH setup, node installation, a load balancer with 10 static IPs, remote `kubectl` access, add‑ons, troubleshooting, systemd management, clean uninstall, and **Portainer CE** as your web-based management UI.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Chapter 1: Configure SSH Passwordless Authentication Between the Three Nodes](#chapter-1-configure-ssh-passwordless-authentication-between-the-three-nodes)
- [Chapter 2: Create the Master Node](#chapter-2-create-the-master-node)
- [Chapter 3: Create the Two Worker Nodes and Join Them to the Master](#chapter-3-create-the-two-worker-nodes-and-join-them-to-the-master)
- [Chapter 4: Add a Load Balancer with 10 Static IPs to the Cluster](#chapter-4-add-a-load-balancer-with-10-static-ips-to-the-cluster)
- [Chapter 5: Install the Kubernetes Client on Your Local Linux Machine and Access the Cluster Remotely](#chapter-5-install-the-kubernetes-client-on-your-local-linux-machine-and-access-the-cluster-remotely)
- [Chapter 6: Deploy Portainer CE as Your Web-Based Management UI](#chapter-6-deploy-portainer-ce-as-your-web-based-management-ui)
- [Add-ons (Optional)](#add-ons-optional)
- [Troubleshooting](#troubleshooting)
- [Uninstalling K3s](#uninstalling-k3s)
- [Systemd Service Management](#systemd-service-management)
- [Official Documentation References](#official-documentation-references)

---

## Prerequisites

Before you begin, ensure the following requirements are met on all three nodes:

- **Operating System** – Any modern Linux distribution (Ubuntu 22.04 LTS is used in this guide).
- **Unique Hostnames** – Each node must have a distinct hostname. Set them with:
  ```bash
  sudo hostnamectl set-hostname node1   # on the first node
  sudo hostnamectl set-hostname node2   # on the second
  sudo hostnamectl set-hostname node3   # on the third
  ```
- **Static IP Addresses** – Each node must have a fixed IP address. Example:
  - `node1` (master+worker): `192.168.1.10`
  - `node2` (worker): `192.168.1.11`
  - `node3` (worker): `192.168.1.12`
- **Hostname Resolution** – Either configure a DNS server or add entries to `/etc/hosts` on every node so that each hostname resolves to the correct IP:
  ```bash
  echo "192.168.1.10 node1" | sudo tee -a /etc/hosts
  echo "192.168.1.11 node2" | sudo tee -a /etc/hosts
  echo "192.168.1.12 node3" | sudo tee -a /etc/hosts
  ```
- **Disable Swap** – Kubernetes requires swap to be disabled. Run:
  ```bash
  sudo swapoff -a
  sudo sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab   # permanently disable
  ```
- **Firewall Rules** – Open the required ports for K3s communication. The exact commands depend on your firewall (e.g., `ufw`, `firewalld`). For `ufw` on Ubuntu:
  ```bash
  # On all nodes:
  sudo ufw allow 8472/udp          # VXLAN overlay
  sudo ufw allow 10250/tcp         # kubelet metrics
  # On the master node only:
  sudo ufw allow 6443/tcp          # Kubernetes API server
  sudo ufw enable
  ```
  > For other firewalls, refer to the [K3s networking requirements](https://docs.k3s.io/installation/requirements#networking).

- **Time Synchronisation** – Ensure NTP or `chrony` is running to avoid certificate issues.
- **Root or sudo access** – All commands should be run with `sudo` or as the root user.
- **Default StorageClass** – Portainer requires a default StorageClass for data persistence. Check if you have one:
  ```bash
  kubectl get sc
  ```
  Look for `(default)` after a StorageClass name. If none is set, designate one:
  ```bash
  kubectl patch storageclass <storage-class-name> -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
  ```
  Replace `<storage-class-name>` with your actual StorageClass name.

---

## Chapter 1: Configure SSH Passwordless Authentication Between the Three Nodes

Passwordless SSH is needed so that you can conveniently copy files (e.g., the kubeconfig) and run commands across nodes. You can set up SSH from your **admin machine** to all nodes, and also from the master to the workers.

### 1.1 Generate an SSH key (on your local admin machine or directly on `node1`)

```bash
ssh-keygen -t ed25519 -C "k3s-admin"
```

### 1.2 Copy the public key to all three nodes

```bash
ssh-copy-id root@192.168.1.10   # node1
ssh-copy-id root@192.168.1.11   # node2
ssh-copy-id root@192.168.1.12   # node3
```
(Replace `root` with your actual username if you are not using the root account.)

### 1.3 (Optional) From `node1`, copy the key to the workers

If you plan to run commands from `node1` to the workers, do this:

```bash
# On node1
ssh-copy-id root@192.168.1.11
ssh-copy-id root@192.168.1.12
```

### 1.4 Verify passwordless login

Test each connection:

```bash
ssh root@node1 "hostname"
ssh root@node2 "hostname"
ssh root@node3 "hostname"
```

You should see the respective hostnames without being prompted for a password.

---

## Chapter 2: Create the Master Node

The master node runs the K3s server (control plane) and also acts as a worker by default (you can disable this with `--disable-agent` if needed, but we keep it for this test environment).

### 2.1 Install K3s on the master (`node1`)

SSH into `node1` and run the installation script with the server option:

```bash
curl -sfL https://get.k3s.io | sh -s - server \
  --write-kubeconfig-mode 644 \
  --disable=traefik   # Optional: remove Traefik to reduce resource usage
```

- `--write-kubeconfig-mode 644` makes the generated kubeconfig readable by non‑root users, which simplifies copying it later.
- `--disable=traefik` is recommended if you don't need the default ingress controller; you can install an alternative later.

> **Official reference:** [K3s installation script](https://docs.k3s.io/installation)

### 2.2 Verify the K3s service is running

```bash
sudo systemctl status k3s
```

You should see `active (running)`.

### 2.3 Retrieve the node token

The token is needed for workers to join the cluster. Save it somewhere secure.

```bash
sudo cat /var/lib/rancher/k3s/server/node-token
```

Example output: `K10a8f7c...::server:...`

### 2.4 Check cluster status

```bash
kubectl get nodes
```

You should see `node1` with the `Ready` status.

---

## Chapter 3: Create the Two Worker Nodes and Join Them to the Master

On **`node2`** and **`node3`**, install K3s in agent mode, providing the master URL and the token.

### 3.1 Install K3s agent on `node2`

```bash
curl -sfL https://get.k3s.io | K3S_URL=https://192.168.1.10:6443 \
  K3S_TOKEN=<YOUR_TOKEN> sh -
```

Replace `<YOUR_TOKEN>` with the token obtained from the master.

### 3.2 Repeat the same command on `node3`

```bash
curl -sfL https://get.k3s.io | K3S_URL=https://192.168.1.10:6443 \
  K3S_TOKEN=<YOUR_TOKEN> sh -
```

### 3.3 Verify the worker nodes have joined

Back on the master (`node1`), run:

```bash
kubectl get nodes
```

The output should show all three nodes with `Ready` status:

```
NAME    STATUS   ROLES                  AGE   VERSION
node1   Ready    control-plane,master   5m    v1.28.x+k3s1
node2   Ready    <none>                 1m    v1.28.x+k3s1
node3   Ready    <none>                 1m    v1.28.x+k3s1
```

> If a node is stuck `NotReady`, check the firewall rules and swap status. You can also examine the logs with `sudo journalctl -u k3s-agent` on the worker.

---

## Chapter 4: Add a Load Balancer with 10 Static IPs to the Cluster

K3s includes a built‑in service load balancer (klipper‑lb) that can assign external IPs to Services of type `LoadBalancer`. By default, it uses IPs from the node's network range. To restrict it to a specific pool of **10 static IPs**, you configure the `--service-lb-ip-range` parameter.

### 4.1 Configure the master's K3s server to use a fixed IP range

Since we already installed K3s, we can add the setting to the configuration file and restart.

On `node1`, create or edit `/etc/rancher/k3s/config.yaml`:

```bash
sudo mkdir -p /etc/rancher/k3s
sudo tee /etc/rancher/k3s/config.yaml <<EOF
service-lb-ip-range: 192.168.1.240-192.168.1.249
EOF
```

> Adjust the IP range to match your network. These IPs must be unused and routeable within your network.

### 4.2 Restart the K3s server to apply the change

```bash
sudo systemctl restart k3s
```

### 4.3 Deploy a test application and expose it with a LoadBalancer Service

```bash
kubectl create deployment nginx --image=nginx:alpine
kubectl expose deployment nginx --type=LoadBalancer --port=80 --target-port=80
```

### 4.4 Check the assigned external IP

```bash
kubectl get svc nginx
```

You should see an `EXTERNAL-IP` from your defined range, e.g., `192.168.1.240`.

### 4.5 Verify the load balancer works

From any machine that can reach that IP, run:

```bash
curl http://192.168.1.240
```

You should get the Nginx welcome page.

> **Note:** The K3s load balancer automatically allocates the first available IP from the range. If you need a specific IP, you can set `spec.loadBalancerIP` in the Service manifest.

**Official reference:** [K3s Service Load Balancer](https://docs.k3s.io/networking/service-lb)

---

## Chapter 5: Install the Kubernetes Client on Your Local Linux Machine and Access the Cluster Remotely

You can manage the cluster from your personal workstation by installing `kubectl` and copying the kubeconfig from the master.

### 5.1 Install `kubectl` on your local Linux machine

Follow the official instructions:

```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl
sudo mv kubectl /usr/local/bin/
```

**Official reference:** [Install and Set Up kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/)

### 5.2 Copy the kubeconfig from the master to your local machine

```bash
mkdir -p ~/.kube
scp root@node1:/etc/rancher/k3s/k3s.yaml ~/.kube/config
```

### 5.3 Update the kubeconfig to use the master's real IP

Open `~/.kube/config` with a text editor and change the `server` line from:

```
server: https://127.0.0.1:6443
```

to:

```
server: https://192.168.1.10:6443
```

(Use the actual IP address of your master node.)

### 5.4 Test remote access

```bash
kubectl get nodes
```

You should see the same node list as on the master.

### 5.5 (Optional) Set the `KUBECONFIG` environment variable permanently

Add this to your `~/.bashrc`:

```bash
export KUBECONFIG=~/.kube/config
```

Then reload with `source ~/.bashrc`.

---

## Chapter 6: Deploy Portainer CE as Your Web-Based Management UI

Portainer CE is a powerful, open-source web UI for managing containers and Kubernetes clusters. Portainer consists of two elements: the **Portainer Server** and the **Portainer Agent**. Both run as lightweight containers on Kubernetes.

### 6.1 Prerequisites for Portainer

Before deploying Portainer, ensure:

- You have **cluster admin rights** on your Kubernetes cluster.
- Kubernetes **RBAC is enabled and working**.
- A **default StorageClass** is configured for data persistence (see the [Prerequisites](#prerequisites) section for how to set one).
- (Optional) The **Metrics Server** is installed if you want to use resource metrics within Portainer.

### 6.2 Deploy Portainer CE using Helm (Recommended)

Helm is the recommended way to deploy Portainer CE on Kubernetes.

**Step 1: Install Helm** (if not already installed):

```bash
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
chmod 700 get_helm.sh
./get_helm.sh
```

**Step 2: Add the Portainer Helm repository and update**:

```bash
helm repo add portainer https://portainer.github.io/k8s/
helm repo update
```

**Official reference:** [Portainer Helm repository](https://docs.portainer.io/sts/start/install-ce/server/kubernetes/baremetal#deploy-using-helm)

**Step 3: Choose how to expose the Portainer service**

Portainer can be exposed via **LoadBalancer**, **NodePort**, or **Ingress**. Since you have a static IP pool from Chapter 4, using a **LoadBalancer** is the most straightforward option.

**Option A: Expose via LoadBalancer (Recommended)**

Portainer will be available at an assigned Load Balancer IP on port `9000` for HTTP and `9443` for HTTPS:

```bash
helm upgrade --install --create-namespace -n portainer portainer portainer/portainer \
  --set service.type=LoadBalancer \
  --set image.tag=lts
```

By default, Portainer generates and uses a self-signed SSL certificate to secure port `9443`. You can optionally provide your own SSL certificate.

**Option B: Expose via NodePort**

Portainer will be available on port `30777` for HTTP and `30779` for HTTPS:

```bash
helm upgrade --install --create-namespace -n portainer portainer portainer/portainer \
  --set service.type=NodePort \
  --set image.tag=lts
```

**Option C: Expose via Ingress (with ClusterIP)**

If you have an Ingress controller (e.g., NGINX Ingress) installed, you can expose Portainer via Ingress:

```bash
helm upgrade --install --create-namespace -n portainer portainer portainer/portainer \
  --set service.type=ClusterIP \
  --set tls.force=true \
  --set image.tag=lts \
  --set ingress.enabled=true \
  --set ingress.ingressClassName=<ingressClassName (eg: nginx)> \
  --set ingress.annotations."nginx\.ingress\.kubernetes\.io/backend-protocol"=HTTPS \
  --set ingress.hosts[0].host=<fqdn (eg: portainer.example.io)> \
  --set ingress.hosts[0].paths[0].path="/"
```

### 6.3 Verify the Portainer deployment

Check that the Portainer pod is running:

```bash
kubectl get pods -n portainer
```

Check the Service to get the external IP (if using LoadBalancer):

```bash
kubectl get svc -n portainer
```

Look for the `portainer` service. If you used `service.type=LoadBalancer`, you should see an `EXTERNAL-IP` from your static IP pool (e.g., `192.168.1.242`).

### 6.4 Access the Portainer Web UI

Open your web browser and navigate to:

- **HTTP:** `http://<EXTERNAL-IP>:9000` (if using LoadBalancer) or `http://<NODE-IP>:30777` (if using NodePort)
- **HTTPS:** `https://<EXTERNAL-IP>:9443` (if using LoadBalancer) or `https://<NODE-IP>:30779` (if using NodePort)

> **Note:** If you are using a self-signed certificate, your browser will show a security warning. You can safely proceed for testing purposes.

### 6.5 Create the admin user

On your first visit to the Portainer UI, you will be prompted to **create an admin user**. Follow the on-screen instructions to set a username and password.

Once logged in, select your **Kubernetes environment** (the cluster you just deployed) and you will have full web-based management capabilities for your K3s cluster.

### 6.6 (Optional) Pin Portainer to a specific node

In a multi-node cluster, if the Portainer pod is terminated and rescheduled on a different node, persistent data using `hostPath` volumes may be lost. To avoid this, you can pin the Portainer pod to a specific node using a `nodeSelector`:

```bash
helm upgrade --install --create-namespace -n portainer portainer portainer/portainer \
  --set service.type=LoadBalancer \
  --set image.tag=lts \
  --set nodeSelector."kubernetes\.io/hostname"=<YOUR_NODE_NAME>
```

Replace `<YOUR_NODE_NAME>` with the name of your master node (e.g., `node1`).

**Official reference:** [Portainer installation documentation](https://docs.portainer.io/sts/start/install-ce/server/kubernetes/baremetal)

---

## Add-ons (Optional)

You can extend your cluster with useful add‑ons.

### A. Metrics Server – Resource Metrics API

Metrics Server provides `kubectl top` and is required for Horizontal Pod Autoscalers. It is also recommended if you want to use resource metrics within Portainer.

```bash
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

If you encounter TLS errors (self‑signed certificates), you may need to add `--kubelet-insecure-tls` to the Metrics Server deployment args. Refer to the [official Metrics Server installation guide](https://github.com/kubernetes-sigs/metrics-server#installation) for details.

### B. Helm – Kubernetes Package Manager

Helm helps you deploy and manage applications.

**Install Helm on your local machine (or on the master):**

```bash
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
chmod 700 get_helm.sh
./get_helm.sh
```

**Official reference:** [Installing Helm](https://helm.sh/docs/intro/install/)

---

## Troubleshooting

| Problem | Likely Cause & Solution |
| :------ | :---------------------- |
| **Worker fails to join** | - Incorrect token: re‑copy the token from the master.<br>- Firewall blocking port 8472/UDP or 6443/TCP – open them.<br>- Swap is still enabled – disable it.<br>- Hostname resolution fails – check `/etc/hosts`. |
| **Nodes stay `NotReady`** | - Kubelet not running: `sudo systemctl status k3s-agent` on workers, `k3s` on master.<br>- CNI issues – check overlay network logs: `sudo journalctl -u k3s` (master) or `k3s-agent` (worker). |
| **LoadBalancer IP not assigned** | - The IP range may be already in use or not routable – use `kubectl describe svc` to see events.<br>- Did you restart the master after adding `service-lb-ip-range`? |
| **Remote `kubectl` cannot connect** | - Master's API server is not reachable – ensure firewall allows TCP 6443 from your local IP.<br>- Kubeconfig still points to `127.0.0.1` – update it with the actual IP.<br>- Check that the master is listening on all interfaces (it does by default). |
| **Portainer deployment fails** | - No default StorageClass – set one as described in the [Prerequisites](#prerequisites) section.<br>- Insufficient permissions – ensure you have cluster admin rights.<br>- Metrics Server not installed (if you enabled metrics). |
| **Portainer pod restarts with empty volume** | - In a multi-node cluster with `hostPath` volumes, the pod may reschedule on a different node and lose data. Pin the pod to a specific node using `nodeSelector` as shown in Chapter 6.6. |
| **Certificate errors** | - Time skew between nodes – synchronise with NTP.<br>- For self‑signed certs, you may need to trust the CA (or use `--insecure-skip-tls-verify` for testing, but not recommended). |

General diagnostic commands:

- **View logs on master:** `sudo journalctl -u k3s -f`
- **View logs on worker:** `sudo journalctl -u k3s-agent -f`
- **Check K3s service status:** `sudo systemctl status k3s` / `k3s-agent`
- **Inspect cluster events:** `kubectl get events --all-namespaces`
- **Check Portainer logs:** `kubectl logs -n portainer deployment/portainer`

---

## Uninstalling K3s

To completely remove K3s from a node, use the built‑in uninstall scripts. They are automatically placed during installation.

- **On the master node (server):**
  ```bash
  sudo /usr/local/bin/k3s-uninstall.sh
  ```

- **On a worker node (agent):**
  ```bash
  sudo /usr/local/bin/k3s-agent-uninstall.sh
  ```

These scripts stop the services, remove the binaries, and delete all cluster data.

**To uninstall Portainer CE:**

```bash
helm uninstall -n portainer portainer
kubectl delete namespace portainer
```

---

## Systemd Service Management

K3s is installed as a systemd service on all nodes. You can manage it with standard systemd commands.

### On the Master Node

- **Start:** `sudo systemctl start k3s`
- **Stop:** `sudo systemctl stop k3s`
- **Restart:** `sudo systemctl restart k3s`
- **Status:** `sudo systemctl status k3s`
- **Enable at boot:** `sudo systemctl enable k3s` (already enabled by default)

### On Worker Nodes

- **Start:** `sudo systemctl start k3s-agent`
- **Stop:** `sudo systemctl stop k3s-agent`
- **Restart:** `sudo systemctl restart k3s-agent`
- **Status:** `sudo systemctl status k3s-agent`

---

## Official Documentation References

All steps in this tutorial are based on official sources. For further details, consult:

- **K3s Installation:** [https://docs.k3s.io/installation](https://docs.k3s.io/installation)
- **K3s Networking (Service LB):** [https://docs.k3s.io/networking/service-lb](https://docs.k3s.io/networking/service-lb)
- **K3s Configuration:** [https://docs.k3s.io/installation/configuration](https://docs.k3s.io/installation/configuration)
- **K3s Uninstall:** [https://docs.k3s.io/installation/uninstall](https://docs.k3s.io/installation/uninstall)
- **kubectl Installation:** [https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/)
- **Helm Installation:** [https://helm.sh/docs/intro/install/](https://helm.sh/docs/intro/install/)
- **Metrics Server:** [https://github.com/kubernetes-sigs/metrics-server#installation](https://github.com/kubernetes-sigs/metrics-server#installation)
- **Portainer CE Installation:** [https://docs.portainer.io/sts/start/install-ce/server/kubernetes/baremetal](https://docs.portainer.io/sts/start/install-ce/server/kubernetes/baremetal)
- **Portainer Helm Chart Configuration:** [https://docs.portainer.io/sts/advanced/helm-chart-configuration-options](https://docs.portainer.io/sts/advanced/helm-chart-configuration-options)