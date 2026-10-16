# Ziqian Zhang — personal homepage

Plain HTML/CSS/JS, no build step.

| File | What it is |
|---|---|
| `content.js` | **All the content.** Edit this to update the site. |
| `assets/resume.pdf` | Copy of the CV in `Leozz04/codex-ziqian/projects/resume/`. Don't edit by hand, see below. |
| `assets/style.css` | Look and feel. |
| `main.js`, `index.html` | Rendering. Rarely need changes. |

## Updating the resume

The source PDF lives in the private repo `Leozz04/codex-ziqian` at
`projects/resume/Ziqian_Zhang_Resume_2027_Corrected.pdf`. Visitors can't open a private repo,
so the site serves its own copy.

- **By hand:** `./scripts/update-resume.sh` downloads the latest PDF with `gh`, and commits and pushes it if it changed.
- **Automatically (optional):** `.github/workflows/sync-resume.yml` does the same every day at 12:00 UTC.
  It needs a repo secret `RESUME_TOKEN`: create a fine-grained token at GitHub → Settings → Developer settings →
  Fine-grained tokens, with *Repository access* = only `codex-ziqian` and *Contents* = Read-only,
  then add it at this repo → Settings → Secrets and variables → Actions. Without the secret the job does nothing.

If the PDF's file name changes, update `SRC_PATH` in both the script and the workflow.

## Preview locally

```bash
python3 -m http.server 8000
```
Then open http://localhost:8000.

## Deploy on GitHub Pages (free, URL: https://leozz04.github.io)

1. Create a **public** repo named exactly `Leozz04.github.io`.
2. Push this folder's contents to its `main` branch:
   ```bash
   git init && git add . && git commit -m "Initial homepage"
   git branch -M main
   git remote add origin https://github.com/Leozz04/Leozz04.github.io.git
   git push -u origin main
   ```
3. Repo → Settings → Pages → Source: *Deploy from a branch*, branch `main`, folder `/ (root)`.
4. Wait ~1 minute, then open https://leozz04.github.io.

Every later `git push` updates the site automatically.

### Custom domain (optional)
Buy a domain (e.g. `ziqianzhang.com`), add a `CNAME` file containing just the domain,
point DNS at GitHub Pages (4 A records 185.199.108–111.153, or a CNAME to `leozz04.github.io`),
then set it under Settings → Pages → Custom domain and tick *Enforce HTTPS*.
