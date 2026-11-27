# snag-shot-mep

Site photo filing for MEP engineers (build 21). It's a progressive web app: it installs to the home screen and runs with no signal. Photos are kept on the phone until the engineer exports a ZIP, and for 14 days after that.

## Putting it online (first time)

1. Sign in at github.com and press **New repository**.
2. Name it `snag-shot-mep` and leave it **Public**. GitHub Pages won't serve a private repository on a free account. The repository only holds the app's code, never any photos.
3. On the empty repository page choose **uploading an existing file**.
4. Open this `site` folder on your computer, select **everything inside it** (the files *and* the `vendor` folder), and drag the lot into the upload box. Keep the `vendor` folder as a folder; don't open it and drag its contents.
5. Press **Commit changes**, then check the repository's front page lists exactly what's in the table below.
6. Go to **Settings → Pages**. Under *Branch* pick `main` and `/ (root)`, then **Save**.
7. Wait two or three minutes. The address appears at the top of that page, for example `https://<your-user-name>.github.io/snag-shot-mep/`.

| Must be in the repository | What it does |
| --- | --- |
| `index.html` | The whole app, self-contained |
| `manifest.webmanifest` | Name, icon and colours used when installing |
| `sw.js` | The offline cache. Without it the app needs signal to open |
| `icon-180.png`, `icon-192.png`, `icon-512.png` | Home screen and tab icons |
| `vendor/pdfjs/` (2 scripts, `standard_fonts/`, `LICENSE`) | Reads PDF plans on the phone, offline |
| `README.md` | This file |

## Installing it on your Pixel

1. Open the address in **Chrome**.
2. Chrome menu (⋮) → **Install app** (or **Add to Home screen**). Open Snagshot from the home screen icon from then on, not from a Chrome tab.
3. Allow the camera when asked.
4. In Snagshot, open **Settings → Photo safety**. It should say *Protected*. If it doesn't, tap **Ask Android again**. Installed apps are normally granted protection straight away.
5. Before the first site visit, open the app once with signal. That caches everything, including the PDF reader, so it all works in a basement.

## Updating it later

Upload the new `index.html` and `sw.js` over the old ones (and anything else that changed), then commit. Each build's `sw.js` carries its own cache name, so phones pick up the update the next time they open the app with signal. **Settings** shows the build number and says when an update is waiting.

## Where photos live, and how they're kept safe

- Each photo is saved in the app's storage on the phone and read back to check it before it counts as kept.
- **Backup now** (Upload tab) builds a ZIP of the visit so far without closing it. Share it to OneDrive or Drive for a copy off the phone.
- **Build ZIP** checks the finished file entry by entry. **Found it — file the visit** deletes nothing. The full-size photos stay for 14 days, and the ZIP can be rebuilt from **Visit history** until then.
- Clearing Chrome's data for the site, or uninstalling the app, deletes everything held in it. Export or back up first.
