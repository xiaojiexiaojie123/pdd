<template>
  <div class="home">
    <ly-tab
      v-model="selectedId"
      :items="items"
      :options="options"
      @change="switchToItem"
      class="hotItem">
    </ly-tab>

<!--    <router-view></router-view>-->
    <div class="swipe" ref="swipe" :style="{height: swipeHeight, marginTop: '1rem'}">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item, index) in homecasual" v-bind:key=index>
          <img :src="item.imgurl" @click="$router.push(item.detail)" alt="" width="100%" >
        </mt-swipe-item>
      </mt-swipe>
    </div>

    <shop-list :homeshoplist="homeshoplist" />
  </div>
</template>

<script>
import ShopList from './Children/Hot/HotShopList'
import { _debounce } from '@/common/js/common'
import { getHomeShopList } from './../../api/api'
export default {
  name: 'home',
  data () {
    return {
      // 轮播图
      selectedId: 0,
      items: [
        {label: '热门', category: '0'},
        {label: '男装', category: '1'},
        {label: '女装', category: '2'},
        {label: '童装', category: '3'},
        {label: '婴儿装', category: '4'},
        {label: 'T恤', category: '5'},
        {label: '衬衫', category: '6'},
        {label: '牛仔裤', category: '7'},
        {label: '休闲裤', category: '8'},
        {label: '短裤', category: '9'},
        {label: '裙装', category: '10'}
      ],
      options: {
        activeColor: '#e9232c'
        // 可在这里指定labelKey为你数据里文字对应的字段
      },
      swipeHeight: 0,
      homecasual: [
        {imgurl: require('./imgs/swiper/s1.png')},
        {imgurl: require('./imgs/swiper/s2.png')},
        {imgurl: require('./imgs/swiper/s3.png')},
        {imgurl: require('./imgs/swiper/s4.png')},
        {imgurl: require('./imgs/swiper/s5.png')},
        {imgurl: require('./imgs/swiper/s6.png')},
        {imgurl: require('./imgs/swiper/s7.png')},
        {imgurl: require('./imgs/swiper/s8.png')}
      ],
      homeshoplist: []
    }
  },
  mounted () {
    // 设置轮播图外框的高度
    this.setSwipeHeight()
    // 请求轮播数据
    // this.$store.dispatch('reqHomecasual')
    // 获取首页导航
    // this.$store.dispatch('reqHomeNavList')
    // 获取首页商品列表
    // this.$store.dispatch('reqHomeShopList')
    this.getHomeShopList(0)
  },
  methods: {
    // 跳转路由
    switchToItem (item) {
      this.getHomeShopList(item.category)
    },
    // 设置轮播图外框的高度
    setSwipeHeight () {
      let that = this
      that.swipeHeight = that.$refs.swipe.clientWidth * (207 / 553) + 'px'
      window.onresize = _debounce(
        function () {
          that.swipeHeight = that.$refs.swipe.clientWidth * (207 / 553) + 'px'
        },
        200,
        false
      )
    },
    getHomeShopList (category) {
      const res = getHomeShopList({category})
      res.then(result => {
        if (result.message.code === 200) {
          this.homeshoplist = result.message.data
        }
      })
    }
  },
  components: {
    ShopList
  }
}
</script>

<style lang="stylus" scoped>
.home
  background #f5f5f5
  width 100%
  height 100%
  .hotItem
    background #fff
    max-width 640px
    position fixed
    top 0
    z-index 998
</style>
