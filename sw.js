const CACHE='pdf-photo-pin-v12';
const ASSETS=['./','./index.html','./manifest.json'];
const CDN=[
'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js',
'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

function put(req,resp){
 if(resp&&resp.ok){const copy=resp.clone();caches.open(CACHE).then(c=>c.put(req,copy));}
 return resp;
}

self.addEventListener('install',e=>{
 e.waitUntil(
  caches.open(CACHE).then(c=>
   c.addAll(ASSETS).then(()=>Promise.all(CDN.map(u=>
    fetch(u).then(r=>{if(r.ok)return c.put(u,r);}).catch(()=>{})
   )))
  )
 );
 self.skipWaiting();
});

self.addEventListener('activate',e=>e.waitUntil(
 caches.keys()
  .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
  .then(()=>self.clients.claim())
));

self.addEventListener('fetch',e=>{
 const req=e.request;
 if(req.method!=='GET')return;
 const url=new URL(req.url);
 const sameOrigin=url.origin===self.location.origin;
 if(!sameOrigin&&url.hostname!=='cdnjs.cloudflare.com')return;

 // Pagina principale: rete prima (così gli aggiornamenti arrivano subito), cache se offline
 if(req.mode==='navigate'){
  e.respondWith(
   fetch(req).then(resp=>put('./index.html',resp)).catch(()=>caches.match('./index.html'))
  );
  return;
 }

 // File dell'app: dalla cache subito, aggiornati in background
 if(sameOrigin){
  e.respondWith(caches.match(req).then(cached=>{
   const net=fetch(req).then(resp=>put(req,resp)).catch(()=>cached);
   return cached||net;
  }));
  return;
 }

 // Librerie CDN (versione fissata nell'URL): cache prima
 e.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(resp=>put(req,resp))));
});
