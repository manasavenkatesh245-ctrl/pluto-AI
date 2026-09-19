# Pluto — run doc

Two sections: how to reproduce the uncommitted artifacts a fresh checkout needs, and how to
run the dev server. Everything here is a procedure — no secret values are recorded.

---

## 1. Reproducing the uncommitted artifacts

The app source lives in this working tree, but it is **not tracked in this repo's HEAD**:
`src/`, `index.html`, `package.json`, `package-lock.json`, `vite.config.js` and
`jsconfig.json` all show as untracked, and HEAD still carries an older layout (`backend/`,
`docs/API_SPEC.md`, `Dockerfile`, `.freebuff/*` — all deleted in the working tree). A fresh
clone therefore does **not** contain the Pluto app.

1. Treat the working-tree copies of these paths as the source of truth and copy them into any
   new checkout:
   `index.html`, `package.json`, `package-lock.json`, `vite.config.js`, `jsconfig.json`, `src/`
2. **No environment files are needed.** There is deliberately no `.env*` file and no
   build-time key, so there is nothing to copy from the main checkout. The optional AI key is
   entered by hand in the in-app **Session** drawer and stored only in the browser
   (`localStorage` key `pluto.ai.config.v1`).
3. Install dependencies with npm:
   ```bash
   npm install          # or `npm ci` for a frozen install from package-lock.json
   ```
4. This machine's npm gates install scripts, so `npm install` may print:
   ```
   npm warn install-scripts  esbuild@0.21.5 (postinstall: node install.js)
   ```
   The dev server has started fine with that warning unresolved. Only if `npm run dev` fails
   to boot, run `npm install-scripts ls` to review and `npm install-scripts approve esbuild`,
   then reinstall.

---

## 2. Running the dev server

- Package manager: **npm** (lockfile `package-lock.json`).
- Start: `npm run dev`
- Port: **5199**, from `vite.config.js` (`server.port: 5199`, `strictPort: false`,
  `host: true`). With `strictPort: false`, vite silently takes the next free port if 5199 is
  busy — read the `Local:` line in the log rather than assuming.
- URL: `http://localhost:5199/`
- Other scripts: `npm run build` (production build into `dist/`), `npm run typecheck`
  (`tsc --noEmit -p jsconfig.json`), `npm run preview` (serve the built output).

### Detached start on Windows

This host is Windows with Git Bash; POSIX backgrounding (`&`) does not survive the tool call.
Start the server with PowerShell so it outlives the shell:

```bash
powershell -NoProfile -Command "(Start-Process -FilePath 'npm.cmd' -ArgumentList 'run','dev' -RedirectStandardOutput '<log>' -RedirectStandardError '<log>.err' -WindowStyle Hidden -PassThru).Id"
```

- Name the executable exactly (`npm.cmd`, `node.exe`) — `Start-Process` does not resolve
  shell shims like `npm`.
- stdout and stderr must go to **different** files.
- The PowerShell wrapper can hold the calling shell open even though the server detaches, so
  start it with a short timeout and then verify separately:

```bash
# confirm it answers
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:5199/

# the vite node process to register as this thread's preview
powershell -NoProfile -Command "(Get-NetTCPConnection -LocalPort 5199 -State Listen).OwningProcess"
```

Latest preview log for this thread:
`.freebuff/preview-28b3ee64-bcb0-485d-b455-e1cf15e40194.log` (stderr in the matching `.err`).
