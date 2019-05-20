<template>
  <div class="shopDetail">
    <div class="content">
      <div class="good-img">
        <img :src="goodInfo.image_url" />
      </div>
      <div class="number">
        <div class="price">
          <span class="normal-price"><span class="rmb">￥</span>{{(goodInfo.normal_price / 100).toFixed(1)}}</span>
          <span class="market-price">￥{{goodInfo.market_price / 100}}</span>
        </div>
        <div class="sales" v-if="goodInfo.sales_tip">
          已购{{goodInfo.sales_tip.substr(2)}}
        </div>
      </div>
      <div class="title">
        {{goodInfo.short_name}}
      </div>
      <div class="promise">
        <span class="left">全场包邮 · 7点退换 · 假一赔十</span>
        <span>＞</span>
      </div>
      <div class="rating">
        <div class="top">
          <span>商品评论(2)</span>
          <span>查看全部＞</span>
        </div>
        <div class="desc">
          <ul>
            <li>质量好(2612)</li>
            <li>衣服好(1000)</li>
            <li>快递快(535)</li>
          </ul>
        </div>
        <div class="user">
          <div class="name">
            <div class="pic">
              <img src="http://t21img.yangkeduo.com/a/813368c777d353711ce36c721c2f19be8e908ef4-1517021651?imageMogr2/thumbnail/100x" alt="">
            </div>
            <span>哈哈</span>
          </div>
          <div class="words">
            款式好看，收到货很喜欢😘毛，物美还不贵超值，打算再入手其他颜色，喜欢的亲们不要错过哦……实物毛衣是黑色，颜色正，忽略我手机像素问题😄
          </div>
        </div>
        <div class="user">
          <div class="name">
            <div class="pic">
              <img src="http://t21img.yangkeduo.com/a/813368c777d353711ce36c721c2f19be8e908ef4-1517021651?imageMogr2/thumbnail/100x" alt="">
            </div>
            <span>小杰</span>
          </div>
          <div class="words">
            非常喜欢，还会再买
          </div>
        </div>
      </div>
    </div>
    <div class="btn-wrap">
      <div class="buy-btn tada" @click="toPayment">立即购买</div>
    </div>
  </div>
</template>

<script>
import { getShopDetail } from './../../api/api.js'
export default {
  name: 'shopDetail',
  data () {
    return {
      goodInfo: {}
    }
  },
  mounted () {
    this.getShopDetail()
  },
  methods: {
    getShopDetail () {
      var goods_id = this.$route.query.goods_id;
      const res = getShopDetail({goods_id})
      res.then(result => {
        console.log(result)
        if (result.message.code === 200) {
          this.goodInfo = result.message.good_info
        }
      })
    },
    toPayment () {
      this.$router.push('/payment')
    }
  }
}
</script>

<style lang="stylus" scoped>
.btn-wrap
  position fixed
  left 50%
  transform translateX(-50%)
  width: 100%
  .buy-btn
    width: 80%
    height: .6rem;
    bottom .2rem
    margin 0 auto
    background: linear-gradient(to top, #CD0000, #EE4000)
    border-radius .3rem
    line-height .6rem
    text-align center
    font-size .35rem
    font-weight bold
    color #fff
  .tada
    animation tada 1s infinite
  @keyframes tada
    0%
      transform scale(1)
    50%
      transform scale(.9)
    100%
      transform scale(1)
.content
  .good-img
    img
      width 100%
  .number
    padding .2rem .2rem
    background #fff
    display flex
    justify-content space-between
    align-items center
    .price
      display flex
      justify-content space-between
      align-items flex-end
      .normal-price
        font-size .35rem
        color #e02e24
        .rmb
          font-size .2rem
      .market-price
        font-size .2rem
        text-decoration line-through
    .sales
      font-size .25rem
  .title
    padding 0 .2rem
    background #fff
    height .9rem
    font-size .3rem
    font-weight 700
    overflow hidden
    color #151516
  .promise
    padding .2rem .2rem
    background #fff
    display flex
    justify-content space-between
    align-items center
    font-size .24rem
    border-top 1px solid #ccc
    margin-bottom .1rem
  .rating
      padding .2rem .2rem
      background #fff
    .top
      display flex
      justify-content space-between
      align-items center
      font-size .3rem
    .desc
      padding .15rem 0
      ul
        li
          float left
          font-size .2rem
          text-align center
          background #fceae9
          margin-left .1rem
          padding .2rem .2rem
          border-radius .05rem
        li:nth-child(1)
          margin-left 0
        &:after
          display block
          content ''
          clear both
  .user
    padding 0 .2rem .1rem
    background #fff
    border-bottom 1px solid #ccc
    .name
      display flex
      justify-content flex-start
      align-items center
      padding-top .07rem
      .pic
        width .5rem
        height .5rem
        border-radius 50%
        overflow hidden
        img
          width 100%
          height 100%
          display block
      span
        font-size .24rem
        color #151516
        margin-left .2rem
    .words
      padding-top .1rem
      font-size .24rem
      line-height 1.2em
</style>
