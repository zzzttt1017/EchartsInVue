<template>
  <div id="map-chart-root">
    <keep-alive>
      <div id="mapChart" :style="{width: '100%', height: height}"></div>
    </keep-alive>
  </div>
</template>

<script>
// 接口
import {getQuantityFromEachPovince} from '../../service/getData.js'
export default {
  name: 'mapChart',
  data () {
    return {
      Data: [],
      autoGetDataInterval: null
    }
  },
  props: {
    height: {
      type: String,
      default () {
        '960px'
      }
    }
  },
  created () {
    this.init()
  },
  mounted () {
  },
  methods: {
    init () { // 初始化
      getQuantityFromEachPovince()
        .then(res => {
          if (res.data) {
            let temp = res.data.obj
            let list = []
            for (let i in temp) {
              let listItem = {name: temp[i].name, value: temp[i].number}
              list.push(listItem)
            }
            this.Data = list
          }
        })
        .then(() => {
          this.drawMapChart()
        })
      this.autoGetDataInterval = setInterval(() => { // 定时10秒获取数据并重新初始化
        clearInterval(this.autoGetDataInterval)
        this.init()
      }, 10000)
    },
    drawMapChart () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('mapChart'), 'light')
      let option = {
        baseOption: {
          tooltip: {
            trigger: 'item'
          },
          visualMap: {
            pieces: [ // 自定分段
              {min: 0, max: 500, color: '#A6A6A6'},
              {min: 500, max: 1000, color: '#FE9798'},
              {min: 1000, max: 3000, color: '#FE9143'},
              {min: 3000, color: '#C81F2C'}
            ],
            splitNumber: 4,
            right: '5%',
            top: '40%',
            textStyle: {
              color: '#fff',
              fontSize: '30',
              fontWeight: 'normal'
            },
            itemSymbol: 'arrow',
            itemWidth: '80',
            itemHeight: '40',
            align: 'left',
            itemGap: 30
          },
          series: [
            {
              normal: {label: {show: true}},
              selectedMode: 'single',
              hoverable: false,
              left: 'center',
              top: 'middle',
              name: '车辆',
              type: 'map',
              mapType: 'china',
              roam: false,
              label: {
                show: false,
                color: '#fff',
                emphasis: {
                  color: '#000',
                  fontWeight: 'bolder'
                }
              },
              itemStyle: {
                areaColor: '#fff',
                borderWidth: 1.2
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: '#fff'
                }
              },
              data: this.Data
            }
          ]
        },
        media: [ // 媒体查询
          {
            query: {maxWidth: 1150}, // 规则。
            option: { // 规则满足下的option。
              title: {
                textStyle: {
                  color: '#fff',
                  fontSize: '30',
                  fontWeight: '100'
                },
                left: 'center',
                top: '2'
              },
              visualMap: {
                right: '5%',
                top: '10%',
                textStyle: {
                  color: '#fff',
                  fontSize: '12',
                  fontWeight: 'normal'
                },
                itemSymbol: 'arrow',
                itemWidth: '30',
                itemHeight: '12',
                align: 'auto',
                itemGap: 12
              }
            }
          }
        ]

      }
      // 绘制图表
      myChart.setOption(option)
    }

  },
  beforeDestroy () {
    clearInterval(this.autoGetDataInterval)
  }
}
</script>

<style lang="scss">
  #map-chart-root {
      background: #04455C;
      background: -moz-linear-gradient(top, #04455C 0%, #04435C 1%, #022341 99%, #021032 100%);
      background: -webkit-linear-gradient(top, #04455C 0%, #04435C 1%, #022341 99%, #021032 100%);
      background: linear-gradient(to bottom, #04455C 0%, #04435C 1%, #022341 99%, #021032 100%);
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#04455C', endColorstr='#021032',GradientType=0 );
  }
</style>
