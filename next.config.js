/*
 * @Author: liushuaihao
 * @Date: 2022-04-09 10:32:50
 * @LastEditors: liushuaihao
 * @LastEditTime: 2022-04-09 16:13:54
 * @Description:
 */
const withOffline = require('next-offline')
const withAntdLess = require("next-plugin-antd-less");

const nextConfig = withAntdLess({
  lessVarsFilePath: "./styles/theme.less",
  lessVarsFilePathAppendToEndOfContent: false,
})

module.exports = withOffline(nextConfig)