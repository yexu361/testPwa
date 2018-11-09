/*importScripts("workbox-sw.js");
var cacheRevision = 'minimal-pwa-6';
var cacheList=[
    {
        url: 'index.html',
        revision: cacheRevision
    },
    {
        url: 'main.css',
        revision: cacheRevision
    },
    {
        url: '155.png',
        revision: cacheRevision
    }
]

workbox.precaching.preacheAndRoute(cacheList);*/

var cacheStorageKey = 'minimal-pwa-56';
var cacheList=[
    '/',
    'index.html',
    'main.css',
    '155.png'
]

self.addEventListener('install',e =>{
    self.skipWaiting();
    e.waitUntil(
        caches.open(cacheStorageKey)
            .then(cache => cache.addAll(cacheList))
    );
});

self.addEventListener('fetch',function(e){
    e.respondWith(
        caches.match(e.request).then(function(response){
            if(response != null){
                return response
            }
            return fetch(e.request.url)
        })
    )
});

self.addEventListener('activate',function(e){
    e.waitUntil(
        //获取所有cache名称
        caches.keys().then(cacheNames => {
            return Promise.all(
                // 获取所有不同于当前版本名称cache下的内容
                cacheNames.filter(cacheNames => {
                    return cacheNames !== cacheStorageKey
                }).map(cacheNames => {
                    return caches.delete(cacheNames)
                })
            )
        }).then(() => {
            return self.clients.claim()
        })
    )
});
