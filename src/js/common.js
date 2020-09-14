import '../css/iframeBox.css';
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


//监听输入的方法
export function handleInput(e) {
  var isURL = false
  let iptcon = document.querySelector('#text-content')
  let totalnum = document.querySelector(".total-num")
  //过滤输入的非法内容
  var val = e.target.value.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, '');
  if (window.qr_create_quick && qr_create_quick === 1) {
    window.data_info = val;
  }

  //判断ctrl+s 或者ctrl+enter
  if (!((e.altKey === true || e.ctrlKey == true) && (e.keyCode == 83 || e.keyCode == 13))) {
    //显示字数
    val ? totalnum.style.display = 'block' : totalnum.style.display = 'none'
  }

  //判断当前输入是否是一个网址

}