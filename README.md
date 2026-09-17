# snag-shot-mep

Site photo filing for MEP engineers. A progressive web app: it installs to the
home screen, runs with no signal, and keeps every photo on the phone until the
engineer exports a ZIP.

## Putting it online

1. Sign in at github.com and press **New repository**.
2. Name it `snag-shot-mep`. Leave it **Public** — GitHub Pages will not serve a
   private repository on a free account. Public does not mean listed: nothing
   links to it and it will not appear in search.
3. On the empty repository page choose **uploading an existing file**.
4. Drag in every file from this folder: `index.html`, `manifest.webmanifest`,
   `sw.js`, `icon-180.png`, `icon-192.png`, `icon-512.png`, and this README.
   Do not put them in a subfolder.
5. Press **Commit changes**.
6. Go to **Settings -> Pages**. Under *Branch* pick `main` and `/ (root)`, then
   **Save**.
7. Wait two or three minutes. The address appears at the top of that same page:
   `https://snagshotmep.github.io/snag-shot-mep/`

## Installing it on a phone

Open the address in Chrome (Android) or Safari (iPhone), then **Add to Home
Screen**. It gets the Snagshot icon and opens without browser bars.

Allow the camera when asked. Hosted over https the app shoots through its own
viewfinder — no bounce out to the phone's camera app.

## Updating it later

Replace `index.html` with a new build and bump the `CACHE` name in `sw.js`
(`snagshot-v1` -> `snagshot-v2`). Phones pick the update up the next time they
open the app with signal. Without the bump they keep serving the cached copy.

## What each file does

- `index.html` - the whole app, self-contained.
- `manifest.webmanifest` - name, icon and colours used when installing.
- `sw.js` - the offline cache. Without it the app needs signal to open.
- `icon-*.png` - home screen and tab icons.
