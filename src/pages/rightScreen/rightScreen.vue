<template>
  <div id="rightScreen" > <!-- 右屏 -->
    <!-- 上半屏 -->
    <div class="upperScreen">
        <!-- 行业服务 -->
        <div class="Service">
            <div class="service-left">
                <div class="upper-half">
                    <div class="upper-half-left">行业服务</div>
                    <div class="upper-half-right"><span>{{ industryServiceData.wholeTotalTime }}</span>次</div>
                </div>
                <div class="lower-half">
                    <div class="lower-half-item">
                        <span class="itemName">当月新增</span>
                        <span class="itemValue">
                            <span>
                                <strong>{{ industryServiceData.wholeMothTotalTime }}</strong>
                            </span>
                        </span>
                    </div>
                    <div class="lower-half-item">
                        <span class="itemName">今日新增</span>
                        <span class="itemValue">
                            <span>
                                <strong>{{ industryServiceData.wholeDayTotalTime }}</strong>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
            <div class="service-right">
                <div id="seviceChart" :style="{width:'100%',height:'100%'}"></div>
            </div>
        </div>
        <!-- 静态时长 -->
        <div class="Duration ">
            <div class="duration-left">
                <div class="upper-half">
                    <div class="upper-half-left">静态时长</div>
                    <div class="upper-half-right"><span>{{ durationData.wholeTotalDuration }}</span>小时</div>
                </div>
                <div class="lower-half">
                    <div class="lower-half-item">
                        <span class="itemName">车辆平均时长</span>
                        <span class="itemValue">
                            <span>
                                <strong>{{ durationData.carsAverageDuration }}</strong>分
                            </span>
                        </span>
                    </div>
                    <div class="lower-half-item">
                        <span class="itemName">日均停车时长</span>
                        <span class="itemValue">
                            <span>
                                <strong>{{ durationData.timesAverageDuration }}</strong>分
                            </span>
                        </span>
                    </div>
                </div>
            </div>
            <div class="duration-right">
                <div id="durationChart" :style="{width:'100%',height:'100%'}"></div>
            </div>
        </div>
    </div>
    <!-- 下半屏 -->
    <div class="lowerScreen">
        <!-- 潮汐分布 -->
        <div class="Tidal">
            <div id="tidalChart" :style="{width:'100%',height:'100%'}"></div>
        </div>
        <!-- 产量 -->
        <div class="yield">
            <div class="yield-item">
                <div class="yield-item-left">累计创收</div>
                <div class="yield-item-right"><span>{{ grandTotalData.wholeTotalIncome[0] }}<span>.{{ grandTotalData.wholeTotalIncome[1] }}</span></span>元</div>
            </div>
            <div class="yield-item">
                <div class="yield-item-left">今日产量</div>
                <div class="yield-item-right"><span>{{ grandTotalData.wholeDayTotalTime }}</span>{{grandTotalData.wholeDayTotalTime === '暂无数据' ? '' : '笔'}}</div>
            </div>
            <div class="yield-item">
                <div class="yield-item-left">累计产量</div>
                <div class="yield-item-right"><span>{{ grandTotalData.wholeTotalTime }}</span>笔</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {getIndustryServiceFromAll, getDurationFromAll, getTidalDistributionFromAll, getGrandTotalFromAll} from '../../service/getData.js'
export default {
  name: 'rightScreen',
  data () {
    return {
      industryServiceData: {
        wholeTotalTime: '',
        wholeDayTotalTime: '',
        wholeMothTotalTime: ''
      },
      seviceChartData: [
        {value: 0, name: '普通停车记录'},
        {value: 0, name: '迅停单停车'},
        {value: 0, name: '泊乐单停车'},
        {value: 0, name: '泊悦单停车（代泊代驾停车）'}
      ],
      durationData: {
        wholeTotalDuration: '', // 总时长
        carsAverageDuration: '', // 车均时长
        timesAverageDuration: '' // 次均时长（文档上是 日均累计）
      },
      durationChartData: [
        {value: 135, name: '<1h'},
        {value: 234, name: '>1h and <=2h'},
        {value: 234, name: '>2h and <=6h'},
        {value: 310, name: '>6h and <=12h'},
        {value: 335, name: '>12h'}
      ],
      grandTotalData: {
        wholeTotalIncome: [], // 累计创收
        wholeTotalTime: '', // 累计产量
        wholeDayTotalTime: '' // 今日产量
      },
      tidalChartData: {
        wholeTimeCarComeNumbers: [],
        wholeTimeCarGoNumbers: []
      },
      autoGetDataInterval: null
    }
  },
  created () {
    this.init()
  },
  mounted () {
  },
  methods: {
    init () {
      getIndustryServiceFromAll()
        .then(res => {
          if (res.data) {
            this.handleIndustryServiceData(res.data.obj)
          }
        })
        .then(() => {
          this.drawSeviceChart()
        })
      getDurationFromAll()
        .then(res => {
          if (res.data) {
            this.handleDurationData(res.data.obj)
          }
        })
        .then(() => {
          this.drawDurationChart()
        })
      getTidalDistributionFromAll()
        .then(res => {
          if (res.data) {
            this.handleTidalData(res.data.obj)
          }
        })
        .then(() => {
          this.drawTidalChart()
        })
      getGrandTotalFromAll()
        .then(res => {
          if (res.data) {
            this.handleGrandTotalData(res.data.obj)
          }
        })
      this.autoGetDataInterval = setInterval(() => { // 定时10秒获取数据并重新初始化
        clearInterval(this.autoGetDataInterval)
        this.init()
      }, 10000)
    },
    handleIndustryServiceData (val) {
      this.industryServiceData.wholeTotalTime = val.wholeTotalTime != null ? parseInt(val.wholeTotalTime).toLocaleString() : '暂无数据'
      this.industryServiceData.wholeDayTotalTime = val.wholeDayTotalTime != null ? parseInt(val.wholeDayTotalTime).toLocaleString() : '暂无数据'
      this.industryServiceData.wholeMothTotalTime = val.wholeMothTotalTime != null ? parseInt(val.wholeMothTotalTime).toLocaleString() : '暂无数据'

      this.seviceChartData[0].value = val.wholeOrderTypeNumber.orderType_0 != null ? parseInt(val.wholeOrderTypeNumber.orderType_0) : '0'
      this.seviceChartData[1].value = val.wholeOrderTypeNumber.orderType_1 != null ? parseInt(val.wholeOrderTypeNumber.orderType_1) : '0'
      this.seviceChartData[2].value = val.wholeOrderTypeNumber.orderType_2 != null ? parseInt(val.wholeOrderTypeNumber.orderType_2) : '0'
      this.seviceChartData[3].value = val.wholeOrderTypeNumber.orderType_3 != null ? parseInt(val.wholeOrderTypeNumber.orderType_3) : '0'
    },
    handleDurationData (val) {
      this.durationData.wholeTotalDuration = val.wholeTotalDuration != null ? parseInt(parseInt(val.wholeTotalDuration) / 60 / 60).toLocaleString() : '暂无数据'
      this.durationData.carsAverageDuration = parseInt(val.wholeTotalDuration / 60 / val.wholeLicencsNumber)
      this.durationData.timesAverageDuration = parseInt(val.wholeTotalDuration / 60 / val.wholeTotalTime)

      this.durationChartData[0].value = parseInt(val.wholeDurationDistribution.durationType_1)
      this.durationChartData[1].value = parseInt(val.wholeDurationDistribution.durationType_2)
      this.durationChartData[2].value = parseInt(val.wholeDurationDistribution.durationType_6)
      this.durationChartData[3].value = parseInt(val.wholeDurationDistribution.durationType_12)
      this.durationChartData[4].value = parseInt(val.wholeDurationDistribution.durationType_20)
    },
    handleTidalData (val) {
      for (let i in val.wholeTimeCarComeNumbers) {
        val.wholeTimeCarComeNumbers[i] = parseInt(val.wholeTimeCarComeNumbers[i])
      }
      this.tidalChartData.wholeTimeCarComeNumbers = val.wholeTimeCarComeNumbers
      for (let i in val.wholeTimeCarGoNumbers) {
        val.wholeTimeCarGoNumbers[i] = parseInt(val.wholeTimeCarGoNumbers[i])
      }
      this.tidalChartData.wholeTimeCarGoNumbers = val.wholeTimeCarGoNumbers
    },
    handleGrandTotalData (val) {
      this.grandTotalData.wholeTotalIncome = parseFloat(parseInt(val.wholeTotalIncome) / 100).toLocaleString().split('.')
      this.grandTotalData.wholeTotalTime = parseInt(val.wholeTotalTime).toLocaleString()
      this.grandTotalData.wholeDayTotalTime = val.wholeDayTotalTime != null ? parseInt(val.wholeDayTotalTime).toLocaleString() : '暂无数据'
    },
    drawSeviceChart () {
      // 行业服务饼图
      let seviceChart = this.$echarts.init(document.getElementById('seviceChart'), 'light')
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          show: false
        },
        series: [
          {
            name: '行业服务',
            type: 'pie',
            radius: '70%',
            center: ['55%', '50%'],
            color: ['#B002FF', '#0396FE', '#EA1203', '#FF9501'],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              show: false
            },
            data: this.seviceChartData
          }
        ]
      }
      seviceChart.setOption(option)
    },
    drawDurationChart () {
      // 静态时长饼图
      let durationChart = this.$echarts.init(document.getElementById('durationChart'), 'light')
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          show: false
        },
        series: [
          {
            name: '静态时长',
            type: 'pie',
            radius: '70%',
            center: ['55%', '50%'],
            color: ['#FFFF01', '#00FF01', '#00E4FF', '#FFCA58', '#FFB7B8'],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              show: false
            },
            data: this.durationChartData
          }
        ]
      }
      durationChart.setOption(option)
    },
    drawTidalChart () {
      // 全网潮汐比例日均分布
      let tidalChart = this.$echarts.init(document.getElementById('tidalChart'), 'light')
      let comeCar = this.tidalChartData.wholeTimeCarComeNumbers
      let goCar = this.tidalChartData.wholeTimeCarGoNumbers
      let option = {
        title: {
          text: '全网潮汐比例日均分布',
          textStyle: {
            color: '#fff',
            fontWeight: 'normal',
            fontSize: '24'
          },
          top: '2%',
          left: '20%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (data) {
            var _str = ''
            _str += '来车： ' + comeCar[data[0].dataIndex] + ' 辆<br>'
            _str += '走车： ' + goCar[data[0].dataIndex] + ' 辆<br>'
            // _str += '比例： ' + (goCar[data[0].dataIndex] * 100 / comeCar[data[0].dataIndex]).toFixed(2) + ' %'
            return _str
          }
        },
        legend: {
          show: true,
          left: 'right',
          top: '10%',
          data: ['来车', '走车'],
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '3%',
          top: '20%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            show: false
          },
          data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
        },
        yAxis: {
          name: '100%',
          type: 'value',
          show: true,
          max: 100,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        series: [{
          left: 'center',
          top: 'middle',
          name: '走车',
          type: 'bar',
          stack: '辆',
          barWidth: '50%',
          label: {
            normal: {
            //   show: true,
            //   formatter: function (data) {
            //     return comeCar[data.dataIndex] + ' '
            //   },
            //   position: 'inside'
            }
          },
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#EE64FF'
              }, {
                offset: 1,
                color: '#9C14FF'
              }])
            }
          },
          data: comeCar.map(function (item, index) {
            return parseInt(item / (item + goCar[index]) * 100)
          })
        }, {
          name: '来车',
          type: 'bar',
          stack: '辆',
          label: {
            normal: {
            //   show: true,
            //   formatter: function (data) {
            //     return goCar[data.dataIndex] + ' '
            //   },
            //   position: 'inside'
            }
          },
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#4FF6C2'
              }, {
                offset: 1,
                color: '#47BDF4'
              }])
            }
          },
          data: goCar.map(function (item, index) {
            return parseFloat(item / (item + comeCar[index]) * 100)
          })
        }]
      }
      tidalChart.setOption(option)
    }

  },
  beforeDestroy () {
    clearInterval(this.autoGetDataInterval)
  }

}
</script>

<style lang="scss">
  $bgc: #011D35;
  $fontSize: 60px;
  @mixin commonFlexItem{
    flex: 1;
    padding: 100px 50px 50px 50px;
    background-color: $bgc;
    display: flex;
  }

  #rightScreen{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #04455C;
    background: -moz-linear-gradient(top, #04455C 0%, #04435C 1%, #022341 99%, #021032 100%);
    background: -webkit-linear-gradient(top, #04455C 0%, #04435C 1%, #022341 99%, #021032 100%);
    background: linear-gradient(to bottom, #04455C 0%, #04435C 1%, #022341 99%, #021032 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#04455C', endColorstr='#021032',GradientType=0 );
    color: rgb(255, 255, 255);
    box-sizing: border-box;
    padding: 15px;
    width: 100%;
    height: 100%;
    font-size: $fontSize;
    .upperScreen{
      flex: 1;
      display: flex;
      justify-content: space-between;
      padding-bottom: 15px;
      .Service,.Duration{
        @include commonFlexItem;
        display: flex;
        .service-left,.duration-left{
            flex: 1;
            margin-right: 6px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .upper-half{
                flex:2;
                display: flex;
                justify-content: space-between;
                .upper-half-left{
                    font-size: 80px;
                }
                .upper-half-right{
                    align-self: center;
                    span{
                        color: #FE9402;
                        font-size: 120px
                    }
                }
            }
            & .lower-half{
                flex:1;
                display: flex;
                justify-content: space-between;
                .lower-half-item{
                    flex:1;
                    margin-left: 30px;
                    border-radius: 1%;
                    padding:30px;
                    color:#fff;
                    display: flex;
                    justify-content: space-between;
                    flex-direction: column;
                    border: 2px solid rgb(63, 39, 170);
                    -webkit-box-shadow:inset 0 0 60px rgba(41, 15, 163, 0.9);
                    -moz-box-shadow:inset 0 0 60px rgba(41, 15, 163, 0.9);
                    box-shadow:inset 0 0 60px rgba(41, 15, 163, 0.9);
                    .itemName{

                        flex:1;
                        font-size: 70px;
                        font-weight: normal
                    }
                    .itemValue{
                        flex: 1;
                        align-self: center;
                        & span strong{
                            font-size: 100px;
                            font-weight: normal;
                        }
                    }
                }
            }
        }
        .service-right,.duration-right{
            flex: 1
        }
      }
      .Duration{
        margin-left: 20px;
      }

    }
    .lowerScreen{
      flex: 1;
      display: flex;
      justify-content: space-between;
      padding-bottom: 15px;
      .Tidal{
        @include commonFlexItem;
        flex: 4;
        margin-right: 30px;
        padding:20px;
        }
      .yield{
        @include commonFlexItem;
        flex-direction: column;
        .yield-item{
            flex:1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin: 40px;
            padding: 30px;
            .yield-item-left{
                font-size: 80px;
            }
            .yield-item-right{
                align-self: flex-end;
                span{
                    color: #FE9402;
                    font-size: 120px;
                    span{
                      font-size: $fontSize
                    }
                }
            }
            &:first-child{
                justify-content: flex-end;
            }
            &:nth-child(2),&:nth-child(3){
                flex:2;
                span{
                    color: #fff;
                }
                border: 2px solid rgb(63, 39, 170);
                -webkit-box-shadow:inset 0 0 60px rgba(41, 15, 163, 0.9);
                -moz-box-shadow:inset 0 0 60px rgba(41, 15, 163, 0.9);
                box-shadow:inset 0 0 60px rgba(41, 15, 163, 0.9);
            }
        }
      }
    }
  }
</style>
