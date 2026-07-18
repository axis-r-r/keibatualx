const CACHE_NAME = "virtual-keiba-rc4-0";
const CORE = ["/", "/index.html", "/manifest.webmanifest", "/icon-192.png", "/icon-512.png"];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE)).catch(()=>{}));
});

self.addEventListener("activate", event => {
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const req=event.request;
  if(req.method!=="GET")return;
  const url=new URL(req.url);
  if(url.pathname.startsWith("/.netlify/functions/")){
    event.respondWith(fetch(req,{cache:"no-store"}));
    return;
  }
  if(req.mode==="navigate" || url.pathname==="/index.html" || url.pathname==="/"){
    event.respondWith((async()=>{
      try{
        const fresh=await fetch(req,{cache:"no-store"});
        const cache=await caches.open(CACHE_NAME);
        cache.put("/index.html",fresh.clone());
        return fresh;
      }catch(error){
        return (await caches.match("/index.html")) || Response.error();
      }
    })());
    return;
  }
  event.respondWith((async()=>{
    const cached=await caches.match(req);
    const network=fetch(req).then(async res=>{
      if(res.ok){const cache=await caches.open(CACHE_NAME);cache.put(req,res.clone());}
      return res;
    }).catch(()=>cached);
    return cached || network;
  })());
});
