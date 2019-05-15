<template>
  <div class="search">

    <!-- 搜索条 -->
    <!-- <search-nav :cancelSearch="cancelSearch" /> -->

    <!-- 搜索界面 -->
    <search-panel :confirmSearch="confirmSearch" :showSearchTip="showSearchTip" />

    <!-- 商品列表 -->
    <shop-list :homeshoplist="homeshoplist" />

  </div>
</template>

<script>
import SearchPanel from './children/searchPanel'
import { getSearchList } from './../../api/api.js'
import ShopList from './../Home/Children/Hot/HotShopList'
export default {
  name: 'search',
  data () {
    return {
      scrollY: 0, // 右侧列表滑动的y轴坐标
      rightLiTops: [], // 所有分类的头部位置
      panelShow: false,
      homeshoplist: [],
      showSearchTip: true
    }
  },
  mounted () {
    this.$store.dispatch('reqSearchGoods')
  },
  methods: {
    // 确定搜索
    confirmSearch (searchText) {
      const res = getSearchList({keyword: searchText})
      res.then(result => {
        if (result.message.code === 200) {
          this.showSearchTip = false
          this.homeshoplist = result.message.search_list
        }
      })
    }
  },
  components: {
    SearchPanel,
    ShopList
  }
}
</script>

<style lang="stylus" scoped>
@import './../../common/stylus/mixins.styl'
.search
  width 100%
  // height 100%
  // overflow hidden
  background-color #fff
  position relative
  .search-shop
    width 100%
    display flex
    position absolute
    top 1.02rem
    bottom .82rem

    .shop-menu
      flex 1
      height 100%
      background #fafafa
      li
        width 100%
        height .9rem
        line-height .9rem
        text-align center
        font-size .25rem
        position relative
      .current
        color #e02e24
        background #fff
        &:before
          position absolute
          left 0
          top 50%
          margin-top -0.2rem
          width .05rem
          content ''
          display block
          height .4rem
          background #e02e24
    .shop-list
      flex 3
      .content
        .shop-item
          .title
            padding .3rem 0 .15rem 0
            display flex
            justify-content space-between
            .item-name
              font-size .28rem
              color #58595b
              padding-left .1rem
            .more
              font-size .26rem
              color #9c9c9c
              padding-right .1rem
          .phoneTag
            border-bottom-1px(#ccc)
            margin-bottom .25rem
            ul
              display flex
              flex-flow row wrap
              // width 100%
              .phone
                // flex 1
                padding 0 .2rem .15rem 0
                box-sizing border-box
                width 33.3%
                height .9rem
                text-align center
                img
                  width 75%
                  vertical-align top
          .item-content
            display flex
            flex-flow row wrap
            li
              width 33.3%
              text-align center
              padding-bottom .2rem
              img
                width .94rem
                height .94rem
              p
                font-size .22rem
</style>
