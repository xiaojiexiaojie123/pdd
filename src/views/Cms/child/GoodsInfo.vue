<template>
  <div class="goods-info">
    <div class="tabs">
      <div class="search-goods">
        <div class="search-item">
          <div class="input-box">
            <span>编号：</span>
            <Input v-model="searchGoodsId" style="width: auto" />
          </div>
          <div class="input-box">
            <span>关键词：</span>
            <Input v-model="searchGoodsName" style="width: auto" />
          </div>
        </div>
        <Button type="primary" @click="searGoodsInfo(0)">查询服装</Button>
      </div>
      <div class="right">
        <Button type="primary" @click="updownShelfGoods(1)">上架服装</Button>
        <Button type="primary" @click="updownShelfGoods(2)">下架服装</Button>
        <Button type="primary" @click="addGoodsInfo(3)">添加服装</Button>
      </div>
    </div>
    <Table border v-show="currentIndex === 0" :columns="searchColumns" :data="searchData" style="margin: .1rem .1rem 0" width="auto" />
    <Table border v-show="currentIndex === 1" :columns="upShelfColumns" :data="upShelfData" style="margin: .1rem .1rem 0" width="auto" />
    <Table border v-show="currentIndex === 2" :columns="downShelfColumns" :data="downShelfData" style="margin: .1rem .1rem 0" width="auto" />
    <Form :model="uploadList" :label-width="80"  v-show="currentIndex === 3" style="margin-top: .1rem">
      <FormItem label="服装名称">
        <Input v-model="uploadList.goods_name" placeholder="Enter something..." />
      </FormItem>
      <FormItem label="类别">
        <Select v-model="uploadList.category">
          <Option value="1">男装</Option>
          <Option value="2">女装</Option>
          <Option value="3">童装</Option>
          <Option value="4">婴儿装</Option>
          <Option value="5">T恤</Option>
          <Option value="6">衬衫</Option>
          <Option value="7">牛仔裤</Option>
          <Option value="8">休闲裤</Option>
          <Option value="9">短裤</Option>
          <Option value="10">裙装</Option>
        </Select>
      </FormItem>
      <FormItem label="原价">
        <Input v-model="uploadList.market_price" placeholder="Enter something..." />
      </FormItem>
      <FormItem label="现价">
        <Input v-model="uploadList.normal_price" placeholder="Enter something..." />
      </FormItem>
      <FormItem label="图片url">
        <Input v-model="uploadList.image_url" placeholder="Enter something..." />
      </FormItem>
      <FormItem label="库存">
        <Input v-model="uploadList.inventory" placeholder="Enter something..." />
      </FormItem>
      <FormItem label="发货地">
        <Input v-model="uploadList.address" placeholder="Enter something..." />
      </FormItem>
      <FormItem label="描述">
        <Input v-model="uploadList.goods_desc" placeholder="Enter something..." />
      </FormItem>
      <FormItem label="状态">
        <RadioGroup v-model="uploadList.status">
          <Radio label="1">上架</Radio>
          <Radio label="2">下架</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="uploadGoodsInfo">提交</Button>
        <Button style="margin-left: 8px">取消</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { searchGoodsInfo, updownGoodsInfo, updownShelfGoodsInfo, uploadGoodsInfo } from './../../../api/api'
export default  {
  name: 'goodsinfo',
  data () {
    return {
      uploadList: {
        goods_name: '',
        category: '',
        market_price: '',
        normal_price: '',
        image_url: '',
        inventory: '',
        address: '',
        goods_desc: '',
        status: '1'
      },
      currentIndex: 3,
      searchGoodsId: '',
      searchGoodsName: '',
      searchColumns: [
        {
          title: '服装编号',
          key: 'goods_id'
        },
        {
          title: '服装名称',
          key: 'goods_name'
        },
        {
          title: '原价',
          key: 'market_price'
        },
        {
          title: '现价',
          key: 'normal_price'
        },
        {
          title: '状态',
          key: 'status'
        }
      ],
      upShelfColumns: [
        {
          title: '服装编号',
          key: 'goods_id'
        },
        {
          title: '服装名称',
          key: 'goods_name'
        },
        {
          title: '原价',
          key: 'market_price'
        },
        {
          title: '现价',
          key: 'normal_price'
        },
        {
          title: '状态',
          key: 'status'
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
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.updownShelfGoodsInfo(params.row.goods_id)
                  }
                }
              }, '上架')
            ])
          }
        }
      ],
      downShelfColumns: [
        {
          title: '服装编号',
          key: 'goods_id'
        },
        {
          title: '服装名称',
          key: 'goods_name'
        },
        {
          title: '原价',
          key: 'market_price'
        },
        {
          title: '现价',
          key: 'normal_price'
        },
        {
          title: '状态',
          key: 'status'
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
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.updownShelfGoodsInfo(params.row.goods_id)
                  }
                }
              }, '下架')
            ])
          }
        }
      ],
      searchData: [],
      upShelfData: [],
      downShelfData: []
    }
  },
  methods: {
    searGoodsInfo (index) {
      this.currentIndex = index
      var data = {
        searchGoodsId: this.searchGoodsId,
        searchGoodsName: this.searchGoodsName
      }
      const res = searchGoodsInfo(data)
      res.then(result => {
        if (result.message.code === 200) {
          if (result.message.data.length > 0) {
            this.searchData = result.message.data
          } else {
            this.$Message.info('查询结果为空')
          }
        }
      })
    },
    updownShelfGoods (index) {
      console.log(index, typeof index)
      this.currentIndex = index
      index = index === 1 ? 2 : 1
      console.log(index)
      const res = updownGoodsInfo({status: index})
      res.then(result => {
        console.log(result)
        if (result.message.code === 200) {
          var data = result.message.data
          if (data.length > 0) {
            data.map((item, index) => {
              if (item.status == 1) {
                item.status = '上架'
              } else {
                item.status = '下架'
              }
              console.log(item.status)
              return item
            })
            if (this.currentIndex === 1) {
              this.upShelfData = data
            } else {
              this.downShelfData = data
            }
          }
        }
      })
    },
    updownShelfGoodsInfo (goods_id) {
      let data = {
        goods_id,
        status: this.currentIndex
      }
      const res = updownShelfGoodsInfo(data)
      res.then(result => {
        if (result.message.code === 200) {
          this.$Message.success('更新成功')
          this.updownShelfGoods(this.currentIndex)
        }
      })
    },
    addGoodsInfo (index) {
      this.currentIndex = index
    },
    uploadGoodsInfo () {
      console.log(this.uploadList)
      const res = uploadGoodsInfo(this.uploadList)
      res.then(result => {
        if (result.message.code === 200) {
          this.$Message.success('上传成功')
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
