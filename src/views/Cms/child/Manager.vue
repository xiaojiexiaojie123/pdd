<template>
  <div class="goods-info">
    <div class="tabs">
      <div class="search-goods">
        <div class="search-item">
          <div class="input-box">
            <span>管理员名：</span>
            <Input v-model="searchManagerName" style="width: auto" />
          </div>
        </div>
        <Button type="primary" @click="searManagerInfo(false)">查询管理员</Button>
        <Button type="primary" @click="searManagerInfo(true)">查询全部管理员</Button>
      </div>
      <Button type="primary" @click="addManagerInfo">添加管理员</Button>
    </div>
    <Table v-show="!showAddManagerInfo" border :columns="managerColumns" :data="managerData" style="margin: .1rem .1rem 0" width="auto" />
    <Form v-show="showAddManagerInfo" :model="uploadManagerInfo" :label-width="80" style="margin-top: .1rem">
      <FormItem label="用户名">
        <Input v-model="uploadManagerInfo.username" placeholder="Enter something..." />
      </FormItem>
      <FormItem label="密码">
        <Input v-model="uploadManagerInfo.password" placeholder="Enter something..." />
      </FormItem>
      <FormItem label="手机">
        <Input v-model="uploadManagerInfo.phone" placeholder="Enter something..." />
      </FormItem>
      <FormItem label="备注">
        <Input v-model="uploadManagerInfo.remarks" placeholder="Enter something..." />
      </FormItem>
      <FormItem>
        <Button type="primary" @click="submitManagerInfo">提交</Button>
        <Button style="margin-left: 8px">取消</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { searchManagerInfo, delManagerInfo, addManagerInfo } from './../../../api/api'
export default {
  name: 'manager',
  data () {
    return {
      searchManagerName: '',
      managerColumns: [
        {
          title: '用户名',
          key: 'username'
        },
        {
          title: '密码',
          key: 'password'
        },
        {
          title: '手机',
          key: 'phone'
        },
        {
          title: '备注',
          key: 'remarks'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.delManagerInfoTip(params.row.username)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      managerData: [],
      showAddManagerInfo: false,
      uploadManagerInfo: {
        username: '',
        password: '',
        phone: '',
        remarks: ''
      }
    }
  },
  methods: {
    searManagerInfo (isAll) {
      this.showAddManagerInfo = false
      let data = {username: this.searchManagerName, isAll}
      const res = searchManagerInfo(data)
      res.then(result => {
        if (result.message.code === 200) {
          console.log(result)
          if (result.message.data.length > 0) {
            this.managerData = result.message.data
          } else {
            this.$Message.info('查不到管理员信息')
          }
        }
      })
    },
    addManagerInfo () {
      this.showAddManagerInfo = true
    },
    delManagerInfoTip (username) {
      this.$Modal.confirm({
        title: '警告',
        content: '确定要删除该管理员信息吗？',
        onOk: () => {
          this.delManagerInfo(username)
        }
      })
    },
    delManagerInfo (username) {
      console.log(username)
      const res = delManagerInfo({username})
      res.then(result => {
        if (result.message.code === 200) {
          this.$Message.info('删除成功')
          window.location.reload()
        }
      })
    },
    submitManagerInfo () {
      const res = addManagerInfo(this.uploadManagerInfo)
      res.then(result => {
        if (result.message.code === 200) {
          this.$Message.info('插入成功')
          window.location.reload()
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
