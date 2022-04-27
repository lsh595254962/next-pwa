/*
 * @Author: liushuaihao
 * @Date: 2022-04-09 11:03:57
 * @LastEditors: liushuaihao
 * @LastEditTime: 2022-04-13 15:20:29
 * @Description: Home Page
 */
import { useEffect } from "react";
import Layout from "components/Layout";
import Link from "next/link";
import axios from "axios";
import { createNotify } from "utils";

export default function Home() {
  // useEffect(() => {
  //   axios.get("http://apidoc-s.crov.com/app/mock/121/api/v1/homeData").then((res) => {
  //     // console.log(res);
  //   });
  // }, []);

  return (
    <Layout title="PWA HOME PAGE">
      <h1>PWA HOME PAGE</h1>
      <hr />
      <div className="link-wrap">
        <span style={{ marginRight: 30 }}>去列表页</span>
        <Link href="/list">
          <a title="list page">List Page</a>
        </Link>
      </div>
      <hr />
      <div className="notification">
        <span style={{ marginRight: 30 }}>推动通知</span>
        <button
          onClick={() =>
            createNotify("新的消息", {
              body: "您有一个消息待查看",
              icon: "https://www.baidu.com/favicon.ico",
              data: "https://www.baidu.com/",
            })
          }
        >
          Notification
        </button>
      </div>
    </Layout>
  );
}
