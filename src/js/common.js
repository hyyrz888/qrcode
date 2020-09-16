import '../css/iframeBox.css';
import Tips from './Lanauage.js'
import './gobal-fun'

console.log(Tips)


window.$loadingImage = '//static.clewm.net/nc/static/cli-loading.a29cbc3c.gif';

var qr_create_quick = [1][0]
//判断浏览器是否支持canvas
var canUseCanvas = !!document.createElement('canvas').getContext;




//创建选区
window.$selectTextareaRange = function (textarea, start, end) {
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

//创建一个类名为url-tip的提示
let areaWrap = document.querySelector('.areaWrap ')
let urlCodeBox = document.querySelector(".urlCodeBox")
let urlTip = document.createElement('div');
urlTip.innerHTML = Tips.TipsClass.AlertTip.urlTip
urlTip.classList.add('url-tip', 'systemInitColor')
urlTip.style.fontSize = '12px'
urlTip.style.display = 'none'
urlTip.style.textAlign = 'center'
areaWrap.appendChild(urlTip);


let totalnum = document.querySelector(".total-num")
let btnCreateQrcode = document.querySelector("#js-create-qrcode")
let emptyTip = document.querySelector(".empty-tip")

//监听输入的方法
export function handleInput(e) {
  //默认输入的不是网址
  var isURL = false
  //过滤输入的非法内容
  var val = e.target.value.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, '');
  if (window.qr_create_quick && qr_create_quick === 1) {
    window.data_info = val;
  }
  //剪切板
  if (val.length == 0) {
    window.$clipboardData = '';
  }

  //判断ctrl+s 或者ctrl+enter
  if (!((e.altKey === true || e.ctrlKey == true) && (e.keyCode == 83 || e.keyCode == 13))) {
    //显示字数
    val ? totalnum.style.display = 'block' : totalnum.style.display = 'none'
  }



  //判断当前输入是否是一个网址
  if (/^(?:(?:https?):\/\/){0,1}(?:[\w.-]+(?:\.[\D\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+)$/igm.test(val)) {
    btnCreateQrcode.classList.add('btn-outline', 'systemBdColor', 'systemColor', 'bg-white')
    isURL = true
    urlTip.style.display = 'block'
    urlCodeBox.style.display = 'inline-block'
  } else {
    urlTip.style.display = 'none'
    btnCreateQrcode.classList.remove('btn-outline', 'systemBdColor', 'systemColor', 'bg-white')
    urlCodeBox.style.display = 'none'
  }

  //判断文字是否超出限制
  if (window.$isOverflowLength(val)) {
    val = window.$replaceOverflowText(val)
    console.log("超出" + val)
  }

  //字数显示
  totalnum.innerHTML = val.length
  //没有输入内容
  if (val.trim() === '' && val == '') {
    emptyTip.style.display = 'block';
    window.$clipboardData = '';
    return;
  }
  // 不为空首先就隐藏该提示
  emptyTip.style.display = 'none';
}

//失去焦点
export function handleBlur() {
  emptyTip.style.display = 'none';
}