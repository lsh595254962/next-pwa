import React, { useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import { uint8ArrayToBase64 } from 'utils'
require("styles/globals.less");

export default function MyApp({ Component, pageProps }) {
  const vapidKeys = {
    publicKey: "BAc6_3oTh-ZX0Fz1VdhOZ_fvslJs4ySBEfI2GdVNgZzQourWh87Zfzr8tG3PJCpsJkPpVe44dA171Yr_aZLIZvE",
    privateKey: "tEIw-7R-RGqkGxZka7UHMqqYVdj0aeZ0It2NpFqNXHA",
  };

  // base64 编码后的字符串，需要将其转换成 Uint8Array 格式
  const base64ToUint8Array = (base64String) => {
    let padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    let base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
    let rawData = window.atob(base64);
    let outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; i++) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };
  useEffect(() => {
    // 订阅推送服务
    subscribe();
  }, []);
  const subscribe = async () => {
    // 判断浏览器是否支持 Service Worker
    if ("serviceWorker" in navigator) {
      let registration = await navigator.serviceWorker.register("/service-worker.js");
      let pushSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: base64ToUint8Array(vapidKeys.publicKey),
      });
      await sendSubscriptionToServer(pushSubscription);
    }
  };
  const sendSubscriptionToServer = (pushSubscription) => {
    axios({
      method: "post",
      url: "http://localhost:6868/subscription",
      data: JSON.stringify({
        endpoint: pushSubscription.endpoint,
        keys: {
          p256dh: uint8ArrayToBase64(pushSubscription.getKey("p256dh")),
          auth: uint8ArrayToBase64(pushSubscription.getKey("auth")),
        },
      }),
      headers: { "Content-Type": "application/json" },
    });
  };
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
