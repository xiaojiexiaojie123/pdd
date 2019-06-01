<template>
  <div id="bodybox">
    <div id="mian" style="display:block;position: fixed;top: 0;left:0;width:100%;height:100%;background: #f1f2f4;">
      <div class="header"> <a href="/cart"><</a> 付款</div> <br>
      <div class="box">
        <div class="meg">
          <div class="meg_l">
            <div class="p1">付款给个人</div>
            <div class="p2">微凉、月(**媛)</div>
          </div>
          <div class="meg_r" id="meg_r"><img src="./img/1.jpg"></div>
        </div>
        <p class="p3">金额</p>
        <p class="p4"><span>￥ </span><input id="btn" class="p4_1" type="tel" value="输入金额" onFocus="this.value = '';" /></p>
        <br>
        <input type="button" class="myBtn1" id="myBtn" value="付款" />
      </div>
      <!-- 打开弹窗按钮 -->
      <!-- 弹窗 -->
      <div id="myModal" class="modal" style="display: block">
        <!-- 弹窗内容 -->
        <div class="modal-content">
          <div class="paymentArea">
            <div class="paymentArea-Entry">
              <div class="paymentArea-Entry-Head">
                <img src="./img/xx_03.jpg" class="close" />
                <img src="./img/jftc_03.png" class="useImg">
                <span class="tips-txt">请输入支付密码</span>
              </div>
              <div class="paymentArea-Entry-Content">
                <div class="pay-name">付款给个人</div>
                <div id="price" class="pay-price">￥{{ (goodInfo.normal_price / 100).toFixed(2) }}</div>
              </div>
              <ul class="paymentArea-Entry-Row">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
            <div class="paymentArea-Keyboard">
              <h4>
                <img src="./img/jftc_14.jpg" height="10" />
              </h4>
              <ul class="target">
                <li>
                  <a>1</a>
                  <a>2</a>
                  <a>3</a>
                </li>
                <li>
                  <a>4</a>
                  <a>5</a>
                  <a>6</a>
                </li>
                <li>
                  <a>7</a>
                  <a>8</a>
                  <a>9</a>
                </li>
                <li>
                  <a class="p5"></a>
                  <a> 0 </a>
                  <a class="p5">X</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--支付成功页面-->
    <div class="su_bg" id="subox" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:#f1f2f4">
      <p class="subg"><img src="./img/subg.png"></p>
      <p class="sutext">支付成功</p>
      <p class="suprice" id="suprice">￥{{ (goodInfo.normal_price / 100).toFixed(2) }}</p>
      <p class="sushou">收款方</p>
      <p class="suren" id="suren"><img src="./img/1.jpg"></p>
      <p class="sunname">微凉、月(**媛)</p>
      <br><br>
      <p><input type="button" class="sunbtn" id="myBtn" value="完成" @click="toMe" /></p>
    </div>
    <!--支付成功页面-->
  </div>
</template>

<script>
import { getShopDetail, payOrder } from './../../api/api.js'
export default {
  name: 'wechatpay',
  data () {
    return {
    }
  },
  props: {
    goodInfo: {
      type: Object
    },
    paySucess: {
      type: Function
    }
  },
  mounted () {
    this.init()
    console.log(this.goodInfo, 'data')
  },
  methods: {
    toMe () {
      this.$router.push('/me')
    },
    init () {
      var _this = this
      //定义根目录字体大小，通过rem实现适配
      document.addEventListener("DOMContentLoaded", function() {
        var html = document.documentElement;
        var windowWidth = html.clientWidth;
        //console.log(windowWidth)
        html.style.fontSize = windowWidth / 7.5 + "px";
      }, false);

      // 获取弹窗
      var modal = document.getElementById('myModal');
      var oMian = document.getElementById('mian');
      var oSubox = document.getElementById('subox');
      var oSuprice = document.getElementById('suprice');
      var oBodybox = document.getElementById('bodybox');
      // 打开弹窗的按钮对象
      var btn = document.getElementById("myBtn");
      var oBtn = document.getElementById('btn');
      var oPrice = document.getElementById("price");
      // 获取 <span> 元素，用于关闭弹窗 that closes the modal
      var span = document.getElementsByClassName("close")[0];
      /*创建密码输入框*/
      var entryArea = document.querySelector(".paymentArea-Entry-Row");
      // for (var i = 0; i < 6; i++) {
      //   var li = document.createElement("li");
      //   entryArea.appendChild(li);
      // }
      /*键盘操作*/
      var doms = document.querySelectorAll('ul li a');
      var entryLis = document.querySelectorAll(".paymentArea-Entry-Row li");
      var pwds = ""; //存储密码
      var count = 0; //记录点击次数
      for (var i = 0; i < doms.length; i++) {
        ! function(dom, index) {
          dom.addEventListener('click', function() {
            var txt = this.innerHTML;
            switch (txt) {
              case "清空":
                if (count != 0) {
                  for (var i = 0; i < entryLis.length; i++) {
                    entryLis[i].innerHTML = "";
                  }
                  pwds = "";
                  count = 0;
                  console.log(pwds)
                  console.log(count)
                }
                break;
              case "删除":
                if (count != 0) {
                  console.log(pwds)
                  entryLis[count - 1].innerHTML = "";
                  pwds = pwds.substring(0, pwds.length - 1);
                  count--;
                  console.log(pwds)
                  console.log(count)
                }
                break;
              default:
                /*通过判断点击次数 向输入框填充内容*/
                if (count < 6) {
                  /*创建一个图片对象 插入到方框中*/
                  var img = new Image();
                  img.src = require("./img/dd_03.png");
                  img.style.position = 'absolute'
                  img.style.top = '50%'
                  img.style.left = '50%'
                  img.style.width = '0.5rem'
                  img.style.height = '0.5rem'
                  img.style.transform = 'translate(-50%, -50%)'
                  entryLis[count].appendChild(img);
                  /*为存储密码的对象赋值*/
                  if (pwds == "") {
                    pwds = txt;
                  } else {
                    pwds += txt;
                    pwds = pwds.replace(/\s/g, ""); //对pwds进行去空字符处理
                  }
                  count++;
                  if (pwds.length == 6) {

                    oMian.style.display = 'none';
                    oSubox.style.display = 'block';
                    oBodybox.style.background = 'none';
                    _this.paySucess();
                  }
                } else {
                  return;
                  alert("超出限制")
                }
            }
          });
        }(doms[i], i);
      }
      // 点击按钮打开弹窗
      btn.onclick = function() {
        var str = oBtn.value;
        if (str.length > 2) {
          oPrice.innerHTML = '￥' + oBtn.value + '0';
          oSuprice.innerHTML = '￥' + oBtn.value + '0';
        } else {
          oPrice.innerHTML = '￥' + oBtn.value + '.' + '00';
          oSuprice.innerHTML = '￥' + oBtn.value + '.' + '00';
        }
        modal.style.display = "block";
      }
      // 点击 <span> (x), 关闭弹窗
      span.onclick = function() {
        modal.style.display = "none";
        if (count != 0) {
          for (var i = 0; i < entryLis.length; i++) {
            entryLis[i].innerHTML = "";
          }
          pwds = "";
          count = 0;
        }
      }
      // 在用户点击其他地方时，关闭弹窗
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
          if (count != 0) {
            for (var i = 0; i < entryLis.length; i++) {
              entryLis[i].innerHTML = "";
            }
            pwds = "";
            count = 0;
          }
        }
      }
      /*开关键盘*/
      var openKey = document.querySelector(".paymentArea-Entry-Row");
      var switchOfKey = document.querySelector(".paymentArea-Keyboard h4");
      switchOfKey.addEventListener('click', function() {
        var KeyboardH = document.querySelector(".paymentArea-Keyboard").clientHeight;
        document.querySelector(".paymentArea-Keyboard").style.height = KeyboardH + "px";
        document.querySelector(".paymentArea-Keyboard").style.backgroundColor = "transparent";
        document.querySelector(".paymentArea-Keyboard h4").style.display = "none";
        document.querySelector(".paymentArea-Keyboard ul").style.display = "none";
      })
      openKey.addEventListener('click', function() {
        document.querySelector(".paymentArea-Keyboard").style.backgroundColor = "#fff";
        document.querySelector(".paymentArea-Keyboard h4").style.display = "block";
        document.querySelector(".paymentArea-Keyboard ul").style.display = "block";
      })


      window.onload = function() {
        var oBtn = document.getElementById('btn');
        var btn = document.getElementById("myBtn");

        oBtn.onclick = function() {

          oBtn.value = '';
          oBtn.className = 'p4_1_action';

        }
        btn.oclick = function() {

          oPrice.innerHTML = oBtn.value;

        }


      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  /*本程序仅供学习交流，请勿用于非法用途，一切后果由使用者承担 by 骨妈妈*/
  body {
    margin: 0;
    padding: 0;
    font-size: 0.3rem !important;
    font-family: "微软雅黑", arial !important;
    background:#f1f2f4 !important;
  }
    *{
      /*box-sizing: content-box !important;*/
    }

  ul,
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  img {
    display: block;
  }

  /* 弹窗 */

  .modal {
    display: none;
    /* 默认隐藏 */
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
    -webkit-animation-name: fadeIn;
    -webkit-animation-duration: 0.4s;
    animation-name: fadeIn;
    animation-duration: 0.4s
  }
  /* 弹窗内容 */

  .modal-content {
    position: fixed;
    bottom: 0;
    /*background-color: #fefefe;*/
    width: 100%;
    -webkit-animation-name: slideIn;
    -webkit-animation-duration: 0.4s;
    animation-name: slideIn;
    animation-duration: 0.4s
  }
  /**
         * 支付弹窗样式
         * **/

  .paymentArea-Entry {
    width: 90%;
    margin: 0 auto;
    padding-bottom: 0.3rem;
    background-color: #fafafa;
  }

  .paymentArea-Entry-Head {
    display: flex;
    display: -webkit-flex;
    height: 0.8rem;
    line-height: 0.8rem;
    padding: 0.2rem;
    border-bottom: 1px solid #5CB85C;
    box-sizing: content-box;
  }
  /* 关闭按钮 */

  .paymentArea-Entry-Head .close {
    width: 0.5rem;
    height: 0.5rem;
    padding: 0.15rem 0.15rem 0.15rem 0;
    box-sizing: content-box;
  }

  .paymentArea-Entry-Head .close:hover,
  .paymentArea-Entry-Head .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }

  .paymentArea-Entry-Head .useImg {
    width: 0.8rem;
    height: 0.8rem;
    margin-right: 0.15rem;
  }

  .paymentArea-Entry-Head .tips-txt {
    font-size: 0.4rem;
    font-family: "微软雅黑", arial;
    /*box-sizing: content-box;*/
  }

  .paymentArea-Entry-Content {
    position: relative;
    padding: 0.2rem 0;
    text-align: center;
  }

  .paymentArea-Entry-Content:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0.3rem;
    right: 0.3rem;
    height: 1px;
    background-color: #ddd;
  }

  .paymentArea-Entry-Content .pay-name {
    font-size: 0.3rem;
  }

  .paymentArea-Entry-Content .pay-price {
    font-size: 0.5rem;
    font-weight: bold;
  }

  ul.paymentArea-Entry-Row {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    margin: 0.2rem 0.3rem 0 0.3rem;
    padding: 0;
    border: 1px solid #a2a2a2;
  }


  ul.paymentArea-Entry-Row>li {
    position: relative;
    flex-grow: 1;
    /*min-width: 1rem;*/
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    border-right: 1px solid #ddd;
  }

  ul.paymentArea-Entry-Row li:last-child {
    border-right: 0;
  }

  ul.paymentArea-Entry-Row li img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0.5rem;
    height: 0.5rem;
    transform: translate(-50%, -50%)
  }
    .password-img {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0.5rem;
      height: 0.5rem;
      transform: translate(-50%, -50%)
    }

  .paymentArea-Keyboard {
    margin-top: 1.2rem;
    background-color: #f5f5f5;
  }

  .paymentArea-Keyboard h4 {
    height: 0.5rem;
    line-height: 0.5rem;
    margin: 0;
    text-align: center;
  }

  .paymentArea-Keyboard h4 img {
    width: 0.93rem;
    height: 0.32rem;
    margin: 0 auto;
  }

  .paymentArea-Keyboard h4:active {
    background-color: #e3e3e3;
  }

  .paymentArea-Keyboard ul {
    border-top: 1px solid #ddd;
  }

  .paymentArea-Keyboard li {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
  }

  .paymentArea-Keyboard li a {
    flex-grow: 1;
    display: block;
    min-width: 1rem;
    line-height: 1.2rem;
    border-right: 1px solid #ddd;
    font-size: 0.5rem;
    text-align: center;
    text-decoration: none;
    color: #000;
  }

  .paymentArea-Keyboard li:last-child,
  .paymentArea-Keyboard li a:last-child {
    border: 0;
  }

  .paymentArea-Keyboard li a:active {
    outline: none;
    background-color: #ddd;
  }
  /* 添加动画 */

  @-webkit-keyframes slideIn {
    from {
      bottom: -300px;
      opacity: 0
    }
    to {
      bottom: 0;
      opacity: 1
    }
  }

  @keyframes slideIn {
    from {
      bottom: -300px;
      opacity: 0
    }
    to {
      bottom: 0;
      opacity: 1
    }
  }

  @-webkit-keyframes fadeIn {
    from {
      opacity: 0
    }
    to {
      opacity: 1
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0
    }
    to {
      opacity: 1
    }
  }
  .header{ height:68px; width:100%; font-size:1.4em; line-height:68px; border-bottom:#e5e6e8 1px solid; text-indent:0.8em;}
  .header a{ color:#FFF; list-style:none; text-decoration:none;font-size:1.5em;line-height:68px;}

  .meg{ background:#fbfbfb; height:100px;  text-align:center; display:block; margin: 0.1rem auto;  position:relative}

  .meg_l{ float:left; height:100px; line-height:30px;}
  .p1{ font-size:1.2em; margin-top:16px; margin-left:10px;}
  .p2{ font-size:1em; color:#bbbbbb;margin-top:5px; margin-left:15px;}

  .meg_r{ position:absolute; top:23px; left:250px;}
  .meg_r img{ width:50px; height:50px;}


  .box{ background:#FFF; height:350px;margin: 0rem auto; width:92%}
  .p3{ color:#bbbbbb; margin-left:25px;}

  .p4{ margin-left:25px;}
  .p4_1{ border-top:none; border-left:none; border-right:none; border-bottom:#e5e6e8 1px solid; width:220px; color:#bbbbbb; padding-bottom:10px; font-size:2em; height:30px; line-height:30px;}
  .p4_1_action{border-top:none; border-left:none; border-right:none; border-bottom:#e5e6e8 1px solid; width:220px; color:#000; padding-bottom:10px; font-size:2.5em; height:30px; line-height:30px;}
  .p4 span{ font-weight:bold;font-size:2em}


  .myBtn1{      display: block;
    width: 80%;
    height: 46px;;
  margin: 0rem auto;
  padding: 0.2rem;
  border-radius: 5px;
  border: 0;
  outline: none;
  font-family: "微软雅黑";
  color: #fff;
  background-color: #5CB85C;
  font-size:1.2em;
  }

  .p5{background:#e0e0e0;}
  .p5 img{ width:59px; height:42px;}

  .subg img{ margin:0 auto; width:20%; height:auto; margin-top:60px;}
  .sutext{ text-align:center; font-size:1.2em; color:#19ad17;}
  .suprice{font-size:2.5em; text-align:center;font-family: "微软雅黑";}

  .sushou{font-size:1.1em; text-align:center; color:#989898; margin-bottom:15px; margin:10px 0 10px 0}
  .suren img{ /*margin:0 auto ;*/ width:18%; height:auto; margin-top:70px; padding-top:0px;margin-top: 20px;
    margin-right: auto;
    margin-bottom: 0px;
    margin-left: auto;
  }
  .sunname{font-size:1.2em; text-align:center; }

  .sunbtn{      display: block;
    width: 40%;
    height: 35px;
    color:#19ad17;
    background:none;
    margin: 0rem auto;
    padding: 0rem;
    border-radius: 5px;
    border:#19ad17 1px solid;
    outline: none;
    font-family: "微软雅黑";
    font-size:1em;
  }
</style>
