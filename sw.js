// Skybrief service worker: keeps the app shell available, always fetches live weather fresh.
const SHELL="skybrief-v1";
self.addEventListener("install",e=>{e.waitUntil(caches.open(SHELL).then(c=>c.addAll(["./","index.html","manifest.json","icon-192.png"])));self.skipWaiting()});
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(u.origin!==location.origin)return;
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(SHELL).then(s=>s.put(e.request,c));return r}).catch(()=>caches.match(e.request)))});
