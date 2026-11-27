// Snagshot MEP - offline shell.
// CACHE carries the build number: a new build gets a new cache, and phones
// switch over the next time they open the app with signal.
const CACHE = 'snagshot-v21';

// The app cannot open offline without these, so the install fails loudly if
// any is missing rather than leaving a half-cached app behind.
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon-180.png', 'icon-192.png', 'icon-512.png'];

// The PDF reader and its fonts: needed only to import a PDF plan. Each is
// cached on its own, so one missing file can never stop the app installing.
const OPTIONAL = [
    "vendor/pdfjs/pdf.min.js",
    "vendor/pdfjs/pdf.worker.min.js",
    "vendor/pdfjs/standard_fonts/FoxitDingbats.pfb",
    "vendor/pdfjs/standard_fonts/FoxitFixed.pfb",
    "vendor/pdfjs/standard_fonts/FoxitFixedBold.pfb",
    "vendor/pdfjs/standard_fonts/FoxitFixedBoldItalic.pfb",
    "vendor/pdfjs/standard_fonts/FoxitFixedItalic.pfb",
    "vendor/pdfjs/standard_fonts/FoxitSerif.pfb",
    "vendor/pdfjs/standard_fonts/FoxitSerifBold.pfb",
    "vendor/pdfjs/standard_fonts/FoxitSerifBoldItalic.pfb",
    "vendor/pdfjs/standard_fonts/FoxitSerifItalic.pfb",
    "vendor/pdfjs/standard_fonts/FoxitSymbol.pfb",
    "vendor/pdfjs/standard_fonts/LiberationSans-Bold.ttf",
    "vendor/pdfjs/standard_fonts/LiberationSans-BoldItalic.ttf",
    "vendor/pdfjs/standard_fonts/LiberationSans-Italic.ttf",
    "vendor/pdfjs/standard_fonts/LiberationSans-Regular.ttf"
  ];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE)
    .then(c => c.addAll(SHELL).then(() => Promise.all(OPTIONAL.map(u => c.add(u).catch(() => {})))))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('snagshot-') && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Cache-first, so a visit with no signal still opens the app. Only a page
// navigation falls back to the app shell; a missing script or font is
// reported as missing, never answered with the HTML page.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || !req.url.startsWith(self.location.origin)) return;
  e.respondWith(
    caches.match(req, { ignoreSearch: req.mode === 'navigate' }).then(hit => hit || fetch(req).then(res => {
      if (res && res.status === 200 && res.type === 'basic') {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
      }
      return res;
    }).catch(() => req.mode === 'navigate'
      ? caches.match('index.html')
      : new Response('', { status: 504, statusText: 'Offline' })))
  );
});
