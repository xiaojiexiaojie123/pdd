<template>
  <div class="goods-info">
    <div class="tabs">
      <div class="search-goods">
        <Row style="margin-left: .15rem;width: 450px">
          <Col span="12">
            <DatePicker type="date" @on-change="getbeginDate" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" style="width: 200px"></DatePicker>
          </Col>
          <Col span="12">
            <DatePicker type="date" @on-change="getendDate" format="yyyy-MM-dd HH:mm:ss" placement="bottom-end" placeholder="结束日期" style="width: 200px"></DatePicker>
          </Col>
        </Row>
        <div class="search-item">
          <div class="input-box">
            <span>订单编号：</span>
            <Input v-model="searchOrdersId" style="width: auto" />
          </div>
        </div>
        <Button type="primary" @click="searOrdersInfo">查询订单</Button>
      </div>
    </div>
    <Table border :columns="orderColumns" :data="orderData" style="margin: .1rem .1rem 0" width="auto" />
  </div>
</template>

<script>
import { searchOrdersInfo, deliverGoods } from './../../../api/api'
export default  {
  name: 'order',
  data () {
    return {
      searchOrdersId: '',
      beginDate: '',
      endDate: '',
      orderColumns: [
        {
          title: '订单编号',
          key: 'order_id'
        },
        {
          title: '服装编号',
          key: 'goods_id'
        },
        {
          title: '服装名称',
          key: 'goods_name'
        },
        {
          title: '用户名',
          key: 'user_id'
        },
        {
          title: '支付价格',
          key: 'price'
        },
        {
          title: '支付时间',
          key: 'insert_time'
        },
        {
          title: '收件人',
          key: 'receivename'
        },
        {
          title: '收件地址',
          key: 'address'
        },
        {
          title: '状态',
          key: 'goods_status'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            if (params.row.goods_status == '已付款') {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      console.log(params.row, params.row.goods_name, 'shsh')
                      this.deliverGoods(params.row)
                    }
                  }
                }, '发货')
              ])
            }
          }
        }
      ],
      orderData: [],
      statusMap: {
        '1': '未支付',
        '2': '已付款',
        '3': '已发货',
        '4': '已收货',
        '5': '已评论'
      }
    }
  },
  methods: {
    searOrdersInfo () {
      let data = {
        order_id: this.searchOrdersId,
        beginDate: this.beginDate,
        endDate: this.endDate
      }
      console.log(data, 'data')
      const res = searchOrdersInfo(data)
      res.then(result => {
        if (result.message.code === 200) {
          console.log(result)
          this.orderData = result.message.data
          this.orderData.map((item, index) => {
            item.goods_status = this.statusMap[item.goods_status]
            item.price = '￥' + (item.price / 100).toFixed(2)
            return item
          })
        }
      })
    },
    deliverGoods (orderInfo) {
      const res = deliverGoods({order_id: orderInfo.order_id})
      res.then(result => {
        if (result.message.code === 200) {
          this.$Message.success('发货成功')
          this.searOrdersInfo()
        }
      })
    },
    getbeginDate (e) {
      this.beginDate = e
    },
    getendDate (e) {
      this.endDate = e
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
