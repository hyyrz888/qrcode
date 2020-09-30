//建立选区
export function selectTextareaRange (textarea, start, end) {
  if (typeof textarea.createTextRange != 'undefined') {
    console.log('我是ie浏览器')
    var range = textarea.createTextRange();
    // 先把相对起点移动到0处
    range.moveStart("character", 0)
    range.moveEnd("character", 0);
    range.collapse(true); // 移动插入光标到start处
    range.moveEnd("character", end);
    range.moveStart("character", start);
    range.select();
  } else if (typeof textarea.setSelectionRange != 'undefined') {
    textarea.setSelectionRange(start, end);
    textarea.focus();
  }
}

//防抖函数
export function debounce(func, delay) {
  let delays = delay || 500,
    timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delays)
  }
}

//格式化时间
export function formatDate(date, fmt) {

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  let o = {
    'M+': date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };

  for (let k in o) {
    // console.log(`(${k})`);
    // (M+)
    // (d+)
    // (h+)
    // (m+)
    // (s+)
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      //yyyy-MM-dd  如果只传入一个字母  比如h:m:s  那么直接直接用o[k]
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padleftZero(str));
    }
  }
  return fmt;
}

function padleftZero(str) {
  return ('00' + str).substr(str.length);
}