<template>
  <div class="cart">
    <cart-item v-for="(item, index) in cartShopList" :key="index" :cartShopItem=item />
    <div class="settlement" v-if="this.cartShopList && this.cartShopList.length > 0">
      <div class="left">
        <input type="checkbox" name="selectAll" id="selectAll" :checked="isSelectAll" @click="selectAll">
        <label for="selectAll">全选</label>
        <span class="total">合计：￥<span class="num">{{totalPrice / 100 | moenyFormat(totalPrice)}}</span></span>
      </div>
      <div class="right" @click="payOrder">
        去结算
      </div>
    </div>
    <div class="cartIsNull" v-else>购物车空空如也</div>
    <wechat-pay v-if="showWechatPay" :paySucess="paySucess" :goodInfo="goodInfo"></wechat-pay>
  </div>
</template>

<script>
import WechatPay from './../../components/WechatPay/WechatPay'
import CartItem from './child/CartItem'
import { payOrder } from './../../api/api.js'
export default {
  name: 'cart',
  data () {
    return {
      userInfo: this.$store.state.userInfo,
      goodInfo: {normal_price: 0},
      showWechatPay: false
    }
  },
  computed: {
    cartShopList () {
      return this.$store.state.cartShopList
    },
    // 是否全选
    isSelectAll: {
      get () {
        let isSelectAll = true
        if (this.cartShopList && this.cartShopList.length > 0) {
          this.cartShopList.forEach(good => {
            if (!good.checked) {
              isSelectAll = false
            }
          })
        }
        return isSelectAll
      },
      set (newValue) {
        console.log(newValue)
      }
    },
    // 总价格
    totalPrice () {
      let totalPrice = 0
      if (this.cartShopList && this.cartShopList.length > 0) {
        this.cartShopList.forEach(good => {
          if (good.checked === true) {
            totalPrice += good.price * good.buy_count
            this.goodInfo.normal_price = totalPrice
          }
        })
      }
      return totalPrice
    }
  },
  created () {
    this.$store.dispatch('cartShopList')
  },
  filters: {
    moenyFormat (value) {
      return value.toFixed(2)
    }
  },
  methods: {
    // 是否全选
    selectAll () {
      console.log(this.isSelectAll)
      this.$store.dispatch('selectAll', {isSelectAll: !this.isSelectAll})
    },
    payOrder () {
      if (!this.userInfo.user_id) {
        this.$router.push('/login')
        return
      }
      let isSelect = false
      this.cartShopList.forEach((item, index) => {
        if (item.checked) {
          isSelect = true
        }
      })
      if (isSelect) {
        this.showWechatPay = true
      } else {
        this.$Message.info('请选择服装')
      }
    },
    paySucess () {
      console.log(this.cartShopList)
      let payOrderList = []
      this.cartShopList.forEach((item, index) => {
        if (item.checked) {
          var data = {
            user_id: this.userInfo.user_name,
            phone: this.userInfo.phone,
            address: this.userInfo.user_address,
            receiveName: this.userInfo.user_name,
            goods_id: item.goods_id,
            price: item.price,
            channel: 1,
            id: this.userInfo.user_id
          }
          const res = payOrder(data)
          payOrderList.push(res)
        }
      })
      Promise.all(payOrderList).then(result => {
        // this.$router.replace('/me')
        this.$Message.success('结算成功')
        this.$store.dispatch('cartShopList')
      })
    }
  },
  components: {
    CartItem,
    WechatPay
  }
}
</script>

<style lang="stylus" scoped>
.cart
  margin-bottom 1.71rem
  position relative
  .settlement
    position fixed
    bottom .91rem
    width 100%
    height .8rem
    background #ccc
    font-size .2rem
    display flex
    justify-content space-between
    align-items center
    .left
      padding-left .2rem
      display flex
      align-items center
      input
        width .3rem
        height .3rem
      .total
        padding-left .2rem
        .num
          color red
          font-weight 700
          font-size .24rem
    .right
      line-height .8rem
      text-align center
      padding 0 .3rem
      background #f73728
      color #fff
      font-size .24rem
      font-weight 700
  .cartIsNull
    margin-top .4rem
    text-align center
    font-size .2rem
</style>
