/*
 * @Author: liushuaihao
 * @Date: 2022-04-09 11:03:57
 * @LastEditors: liushuaihao
 * @LastEditTime: 2022-04-09 14:26:06
 * @Description: Home Page
 */
import Layout from "components/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout title="PWA HOME PAGE">
      <h1>PWA HOME PAGE</h1>
      <Link href='/list'><a title="list page">List Page</a></Link>
    </Layout>
  );
}
