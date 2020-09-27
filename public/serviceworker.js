const CACHE_NAME = 'version-1';
const urlsToCache = ['index.html', 'offline.html'];
const self = this;

//Install Service Worker
self.addEventListener('install', (event)=>{
    event.waitUntill(
        caches.open(CACHE_NAME)
            .then((cache)=>{
                console.log('opened catche');
                return cache.addAll(urlsToCache);
            })
    )
});


//Listen for request
self.addEventListener('fetch', (event)=>{
    event.respondWith(
        caches.match(event.request)
        .then(()=>{
            return fetch(event.request)
            .catch(()=> caches.match('offline.html'))
        })
    )
});

//activate the SW
self.addEventListener('activate', (event)=>{
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);
    event.waitUntill(
        caches.keys()
        .then((cacheNames)=>Promise.all(
            cacheNames.map((cacheName)=>{
                if(!cacheWhitelist.includes(cacheName)){
                    return caches.delete(cacheName);
                }
            })
        ))
    )
});