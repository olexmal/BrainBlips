#!/usr/bin/env node
/**
 * ClickUp Sync Script
 * Retrieves full workspace hierarchy and tasks from ClickUp API, writes to docs/clickup/
 * with same structure (Workspace -> Space -> Folder -> List).
 *
 * Requires: CLICKUP_API_KEY (personal API token starting with pk_)
 */

const API_BASE = 'https://api.clickup.com/api/v2';
const DOCS_BASE = 'docs/clickup';

function sanitize(name) {
  return String(name)
    .replace(/[/\\:*?"<>|]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase() || 'unnamed';
}

async function fetchApi(path, token) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    headers: { Authorization: token },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`ClickUp API ${res.status}: ${text}`);
  }
  return res.json();
}

async function getTeams(token) {
  const data = await fetchApi('/team', token);
  return data.teams || [];
}

async function getSpaces(teamId, token) {
  const data = await fetchApi(`/team/${teamId}/space`, token);
  return (data.spaces || []).filter((s) => !s.archived);
}

async function getFolders(spaceId, token) {
  const data = await fetchApi(`/space/${spaceId}/folder`, token);
  return (data.folders || []).filter((f) => !f.archived);
}

async function getFolderLists(folderId, token) {
  const data = await fetchApi(`/folder/${folderId}/list`, token);
  return (data.lists || []).filter((l) => !l.archived);
}

async function getSpaceLists(spaceId, token) {
  const data = await fetchApi(`/space/${spaceId}/list`, token);
  return (data.lists || []).filter((l) => !l.archived);
}

async function getListTasks(listId, token, includeClosed = true) {
  const tasks = [];
  let page = 0;
  while (true) {
    const params = new URLSearchParams({
      page: String(page),
      include_closed: String(includeClosed),
    });
    const data = await fetchApi(`/list/${listId}/task?${params}`, token);
    const list = data.tasks || [];
    tasks.push(...list);
    if (list.length < 100) break;
    page++;
  }
  return tasks;
}

function formatDueDate(ts) {
  if (!ts) return '-';
  const d = new Date(Number(ts));
  return isNaN(d.getTime()) ? '-' : d.toLocaleDateString();
}

function formatPriority(p) {
  const map = { 1: 'Urgent', 2: 'High', 3: 'Normal', 4: 'Low' };
  return map[p] || '-';
}

function formatAssignee(assignees) {
  if (!assignees?.length) return '-';
  return assignees.map((a) => a.username || a.email || '?').join(', ');
}

function buildListMarkdown(listName, tasks, listId) {
  const lines = [`# ${listName}`, ''];
  if (tasks.length === 0) {
    lines.push('*No tasks.*');
    return lines.join('\n');
  }
  lines.push('| Task | Status | Assignee | Due | Priority |');
  lines.push('|------|--------|----------|-----|----------|');
  for (const t of tasks) {
    const name = (t.name || '').replace(/\|/g, '\\|');
    const status = t.status?.status || '-';
    const assignee = formatAssignee(t.assignees);
    const due = formatDueDate(t.due_date);
    const priority = formatPriority(t.priority?.priority);
    const url = t.url ? ` [↗](${t.url})` : '';
    lines.push(`| ${name}${url} | ${status} | ${assignee} | ${due} | ${priority} |`);
  }
  return lines.join('\n');
}

async function main() {
  const token = process.env.CLICKUP_API_KEY;
  if (!token) {
    console.error('Error: CLICKUP_API_KEY environment variable is required.');
    console.error('Get your token at: https://app.clickup.com/settings/apps');
    process.exit(1);
  }

  const fs = await import('fs');
  const path = await import('path');

  const teams = await getTeams(token);
  if (teams.length === 0) {
    console.error('No workspaces found.');
    process.exit(1);
  }

  const entries = []; // { workspaceName, spaceName, folderName?, list, pathParts }
  const sidebarNodes = []; // for _sidebar.md

  for (const team of teams) {
    const workspaceName = team.name || 'Workspace';
    const spaces = await getSpaces(team.id, token);
    for (const space of spaces) {
      const spaceName = space.name || 'Space';
      const spacePath = [sanitize(workspaceName), sanitize(spaceName)];
      // Folderless lists
      const folderlessLists = await getSpaceLists(space.id, token);
      for (const list of folderlessLists) {
        entries.push({
          workspaceName,
          spaceName,
          folderName: null,
          list,
          pathParts: [...spacePath, sanitize(list.name)],
        });
      }
      // Folders and their lists
      const folders = await getFolders(space.id, token);
      for (const folder of folders) {
        const folderName = folder.name || 'Folder';
        const folderPath = [...spacePath, sanitize(folderName)];
        const lists = await getFolderLists(folder.id, token);
        for (const list of lists) {
          entries.push({
            workspaceName,
            spaceName,
            folderName,
            list,
            pathParts: [...folderPath, sanitize(list.name)],
          });
        }
      }
    }
  }

  const baseDir = path.join(process.cwd(), DOCS_BASE);
  fs.mkdirSync(baseDir, { recursive: true });

  // Create README at workspace/space/folder levels for Docsify navigation
  const dirsWithReadme = new Set([baseDir]);
  for (const { pathParts } of entries) {
    for (let i = 1; i < pathParts.length; i++) {
      const dir = path.join(baseDir, pathParts.slice(0, i).join('/'));
      if (!dirsWithReadme.has(dir)) {
        dirsWithReadme.add(dir);
        fs.mkdirSync(dir, { recursive: true });
        const title = pathParts[i - 1].replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
        fs.writeFileSync(path.join(dir, 'README.md'), `# ${title}\n\n*Lists in this section are in the sidebar.*\n`, 'utf8');
      }
    }
  }

  let listsWritten = 0;
  for (const { list, pathParts } of entries) {
    const tasks = await getListTasks(list.id, token);
    const content = buildListMarkdown(list.name, tasks, list.id);
    const relPath = pathParts.join('/');
    const dir = path.join(baseDir, pathParts.slice(0, -1).join('/'));
    const filePath = path.join(baseDir, relPath + '.md');
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(filePath, content, 'utf8');
    listsWritten++;
    console.log(`Wrote ${relPath}.md (${tasks.length} tasks)`);
  }

  // Build sidebar structure
  const sidebarSections = new Map(); // workspace -> space -> folder? -> lists
  for (const e of entries) {
    const w = sanitize(e.workspaceName);
    const s = sanitize(e.spaceName);
    const f = e.folderName ? sanitize(e.folderName) : null;
    const listName = e.list.name;
    const listSlug = sanitize(listName);
    const relPath = e.pathParts.join('/');
    if (!sidebarSections.has(w)) sidebarSections.set(w, { name: e.workspaceName, spaces: new Map() });
    const ws = sidebarSections.get(w);
    if (!ws.spaces.has(s)) ws.spaces.set(s, { name: e.spaceName, folders: new Map(), directLists: [] });
    const sp = ws.spaces.get(s);
    if (f) {
      if (!sp.folders.has(f)) sp.folders.set(f, { name: e.folderName, lists: [] });
      sp.folders.get(f).lists.push({ name: listName, path: relPath });
    } else {
      sp.directLists.push({ name: listName, path: relPath });
    }
  }

  const sidebarLines = [];
  for (const [wKey, ws] of sidebarSections) {
    sidebarLines.push(`  * [${ws.name}](${DOCS_BASE}/${wKey}/)`);
    for (const [sKey, sp] of ws.spaces) {
      sidebarLines.push(`    * [${sp.name}](${DOCS_BASE}/${wKey}/${sKey}/)`);
      for (const list of sp.directLists) {
        sidebarLines.push(`      * [${list.name}](${DOCS_BASE}/${list.path})`);
      }
      for (const [fKey, folder] of sp.folders) {
        sidebarLines.push(`      * [${folder.name}](${DOCS_BASE}/${wKey}/${sKey}/${fKey}/)`);
        for (const list of folder.lists) {
          sidebarLines.push(`        * [${list.name}](${DOCS_BASE}/${list.path})`);
        }
      }
    }
  }

  const syncTime = new Date().toISOString();
  const readmeContent = `# ClickUp Sync

Synced from ClickUp workspace(s) via API.

**Last sync:** ${syncTime}

**Lists:** ${listsWritten}
`;
  fs.writeFileSync(path.join(baseDir, 'README.md'), readmeContent, 'utf8');

  const sidebarPath = path.join(process.cwd(), 'docs', '_sidebar.md');
  let sidebarMd = fs.readFileSync(sidebarPath, 'utf8');
  const clickupSection = `* [ClickUp](${DOCS_BASE}/)
${sidebarLines.join('\n')}
`;
  if (sidebarMd.includes('* [ClickUp]')) {
    sidebarMd = sidebarMd.replace(
      /\* \[ClickUp\]\([^)]+\)[\s\S]*?(?=\* \[|\n\* \[|$)/,
      clickupSection
    );
  } else {
    sidebarMd = sidebarMd.trimEnd() + '\n\n' + clickupSection;
  }
  fs.writeFileSync(sidebarPath, sidebarMd, 'utf8');

  console.log(`\nDone. ${listsWritten} lists synced to ${DOCS_BASE}/`);
  console.log('Updated docs/_sidebar.md');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
