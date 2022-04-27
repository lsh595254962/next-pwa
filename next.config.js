/*
 * @Author: liushuaihao
 * @Date: 2022-04-09 10:32:50
 * @LastEditors: liushuaihao
 * @LastEditTime: 2022-04-12 16:29:19
 * @Description:
 */
const withAntdLess = require("next-plugin-antd-less");

module.exports = withAntdLess({
  lessVarsFilePath: "./styles/theme.less",
  lessVarsFilePathAppendToEndOfContent: false,
})
