/*
 * @Author: liushuaihao
 * @Date: 2022-04-09 11:19:38
 * @LastEditors: liushuaihao
 * @LastEditTime: 2022-04-09 14:36:40
 * @Description: 顶部
 */
import React, { useState, useEffect } from "react";
require("./index.less");

export default function Header(props) {
  return (
    <div className="header-wrap">
      <div className="header-inner container">
        <h1>Header</h1>
      </div>
    </div>
  );
}
