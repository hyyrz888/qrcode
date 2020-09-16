import axios from 'axios'
import $ from 'jquery'
axios.defaults.baseURL = '/api'  //关键代码
import { request } from './request'
//该文件用来操作头部搜索功能


var contentCreated = false;
var $wrapper = null;
var $triggerRef = null;
var $inputRef = null;
var isExpanded = false;
window.__validSearchTimeSection = 3600000;  //1小时

//初始化须选项
var initOptions = {
  expanded: false,
  position: 'left',
  inputWidth: 140,
  popContentWidth: 280,
  form: '.header_search_form',
  domain: getDomain(),
  input: null
};
var searchFocus = false;
var isInputZh = false;

//获取当前域名
function getDomain() {
  return window.CLI_DOMAIN || 'cli.im';
}

//可用搜索时间
var validSearchTime = function (timeStamp) {
  var validTime = window.__validSearchTimeSection || 36000;
  if (timeStamp) {
    var nowTime = Date.now(); //获取当前时间
    return (nowTime - timeStamp) < validTime
  }
  //未传值
  return false
}

//渲染关键词
var renderKey = function (words) {
  var searchList = document.querySelector(".searchKeysList")
  var conArr = []
  //取五条
  words.slice(0, 5).forEach(item => {
    conArr.push(`
      <li class="search-hot-keys-item">
      <a href="${item.url}" hotkey-log target="_blank" title="${item.title}">${item.title}</a>
      </li>
    `)
  });
  searchList.innerHTML = conArr.join('')
  searchList.classList.remove('none')
}
//渲染历史搜索记录列表
var renderSearchList = function (list, kw) {
  var $list = document.querySelector('.histroyList');
  var reg = new RegExp(kw, 'ig');  //全部小写
  var arrCon = []
  if (list) {
    list.forEach(function (item) {
      arrCon.push(`
      <li class="search-hot-keys-item">
        <a href="" target="_blank">
         ${item.title.replace(reg, `<span class='hl'>${kw}</span>`)}
        </a >
      </li >
  `);
    });
    $list.innerHTML = arrCon.join()
    $list.classList.remove('none')
  }
}

//接口获取5条关键词条
var getSearchHotKeys = function () {
  // axios和fetch不可用
  var searchTopKeys = {
    timeStamp: Date.now(),
    words: [
      {
        "q_id": "203",
        "title": "如何创建一个内容可变的活码？",
        "url": "https://cli.im/news/service/56436",
        "search_key": "活码"
      },
      {
        "q_id": "208",
        "title": "旅游行程二维码怎么做？",
        "url": "https://console.cli.im/tplLib/detail/128101",
        "key": "旅游"
      },
      {
        "q_id": "200",
        "title": "为什么不能在二维码里长按识别",
        "url": "http://cli.im/news/service/52344",
        "key": "切换展示方式"
      },
      {
        "q_id": "198",
        "title": "如何生成短链接",
        "url": "http://cli.im/news/service/57842",
        "search_key": "短链接"
      },
      {
        "q_id": "187",
        "title": "签到二维码怎么做",
        "url": "https://cli.im/case/detail/1414",
        "search_key": "签到二维码"
      }
    ]
  }

  localStorage.setItem('search', JSON.stringify(searchTopKeys))
}

//显示关键词条列表
var showHeaderSearchTop = function () {
  var searchList = document.querySelector(".searchKeysList")
  if (searchList.className.indexOf('none') > -1) {
    var searchToplist = localStorage.getItem('search')
    //如果存在
    if (searchToplist) {
      var searchTopKeys = JSON.parse(searchToplist);
      if (searchTopKeys && validSearchTime(searchTopKeys.timeStamp) && Array.isArray(searchTopKeys.words)) {
        renderKey(searchTopKeys.words);
      } else {
        getSearchHotKeys();
      }
    } else {
      getSearchHotKeys()
    }
  }
}

//展示搜索历史
var showHeaderSearchHistory = function () {
  var $searchHistoryList = document.querySelector('.search-hot-keys-history');
  var searchHistoryStr = localStorage.getItem('search::history');
  if (searchHistoryStr) {
    var searchHistory = JSON.parse(searchHistoryStr); //转为对象
    var domArray = [];
    if (searchHistory && Array.isArray(searchHistory)) {
      searchHistory.slice(0, 5).forEach(function (item, index) {
        domArray.push(
          `<li class="search-hot-keys-history-item">
            <a href="" target ="_blank"> ${item.q} 
            <span data-index="${index}" class="clifont anticon-cli-close-1" ></span>
            </a></li> `
        );
      });
      $('.search-hot-keys-history-list').html(domArray.join(''));
      if (searchHistory.length) {
        $searchHistoryList.classList.remove('none');
      }
    }
  }
}

//初始化popcontent
var initPopContent = function () {

}


//创建dom元素
var createPop = function (input) {
  if (input) {
    $inputRef = document.querySelector('' + input)
  } else {
    $inputRef = document.querySelector('.header_search_control')
  }
  //如果已经创建了content
  if (contentCreated) {
    initPopContent(true)
    return
  }
  contentCreated = true
  //创建wrapper
  var $wrapper = document.createElement('div')
  $wrapper.classList.add("header-search-pop-wrapper")
  //如果没用输入框
  if (!input) {
    //创建一个输入框
    var form = document.createElement('form')
    form.setAttribute("role", "search")
    form.setAttribute('method', "get")
    from.classList.add("header_search_form")
    form.appendChild($inputRef)
    $wrapper.appendChild(form)
  }
  //定义结构
  var con = `
    <div class="header-search-hot-keys clearfix none">
        <div class="header-search-hot-content">
          <div class="search-hot-keys-title-wrapper">
           <span class="search-hot-keys-title">热门搜索</span>
            <a href="" class="search-hot-keys-help">帮助中心</a>
          </div>
          <ul class="search-hot-keys-list none"></ul>
          <div class="search-hot-keys-history none">
            <p class="search-hot-keys-title">搜索历史
              <a href="javascript:;" class="search-hot-keys-history-remove pull-right">
                <span class="clifont anticon-cli-delete"></span>清空
             </a>
            </p>
            <ul class="search-hot-keys-history-list"></ul>
          </div>
        </div>
        <div class="header-search-content none">
          <ul class="search-result-keys-list"></ul>
          <a class="header-search-more" target="_blank">
            查看「<span class="header-search-more-key"></span>」的搜索结果
          </a>
        </div>
      </div>
  `
  $wrapper.innerHTML = $wrapper.innerHTML.concat(con)
  document.body.appendChild($wrapper)
  initPopContent()
}

//设置位置
function setOffset() {
  if (!$triggerRef) return;
  var trigger = $triggerRef[0];
  var triggerRect = trigger.getBoundingClientRect();
  var inputWidth = initOptions.inputWidth;
  var left = triggerRect.left + triggerRect.width - inputWidth;
  $wrapper.css({
    position: 'fixed',
    left: left + 'px',
    top: triggerRect.top + 'px'
  });
  if (!initOptions.input) {
    $triggerRef.css({
      position: 'relative',
      zIndex: 10000
    });
  }
  var popContentWidth = initOptions.popContentWidth;
  if (initOptions.position === 'center') {
    $('.header-search-hot-keys').css({
      left: - (popContentWidth / 2) + (inputWidth / 2) + 'px'
    });
  }
}


function showInput() {
  isExpanded = true;
  setOffset();
  $inputRef.addClass('expanded');
}

function hideInput() {
  if (!initOptions.expanded) {
    $inputRef.removeClass('expanded');
    isExpanded = false;
  }
}

$(window).on('resize', function () {
  setOffset();
});

$(window).on('scroll', function () {
  setOffset();
});

var createHelpSearch = function (options) {
  //合并对象
  initOptions = Object.assign(initOptions, { domain: getDomain() }, options)
  // $.extend(initOptions, { domain: getDomain() }, options);
  // 兼容 '//cli.im' 格式的
  if (/^\/\/.*/.test(initOptions.domain)) {
    initOptions.domain = initOptions.domain.slice(2);
  }
  var expanded = initOptions.expanded;
  $triggerRef = options.trigger || this;
  //执行
  create(options.input);
  if (expanded) {
    showInput();
  } else {
    hideInput();
  }
  setOffset();
  //解绑
  this.off('click', showInput);
  //添加事件
  this.click(showInput);
}
