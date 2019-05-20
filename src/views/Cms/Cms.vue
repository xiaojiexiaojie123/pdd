<template>
  <div class="cms">
    <div class="title-banner">爱购物后台管理系统</div>
    <div class="main">
      <div class="nav">
        <ul>
          <router-link tag="li" to="/cms/goodsInfo">服装信息管理</router-link>
          <router-link tag="li" to="/cms/order">订单管理</router-link>
          <router-link tag="li" to="/cms/chart">报表管理</router-link>
          <router-link tag="li" to="/cms/user">用户管理</router-link>
          <router-link tag="li" to="/cms/manager">管理员管理</router-link>
        </ul>
      </div>

      <div class="container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cms',
  data () {
    return {
      managerId: ''
    }
  },
  created () {
    document.getElementsByTagName("title")[0].innerHTML = '爱购物后台管理系统'
    document.getElementsByTagName("body")[0].style.width = '100%'
    document.getElementsByTagName("body")[0].style.maxWidth = '100%'
  },
  methods: {

  },
  components: {
  }
}
</script>

<style lang="stylus" scoped>
.cms
  .title-banner
    height: 60px
    background: linear-gradient(to top, #2d8cf0, #2db7f5)
    line-height: 60px
    text-align center
    color: #fff
    font-size 30px
    font-weight bold
  .main
    margin 0 .4rem
    display flex
    align-items flex-start
    .nav
      width: 200px
      border-right: 1px solid #ccc
      ul
        margin: 0 auto
        li
          height: 50px
          line-height: 50px
          font-size: 16px
          text-align: center
          border-bottom: 1px solid #fff
          color: #337ab7
          &:hover
            text-decoration underline
            color #337aff
            cursor pointer
          &:last-child
            border-bottom: none
    .container
      flex 1
      width: 80%
</style>
