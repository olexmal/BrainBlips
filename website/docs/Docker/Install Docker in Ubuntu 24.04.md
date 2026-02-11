1. Update the package index:  
    ```bash  
    sudo apt update  
    ```  
2. Install the latest version of Docker Engine, containerd, and Docker Compose:  
    ```bash  
    sudo apt install docker.io docker-compose -y  
    ```  
3. Verify that Docker Engine is installed correctly:  
    ```bash  
    sudo systemctl status docker  
    ```  
4. Enable Docker service to start on boot:  
    ```bash  
    sudo systemctl enable docker.service  
    ```  
5. Add your user to the "docker" group to run Docker commands without sudo:  
      
    ```bash  
    sudo usermod -aG docker $USER  
    ```  
6. Log out and log back in for the group changes to take effect. After logging back in, verify that you can run `docker` commands without `sudo`:  
      
    ```bash  
    docker run hello-world  
    ```