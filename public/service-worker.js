/*
 * @Author: liushuaihao
 * @Date: 2022-04-09 16:54:20
 * @LastEditors: liushuaihao
 * @LastEditTime: 2022-04-09 17:26:25
 * @Description: service-worker.js
 */
const version = "0.0.1",
  CACHE = version + "::AiYaMember",
  installFilesEssential = ["/", "/manifest.json", "/favicon.ico", "/512.png"];

// install static assets
function installStaticFiles() {
  return caches.open(CACHE).then((cache) => {
    return cache.addAll(installFilesEssential);
  });
}

function clearOldCaches() {
  return caches.keys().then((keylist) => {
    return Promise.all(keylist.filter((key) => key !== CACHE).map((key) => caches.delete(key)));
  });
}

self.addEventListener("install", (event) => {
  event.waitUntil(installStaticFiles().then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clearOldCaches().then(() => self.clients.claim()));
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  let url = event.request.url;
  event.respondWith(
    caches.open(CACHE).then((cache) => {
      return cache.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then((newreq) => {
            console.log("network fetch: " + url);
            if (newreq.ok) cache.put(event.request, newreq.clone());
            return newreq;
          })
          .catch(() => null);
      });
    })
  );
});
