// import gobal from 'css-loader?modules=true!../css/gobal.css'
// import gobal from 'css-loader?modules!../css/gobal.css'
import common from '../css/common.css'
import index from '../css/index.less'
import $ from 'jquery'
console.log(index)
import './common.js'
console.log($)
//头部
const html = `
            <div class="${index.nav}">aaa</div><button>aaa</button>
`
let header = document.querySelector("#md-header");


let btn = document.querySelector('button')
btn.addEventListener('click', function () {
  alert('a')
})



console.log('我是首页的js')

