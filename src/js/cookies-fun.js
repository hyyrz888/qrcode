//获取cookie
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) {
    return unescape(arr[2]);
  } else {
    return null;
  }
}
function getCookie(e) {
  var t = document.cookie.match(new RegExp("(^| )" + e + "=([^;]*)(;|$)"));
  return null != t ? t[2] : void 0
}
//写入cookie
function SetCookie(name, value) {
  document.cookie = name + "=" + escape(value);
}
function setCookie(e, t) {
  var o = 30
    , i = new Date;
  i.setTime(i.getTime() + 24 * o * 60 * 60 * 1e3),
    document.cookie = e + "=" + escape(t) + ";expires=" + i.toGMTString()
}
function setCookieWithTime(e, t, o) {
  var i = new Date;
  i.setTime(i.getTime() + 1e3 * o),
    document.cookie = e + "=" + escape(t) + ";expires=" + i.toGMTString()
}

function delCookie(e) {
  var t = new Date;
  t.setTime(t.getTime() - 1);
  var o = getCookie(e);
  null != o && (document.cookie = e + "=" + o + ";expires=" + t.toGMTString())
}
function delCookieNew(e) {
  var t = new Date;
  t.setTime(t.getTime() - 1);
  var o = getCookie(e);
  null != o && (document.cookie = e + "=" + o + ";expires=" + t.toGMTString() + ";domain=" + CLI_DOMAIN + "; path = /")
}