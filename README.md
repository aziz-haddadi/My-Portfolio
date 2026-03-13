# Pulgaa Portfolio

> Mohamed Aziz Haddadi's Cybersecurity Portfolio — Node.js + Express + EJS MVC with Markdown content management.

## 🚀 Quick Start

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000)

For live reload during development:
```bash
npm run dev
```

---

## 📁 Project Structure

```
pulgaa-portfolio/
├── app.js                    # Express entry point
├── package.json
├── .env                      # Environment variables (PORT)
│
├── routes/                   # Express route definitions
│   ├── index.js
│   ├── writeups.js
│   ├── walkthroughs.js
│   └── projects.js
│
├── controllers/              # Route logic, passes data to views
│   ├── homeController.js
│   ├── writeupsController.js
│   ├── walkthroughsController.js
│   └── projectsController.js
│
├── models/                   # Reads & parses .md files
│   └── postModel.js
│
├── views/                    # EJS templates
│   ├── partials/
│   │   ├── head.ejs
│   │   ├── nav.ejs
│   │   └── footer.ejs
│   ├── index.ejs             # Home page
│   ├── 404.ejs
│   ├── writeups/
│   │   ├── index.ejs         # Listing page
│   │   └── post.ejs          # Individual post
│   ├── walkthroughs/
│   │   ├── index.ejs
│   │   └── post.ejs
│   └── projects/
│       └── index.ejs
│
├── content/                  # ← DROP YOUR .md FILES HERE
│   ├── writeups/
│   │   ├── securinets-ctf-2025.md
│   │   └── qnqsec-ctf-2025.md
│   ├── walkthroughs/
│   │   └── memory-forensics-volatility.md
│   └── projects/
│       └── dfir-automation.md
│
└── public/                   # Static assets
    ├── css/
    │   ├── style.css
    │   └── hljs-theme.css
    ├── js/
    │   └── script.js
    └── images/
        └── profile.jpg
```

---

## ✍️ How to Add New Content

### Adding a New CTF Writeup

1. Create a file in `content/writeups/your-slug.md`
2. Add frontmatter at the top:

```yaml
---
title: "HackTheBox — MachineNameXXX"
date: "2025-06-01"
category: "CTF Writeup"
tags: ["HTB", "Linux", "Privilege Escalation", "Web"]
difficulty: "Medium"
cover: "/images/covers/machinename.png"
description: "Brief summary of this writeup shown on the listing page."
stats: "5 flags • Medium difficulty"
---
```
3. Write your writeup below the frontmatter in standard Markdown.
4. **Add images** in a folder that matches your slug: `content/writeups/your-slug/`
5. Save the file — no server restart needed (file is read on each request).
6. Access it at: `http://localhost:3000/writeups/your-slug`

### Adding a New Walkthrough

Same process, but drop the file in `content/walkthroughs/your-slug.md`.  
Put walkthrough images in `content/walkthroughs/your-slug/`.  
Access at: `http://localhost:3000/walkthroughs/your-slug`

### Adding a New Project

Drop a file in `content/projects/project-slug.md`.  
Access at: `http://localhost:3000/projects`

---

## 🖼️ Using Images in Posts

Each post can have its own **images folder** named after its slug.

### Folder Structure

```
content/
├── writeups/
│   ├── securinets-ctf-2025.md        ← the post
│   └── securinets-ctf-2025/          ← images folder (same name as slug)
│       ├── disk-image.png
│       ├── registry-key.png
│       └── malware-strings.png
├── walkthroughs/
│   ├── memory-forensics-volatility.md
│   └── memory-forensics-volatility/
│       └── volatility-output.png
└── projects/
    ├── dfir-automation.md
    └── dfir-automation/
        └── demo-screenshot.png
```

### Referencing Images in Markdown

Use this URL pattern inside your `.md` file:

```markdown
![Description](/content-images/writeups/your-slug/filename.png)
![Registry Key](/content-images/writeups/securinets-ctf-2025/registry-key.png)
![Volatility Output](/content-images/walkthroughs/memory-forensics-volatility/volatility-output.png)
```

The pattern is always:  
`/content-images/<type>/<slug>/<filename>`

> **No server restart required** — just drop the images in the folder and reference them in the markdown.

---

## 📝 Frontmatter Fields Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ | Post title |
| `date` | string (YYYY-MM-DD) | ✅ | Used for sorting |
| `category` | string | ✅ | Used in filter bar |
| `tags` | array of strings | ✅ | Used in filter bar |
| `difficulty` | `Easy` / `Medium` / `Hard` / `Insane` | ⬜ | For writeups only |
| `cover` | string (URL or path) | ⬜ | Cover image for post header |
| `description` | string | ✅ | Shown on the listing card |
| `stats` | string | ⬜ | Extra info shown on card footer |

---

## 🎨 Code Syntax Highlighting

Use fenced code blocks with a language hint:

````markdown
```bash
python3 vol.py -f memory.dmp windows.pslist
```

```python
import volatility3
```

```powershell
Get-Process | Where-Object { $_.Name -eq "malware" }
```
````

Supported languages: bash, powershell, python, javascript, sql, yaml, xml, json, and [200+ more](https://highlightjs.org/static/demo/).

---

## 🔗 URL Structure

| URL | Description |
|-----|-------------|
| `/` | Home page (hero, about, CTF, certs, contact) |
| `/writeups` | All writeups listing (with tag/category filter) |
| `/writeups/:slug` | Individual writeup post |
| `/walkthroughs` | All walkthroughs listing |
| `/walkthroughs/:slug` | Individual walkthrough |
| `/projects` | Projects listing |

---

## 🖼️ Profile Photo

Place your profile photo at:  
```
public/images/profile.jpg
```

---

## 🌐 Deployment

For production deployment (Vercel, Railway, Render, VPS):

1. Set `PORT` environment variable
2. Run `npm start`

For **Vercel** with Express, add a `vercel.json`:
```json
{
  "version": 2,
  "builds": [{ "src": "app.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "app.js" }]
}
```
