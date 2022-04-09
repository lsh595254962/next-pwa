/*
 * @Author: liushuaihao
 * @Date: 2022-04-09 10:32:50
 * @LastEditors: liushuaihao
 * @LastEditTime: 2022-04-09 17:06:57
 * @Description:
 */
import React, { useEffect } from "react";
import Head from "next/head";
require("styles/globals.less");

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      // register service worker
      navigator.serviceWorker.register("/service-worker.js");
    }
  }, []);

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
