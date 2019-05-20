<template>
  <div class="chart">
    <div id="chart1" :style="{width: '800px', height: '200px'}"></div>
    <div id="chart2" :style="{width: '800px', height: '200px'}"></div>
  </div>
</template>

<script>
import { goodsRank, orderLatestSeven } from './../../../api/api'
const echarts = require('echarts')
export default {
  name: 'chart',
  data () {
    return {
      goodsTopFive: [],
      orderLatestSeven: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getDay (day) {
      let time = new Date()
      time.setDate(time.getDate() + day)
      let m = time.getMonth() + 1
      let d = time.getDate()
      return `${m}月${d}日`
    },
    getData () {
      const res1 = goodsRank()
      const res2 = orderLatestSeven()
      Promise.all([res1, res2]).then(result => {
        this.orderLatestSeven = result[0].message.data
        this.goodsTopFive = result[1].message.data
        this.initCharts()
      })
    },
    initCharts () {
      // 基于准备好的dom，初始化echarts实例
      let chart1 = echarts.init(document.getElementById('chart1'))
      let xAxisData1 = []
      let yAxisData1 = []
      this.goodsTopFive.forEach((item, index) => {
        xAxisData1.unshift(item.date)
        yAxisData1.unshift(item.count)
      })
      // 绘制图表
      chart1.setOption({
        title: {
          text: '近七日订单趋势图'
        },
        tooltip: {},
        xAxis: {
          data: xAxisData1
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'line',
          data: yAxisData1
        }]
      })

      // 基于准备好的dom，初始化echarts实例
      let chart2 = echarts.init(document.getElementById('chart2'))

      let xAxisData2 = []
      let yAxisData2 = []
      this.orderLatestSeven.forEach((item, index) => {
        xAxisData2.push(item.goods_id)
        yAxisData2.push(item.count)
      })
      // 绘制图表
      chart2.setOption({
        title: {
          text: '服装销售量前5名'
        },
        tooltip: {},
        xAxis: {
          data: xAxisData2
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: yAxisData2
        }]
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
