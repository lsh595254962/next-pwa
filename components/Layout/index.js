/*
 * @Author: liushuaihao
 * @Date: 2022-04-09 11:16:21
 * @LastEditors: liushuaihao
 * @LastEditTime: 2022-04-09 17:07:12
 * @Description:
 */
import React, { useState } from "react";
import Head from "next/head";
import { Affix } from "antd";
import Header from "../Header";
import Footer from "../Footer";
import Left from "../Left";
import Right from "../Right";
require("./index.less");

export default function Layout({ children, title = "NEXT PWA" }) {
  return (
    <div className="layout-wrap">
      <Head><title>{title}</title></Head>
      <Affix offsetTop={0} className="header-affix">
        <Header />
      </Affix>
      <main className="main container">
        <Left />
        <div className="content-wrap">{children}</div>
        {/* <Right /> */}
      </main>
      <Footer />
    </div>
  );
}
