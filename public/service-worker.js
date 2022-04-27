/*
 * @Author: liushuaihao
 * @Date: 2022-04-09 16:54:20
 * @LastEditors: liushuaihao
 * @LastEditTime: 2022-04-20 14:01:19
 * @Description: service-worker
 */
// SW上下文
console.log("self", self);
let cacheName = "aiyaPWA-v1";

// 缓存静态文件
self.addEventListener("install", (e) => {
  let contentToCache = [
    "/",
    "/manifest.json",
    "/favicon.ico",
    // "/img/logo/144x144.png",
    // "/img/logo/152x152.png",
    // "/img/logo/192x192.png",
    // "/img/logo/256x256.png",
  ];
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log("contentToCache", contentToCache);
      return cache.addAll(contentToCache);
    })
  );
});
self.addEventListener("fetch", function (e) {
  e.respondWith(
    caches.match(e.request).then(function (r) {
      // console.log("[Service Worker] Fetching resource: " + e.request.url);
      return (
        r ||
        fetch(e.request).then(function (response) {
          return caches.open(cacheName).then(function (cache) {
            console.log("[Service Worker] Caching new resource: " + e.request.url);
            cache.put(e.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});

const keyList = ["aiyaPWA-v1"];

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          if (cacheName.indexOf(key) === -1) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// 监听 push 事件
self.addEventListener("push", function (e) {
  if (!e.data) {
    return;
  }
  // 解析获取推送消息
  let payload = e.data.json();
  console.log('e',e.data.json());
  // 根据推送消息生成桌面通知并展现出来
  let promise = self.registration.showNotification(payload.msg, {
    body: payload.msg,
    // icon: payload.icon,
    data: {
      url: payload.url,
    },
  });
  e.waitUntil(promise);
});

// 监听通知点击事件
self.addEventListener("notificationclick", function (e) {
  console.log('e',e);
  console.log('e',e.data.json());
  // 关闭窗口
  e.notification.close();
  // 打开网页
  e.waitUntil(clients.openWindow(e.url));
});
