<template>
  <div class="goods-info">
    <div class="tabs">
      <div class="search-goods">
        <div class="search-item">
          <div class="input-box">
            <span>用户名：</span>
            <Input v-model="searchUserName" style="width: auto" />
          </div>
        </div>
        <Button type="primary" @click="searUserInfo">查询用户</Button>
      </div>
    </div>
    <Table border :columns="userColumns" :data="userData" style="margin: .1rem .1rem 0" width="auto" />
  </div>
</template>

<script>
import { searchUserInfo } from './../../../api/api'
export default {
  name: 'order',
  data () {
    return {
      searchUserName: '',
      userColumns: [
        {
          title: '用户名',
          key: 'user_name'
        },
        {
          title: '用户性别',
          key: 'user_sex'
        },
        {
          title: '收货地址',
          key: 'user_address'
        },
        {
          title: '手机',
          key: 'phone'
        },
        {
          title: '昵称',
          key: 'nickname'
        }
      ],
      userData: []
    }
  },
  methods: {
    searUserInfo () {
      const res = searchUserInfo({user_name: this.searchUserName})
      res.then(result => {
        if (result.message.code === 200) {
          console.log(result)
          if (result.message.data.length > 0) {
            this.userData = result.message.data
          } else {
            this.$Message.info('查不到用户信息')
          }
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .tabs
    height .6rem
    display flex
    justify-content space-between
    align-items center
    .search-goods
      display flex
      justify-content flex-start
      align-items center
      .search-item
        display flex
        justify-content flex-start
        align-items center
        .input-box
          display flex
          justify-content flex-start
          align-items center
          margin-left .2rem
          span
            white-space nowrap
    button
      margin-left .2rem
</style>
