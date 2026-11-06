// Skybrief service worker: always loads the newest version of the app, falls back to the saved copy offline.
const SHELL="skybrief-v3";
self.addEventListener("install",e=>{self.skipWaiting()});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==SHELL).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(u.origin!==location.origin||e.request.method!=="GET")return;
  e.respondWith(fetch(e.request,{cache:"no-store"}).then(r=>{if(r.ok){const c=r.clone();caches.open(SHELL).then(s=>s.put(e.request,c))}return r}).catch(()=>caches.match(e.request,{ignoreSearch:true})))});
