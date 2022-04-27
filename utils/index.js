/*
 * @Author: liushuaihao
 * @Date: 2022-04-11 09:56:23
 * @LastEditors: liushuaihao
 * @LastEditTime: 2022-04-13 14:31:31
 * @Description: Notification推送
 */
function createNotify(title, options) {
  var PERMISSON_GRANTED = "granted";
  var PERMISSON_DENIED = "denied";
  var PERMISSON_DEFAULT = "default";

  // 如果用户已经允许，直接显示消息，如果不允许则提示用户授权
  if (Notification.permission === PERMISSON_GRANTED) {
    notify(title, options);
  } else {
    Notification.requestPermission(function (res) {
      if (res === PERMISSON_GRANTED) {
        notify(title, options);
      }
    });
  }
}
// 显示提示消息
function notify($title, $options) {
  var notification = new Notification($title, $options);
  console.log(notification);
  notification.onshow = function (event) {
    console.log("show : ", event);
  };
  notification.onclose = function (event) {
    console.log("close : ", event);
  };
  notification.onclick = function (event) {
    console.log("click : ", event);
    // 当点击事件触发，打开指定的url
    window.open(event.target.data);
    notification.close();
  };
}
function uint8ArrayToBase64(arr) {
  return window.btoa(String.fromCharCode.apply(null, new Uint8Array(arr)));
}
export { createNotify, uint8ArrayToBase64 };
