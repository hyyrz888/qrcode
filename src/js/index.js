// import gobal from 'css-loader?modules=true!../css/gobal.css'
// import gobal from 'css-loader?modules!../css/gobal.css'
import commonCss from '../css/common.css'
import index from '../css/index.less'
import $ from 'jquery'
import { handleInput } from './common.js'

console.log(window)
window.addEventListener('load', function () {
  let iptcon = document.querySelector('#text-content')
  //text-content获取焦点时,全选内容
  iptcon.addEventListener('focus', function () {
    window.$selectTextareaRange(this, 0, iptcon.value.trim().length)
  })


  //监听文字输入
  iptcon.addEventListener('input', handleInput)



  //字数获取
  // iptcon.addEventListener('input', function () {
  //   totalnum.innerHTML = (this.value).trim().length
  // })


  //登陆
  {
    let login = document.querySelector("#loginbtn")
    var type = login.getAttribute('data-type')

  }




})



console.log('我是首页的js')

