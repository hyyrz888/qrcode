//判断浏览器是否过低
import { STATIC_SERVICE } from './constant.js'
import '../css/plugin.css'

import { SetCookie, getCookie } from './cookies-fun'
console.log(STATIC_SERVICE)
var _config = {
  "IE5": {
    "tips": "IE8",
    "reg": /MSIE 5.0/
  },
  "IE6": {
    "tips": "IE8",
    "reg": /MSIE 6.0/
  },
  "IE7": {
    "tips": "IE8",
    "reg": /MSIE 7.0/
  },
  "360": {
    "tips": "IE8",
    "reg": /.NET CLR 3.5.30729; .NET CLR 3.0.30729;/
  },
  "SOGO": {
    "tips": "IE8",
    "reg": /.NET CLR 3.5.30729; .NET CLR 3.0.30729;/
  },
  "OPERA": {
    "tips": "IE8",
    "reg": /KHTML, like Gecko/
  }
}
export function checkBrowser() {
  let [head, body] = [document.head, document.body];
  //let cssLink = '<link href="//' + STATIC_SERVICE + '/css/plugin.css" rel="stylesheet" media="all" />';
  var i, numargs = arguments.length, config_obj;
  var tip_box = `
  <div class="tip_box" id="tip_box" style="display:none;">
    <div class="tip_box_main">
      <p>你的浏览器版本太低，推荐升级至
      <a href="http://www.microsoft.com/zh-cn/download/internet-explorer-8-details.aspx" target="_blank" class="browser_link" id="tips_msg"></a>及以上，或下载
      <a href="http://www.firefox.com.cn/" class="browser_link" target="_blank">火狐</a>、
      <a href="http://dlsw.baidu.com/sw-search-sp/soft/9d/14744/ChromeStandalone_47.0.2526.106_Setup.1450323126.exe" class="browser_link" target="_blank">chrome</a>，以获得最佳访问体验！</p>
      <a class="close_tip" href="javascript:;" id="close_tip">不再提示</a>
    </div>
  </div>
  `

  //是否显示提示
  var need_tips = false;

  for (i = 0; i < numargs; i++) {
    // return t.tip_total_plugin("IE5", "IE6", "IE7") ? !1 : void 0
    config_obj = _config[arguments[i]];
    //IE浏览器显示
    if (document.documentMode == 5) {
      head.appendChild(cssLink);//加载样式
      body.appendChild(tip_box);//输出提示框
      tipMsg.innerHTML = config_obj.tips;//所匹配的提示语
      // alert('当前浏览器模式为Quirks模式，请切换至标准模式访问！');
      need_tips = true;
      break;
    } else if (config_obj.reg.test(navigator.userAgent)) {
      console.log('???')
      //head.innerHTML = head.innerHTML.concat(cssLink);//加载样式
      body.innerHTML = body.innerHTML.concat(tip_box);//输出提示框
      let tipMsg = document.querySelector('#tips_msg')
      tipMsg.innerHTML = config_obj.tips;//所匹配的提示语
      need_tips = true;
      break;
    }
  }

  //关闭提示框
  let closeTip = document.querySelector("#close_tip")
  console.log(closeTip)
  closeTip.addEventListener('click', function () {
    SetCookie('hide_tips', 1);
    closeTip.remove();
  })

  //判断hide_tips这条cookie是否存在
  if (getCookie('hide_tips')) {
    closeTip.remove();
  }

  return need_tips;
}

//判断浏览器
console.log(checkBrowser('IE5', 'IE6', 'IE7'))

// 为动态生成的标签添加点击事件
// let ul = document.getElementById("ul");
// ul.addEventListener('click', function (e) {
//   let _this = e.target;
//   let dom = e.target.tagName.toLowerCase();
//   if (dom === 'li') {
//     _this.style.color = 'red';
//   }
// })
