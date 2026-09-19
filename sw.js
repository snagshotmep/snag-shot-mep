// Snagshot MEP - offline shell.
// Bump CACHE when index.html changes so phones pick up the new build.
const CACHE = 'snagshot-v17';
const SHELL = ['./', 'index.html', 'manifest.json', 'icon-192.png', 'icon-512.png', 'icon-180.png',
  // The page asks for these two by URL even though the build also inlines them;
  // precached so an offline boot never falls back to the whole HTML document.
  '_ds/broadsheet-b8662ea6-805f-4d4d-8d6a-d0f5e9ac98f9/styles.css',
  '_ds/broadsheet-b8662ea6-805f-4d4d-8d6a-d0f5e9ac98f9/_ds_bundle.js'];
// The PDF worker is fetched only when a PDF plan is imported; warm it at install
// so that import works on site with no signal.
const WARM = [
  'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/legacy/build/pdf.min.js',
  'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/legacy/build/pdf.worker.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE)
    .then(c => c.addAll(SHELL).then(() => Promise.all(WARM.map(u => c.add(u).catch(() => {})))))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Cache-first so a visit with no signal still opens the app; anything not in
// the shell (fonts, icon CSS) is cached the first time it loads successfully.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      if (res && res.status === 200) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match('index.html')))
  );
});
