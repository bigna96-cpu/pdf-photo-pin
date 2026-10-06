const CACHE='pdf-photo-pin-v5';
const ASSETS=['./','./index.html','./manifest.json','./sw.js'];
const CDN=[
'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js',
'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];
self.addEventListener('install',e=>{
 e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS).then(()=>Promise.all(CDN.map(u=>fetch(u).then(r=>c.put(u,r.clone())).catch(()=>{}))))));
 self.skipWaiting();
});
self.addEventListener('activate',e=>e.waitUntil(
 caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())
));
self.addEventListener('fetch',e=>{
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{
   if(e.request.method==='GET' && (e.request.url.startsWith(self.location.origin)||e.request.url.includes('cdnjs.cloudflare.com'))){
     const copy=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));
   }
   return resp;
 }).catch(()=>caches.match('./index.html'))));
});
