/*
 * @Author: liushuaihao
 * @Date: 2022-04-09 11:03:16
 * @LastEditors: liushuaihao
 * @LastEditTime: 2022-04-09 16:04:16
 * @Description: List Page
 */
import React, { useState, useEffect } from "react";
import Layout from "components/Layout";
import Link from "next/link";
export default function List(props) {
  return (
    <Layout title="PWA LIST PAGE">
      <h1>PWA LIST PAGE</h1>
      <Link href="/detail/aiyidetail">
        <a title="detail page">detail Page</a>
      </Link>
    </Layout>
  );
}
