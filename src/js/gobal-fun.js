//插入样式
function loadStyleAsync(e) {
  var t = document.getElementsByTagName("head")[0]
    , o = document.createElement("link");
  o.type = "text/css",
    o.rel = "stylesheet",
    o.href = e,
    t.appendChild(o)
}
//插入script
function loadScriptyAsync(e, t) {
  var o = document.createElement("script");
  o.src = e,
    t = t || function () { }
    ,
    o.onload = o.onreadystatechange = function () {
      this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (t(),
        this.onload = this.onreadystatechange = null,
        this.parentNode.removeChild(this))
    }
    ,
    document.getElementsByTagName("head")[0].appendChild(o)
}
//获取地址栏参数
function getParameterByName(e, t) {
  t || (t = window.location.href),
    e = e.replace(/[\[\]]/g, "\\$&");
  var o = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)")
    , i = o.exec(t);
  return i ? i[2] ? decodeURIComponent(i[2].replace(/\+/g, " ")) : "" : null
}
//文字解码后的长度是否超出限制
(function () {
  window.$isOverflowLength = function (str) {
    var s = encodeURI(str).toString().replace(/\%[0-9a-fA-F]{2}/g, 'a').length;
    return s > 2950;
  }

  window.$replaceOverflowText = function (str) {
    var arr = [];
    var ttlen = 0;
    for (var i = 0; i < str.length; i++) {
      var charLen = 0;

      if (str.charCodeAt(i) > 255) {
        charLen = 3;
      } else {
        charLen = 1;
      }
      if ((ttlen + charLen) > 2950) {
        break;
      } else {
        arr.push(str[i]);
        ttlen += charLen;
      }
    }

    return arr.join('');
  };
})();
//防抖函数
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}