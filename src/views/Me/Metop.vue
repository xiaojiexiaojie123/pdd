<template>
  <div class="meTop">
    <div class="user">
      <router-link tag="div" to="/user_info" class="userLeft">
        <div class="user-logo">
          <img src="./images/avatar.png" alt="">
        </div>
        <span class="user-phone">{{phone | nameFormat}}</span>
        <i class="icon-2"></i>
      </router-link>
      <router-link class="setting" tag="div" to="/setting">
        <span class="icon-4"></span>
<!--        <span>设置</span>-->
      </router-link>
    </div>
    <div class="order">
      <div class="top">
        <span class="myOrder">我的订单</span>
<!--        <span class="watchMore">查看更多<i class="icon-15"></i></span>-->
      </div>
      <div class="order-items">
        <ul v-if="orderList.length > 0">
          <li class="order-item" v-for="(orderInfo, index) in orderList" :key="index" @click="comment(orderInfo)">
            <div class="goods-img">
              <img :src="orderInfo.image_url" alt="">
            </div>
            <div class="right">
              <p>{{orderInfo.goods_name}}</p>
              <p>订单编号：{{orderInfo.order_id}}</p>
              <p>价格：￥{{(orderInfo.normal_price / 100).toFixed(1)}}</p>
              <p class="status">{{ statusMap[orderInfo['goods_status']] }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
<!--    <div class="setting">-->
<!--      <ul>-->
<!--        <router-link tag="li" to="/setting">-->
<!--          <span class="icon-4"></span>-->
<!--          <span>设置</span>-->
<!--        </router-link>-->
<!--      </ul>-->
<!--    </div>-->
  </div>
</template>

<script>
import { getUserOrder, uploadComment } from './../../api/api'
export default {
  name: 'meTop',
  data () {
    return {
      phone: this.$store.state.userInfo.phone,
      orderList: [],
      statusMap: {
        '1': '未支付',
        '2': '已付款',
        '3': '已发货',
        '4': '已收货',
        '5': '已评价'
      },
      commentText: '',
      userInfo: this.$store.state.userInfo
    }
  },
  mounted () {
    const res = getUserOrder({user_id: this.$store.state.userInfo.user_name})
    res.then(result => {
      if (result.code === 200) {
        console.log(result)
        this.orderList = result.data
      }
    })
  },
  filters: {
    nameFormat (value) {
      return ([...value].map((value, index) => {
        if (index >= 3 && index <= 6) {
          return '*'
        } else {
          return value
        }
      })).join('')
    }
  },
  methods: {
    uploadComment (orderInfo) {
      console.log(this.commentText)
      let data = {
        goods_id: orderInfo.goods_id,
        order_id: orderInfo.order_id,
        user_id: this.userInfo.user_id,
        user_name: this.userInfo.user_name,
        user_avatar: this.userInfo.user_avatar,
        message: this.commentText
      }
      const res = uploadComment(data)
      res.then(result => {
        if (result.code === 200) {
          this.$Message.success('评论成功')
        }
      })
    },
    comment (orderInfo) {
      if (orderInfo.goods_status == 4) {
        this.$Modal.confirm({
          title: '服装评论',
          onOk: () => {
            this.uploadComment(orderInfo)
          },
          render: (h) => {
            return h('Input', {
              props: {
                value: this.commentText,
                autofocus: true,
                placeholder: '请输入评价信息...'
              },
              on: {
                input: (val) => {
                  this.commentText = val
                }
              }
            })
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './../../common/stylus/icon.css'

.meTop
  width 100%
  margin-bottom .82rem
  .user
    background #fff
    padding .2rem .23rem
    display flex
    justify-content space-between
    align-items center
    .userLeft
      display flex
      justify-content flex-start
      align-items center
      .user-logo
        width 1.04rem
        height 1.04rem
        border-radius 50%
        overflow hidden
        img
          width 100%
          height 100%
      .user-phone
        color #151516
        font-size .3rem
        padding 0 .02rem 0 .08rem
      i
        font-size .4rem
  .order
    margin-top .1rem
    background #fff
    padding 0 .23rem
    .top
      display flex
      justify-content space-between
      align-items center
      padding .2rem 0
      .myOrder
        font-size .25rem
        color #151516
        font-weight 700
      .watchMore
        font-size .23rem
        color #999
    .order-items
      padding-bottom .2rem
      ul
        li
          display flex
          justify-content space-between
          align-items center
          text-align center
          height: 1rem
          margin: .1rem 0
          .goods-img
            width: 40%
            margin-right: .2rem
            img
              width: 100%
              height: 100%
          .right
            width: 60%
            text-align left
            position: relative
            p
              overflow: hidden;/*超出部分隐藏*/
              white-space: nowrap;/*不换行*/
              text-overflow:ellipsis;/*超出部分文字以...显示*/
            .status
              position absolute
              right: .1rem;
              bottom: .1rem;
              color: #f40
  .setting
    width 25%
    display flex
    flex-direction column
    justify-content space-between
    align-items center
    text-align center
    >span
      color #58595b
      &:nth-child(1)
        font-size .4rem
        padding-bottom .1rem
      &:nth-child(2)
        font-size .2rem
</style>
