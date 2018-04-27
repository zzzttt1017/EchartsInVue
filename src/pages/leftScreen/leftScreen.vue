<template>
  <div id="leftScreen" > <!-- 左屏 -->
    <!-- 上半屏 -->
    <div class="emp-veh">
        <!-- 从业人员 -->
        <div class="Employees">
          <div class="upper-half">
            <div class="upper-half-left">从业人员</div>
            <div class="upper-half-right"><span>{{ numberIncomeFromEachCollector.sum }}</span>人</div>
          </div>
          <div class="lower-half">
            <div class="lower-half-item">
              <span class="itemName">自由创业</span>
              <span class="itemValue">{{ numberIncomeFromEachCollector.pInc.positionType_0 }}</span>
              <span class="itemPercentage">{{ numberIncomeFromEachCollector.pNum[0] }}%</span>
            </div>
            <div class="lower-half-item">
              <span class="itemName">快乐增收</span>
              <span class="itemValue">{{ numberIncomeFromEachCollector.pInc.positionType_1 }}</span>
              <span class="itemPercentage">{{ numberIncomeFromEachCollector.pNum[1] }}%</span>
            </div>
            <div class="lower-half-item">
              <span class="itemName">轻松上班</span>
              <span class="itemValue">{{ numberIncomeFromEachCollector.pInc.positionType_2 }}</span>
              <span class="itemPercentage">{{ numberIncomeFromEachCollector.pNum[2] }}%</span>
            </div>
          </div>
        </div>
        <!-- 车主车辆 -->
        <div class="Vehicle ">
          <div class="upper-half">
            <div class="upper-half-left">车主车辆</div>
            <div class="upper-half-right"><span>{{ carsFromAll.carsNumber }}</span>辆</div>
          </div>
          <div class="lower-half">
            <div class="lower-half-item" ref="itemBox" :style="{width:itemRadius,height:itemRadius}">
              <span class="itemName">平均时长</span>
              <span class="itemValue">
                <span>
                  <strong>{{ carsFromAll.vipLicencsDuration }}</strong>分
                </span>
              </span>
            </div>
            <div class="lower-half-item" :style="{width:itemRadius,height:itemRadius}">
              <span class="itemName">平均消费</span>
              <span class="itemValue">
                <span>
                  <strong>{{ carsFromAll.vipLicencsExpenditures[0] }}</strong>.{{ carsFromAll.vipLicencsExpenditures[1] }}
                </span>
              </span>
            </div>
            <div class="lower-half-item" :style="{width:itemRadius,height:itemRadius}">
              <span class="itemName">平均停次</span>
              <span class="itemValue">
                <span>
                  <strong>{{ carsFromAll.vipLicencsTimes[0] }}</strong>.{{ carsFromAll.vipLicencsTimes[1] }}
                </span>
              </span>
            </div>
          </div>
        </div>
    </div>
    <!-- 欠费追缴 -->
    <div class="Arrear">
      <div class="left-half">
        <div class="upper-half">
          <div class="upper-half-left">欠费追缴</div>
          <div class="upper-half-right"><span>{{ chasingFromAll.wholeChasePay }}</span>元</div>
        </div>
        <div class="lower-half">
          <div class="lower-half-item">
            <span class="itemName">最大单笔</span>
            <span class="itemValue">
              <span>
                <strong>{{ chasingFromAll.wholeChasePayMaxMoney[0] }}</strong>.{{ chasingFromAll.wholeChasePayMaxMoney[1] }}
              </span>
            </span>
          </div>
          <div class="lower-half-item">
            <span class="itemName">最长时间</span>
            <span class="itemValue">
              <span>
                <strong>{{ chasingFromAll.wholeChasePayMaxDuration }}</strong>天
              </span>
            </span>
          </div>
        </div>
      </div>
      <div class="right-half">
        <keep-alive>
          <div id="arrearChart" :style="{width:'100%',height:'100%'}"></div>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import {getNumberIncomeFromEachCollector, getCarsFromAll, getChasingFromAll} from '../../service/getData.js'
export default {
  name: 'leftScreen',
  data () {
    return {
      itemRadius: '',
      autoGetDataInterval: null,
      numberIncomeFromEachCollector: {
        sum: '',
        pNum: [],
        pInc: {}
      },
      carsFromAll: {
        carsNumber: '',
        vipLicencsDuration: '',
        vipLicencsExpenditures: [],
        vipLicencsTimes: []
      },
      chasingFromAll: {
        wholeChasePay: '',
        wholeChasePayMaxDuration: '',
        wholeChasePayMaxMoney: []
      },
      arrearChartData: [
        {value: 0, name: '追缴总额'},
        {value: 0, name: '当前仍欠费总额'}
      ]
    }
  },
  created () {
    this.init()
  },
  mounted () {
    this.DrawAcircle()
  },
  methods: {
    init () {
      getNumberIncomeFromEachCollector()
        .then(res => {
          if (res.data) {
            this.handleEmployeesData(res.data.obj)
          }
        })
      getCarsFromAll()
        .then(res => {
          if (res.data) {
            this.handleCarsData(res.data.obj)
          }
        })
      getChasingFromAll()
        .then(res => {
          if (res.data) {
            this.handleChasingData(res.data.obj)
          }
        })
        .then(() => {
          this.drawArrearChart()
        })
      this.autoGetDataInterval = setInterval(() => { // 定时10秒获取数据并重新初始化
        clearInterval(this.autoGetDataInterval)
        this.init()
      }, 10000)
    },
    handleEmployeesData (val) { // 处理从业人员数据
      let pNum = JSON.parse(val.positionTypesNumber) // 由于得到的数据是字符串，所以这里转成json
      let pInc = JSON.parse(val.positionTypesIncome) // Same as above
      let sum = parseInt(pNum.positionType_0) + parseInt(pNum.positionType_1) + parseInt(pNum.positionType_2) // 计算总和
      this.numberIncomeFromEachCollector.sum = sum.toLocaleString()
      let percentage = []
      percentage.push(parseFloat(pNum.positionType_0) / sum * 100, parseFloat(pNum.positionType_1) / sum * 100, parseFloat(pNum.positionType_2) / sum * 100) // 计算百分比
      this.numberIncomeFromEachCollector.pNum = percentage
      for (let key in pInc) {
        pInc[key] = parseFloat(pInc[key] / 100).toFixed(2)
      }
      this.numberIncomeFromEachCollector.pInc = pInc
    },
    handleCarsData (val) { // 处理全网车辆数据
      this.carsFromAll.carsNumber = parseInt(val.carsNumber).toLocaleString()
      this.carsFromAll.vipLicencsDuration = parseInt(val.vipLicencsDuration / 60 / val.carsNumber) // 原始单位为 秒
      this.carsFromAll.vipLicencsExpenditures = parseFloat(val.vipLicencsExpenditures / 100 / val.carsNumber).toFixed(2).split('.') // 原始单位为 分钱,数据类型为数组，[0]是整数，[1]是小数部分
      this.carsFromAll.vipLicencsTimes = parseFloat(val.vipLicencsTimes / val.carsNumber).toFixed(2).split('.') // 平均停次Same as above
    },
    handleChasingData (val) { // 处理欠费追缴数据
      this.chasingFromAll.wholeChasePay = parseFloat(val.wholeChasePay / 100).toLocaleString()
      this.chasingFromAll.wholeChasePayMaxMoney = parseFloat(val.wholeChasePayMaxMoney / 100).toFixed(2).split('.')
      this.chasingFromAll.wholeChasePayMaxDuration = parseInt(val.wholeChasePayMaxDuration / 60 / 60 / 24)

      this.arrearChartData[0].value = parseFloat(val.wholeChasePay / 100) // 图表数据
      this.arrearChartData[1].value = parseFloat(val.wholeEscapeFee / 100)
    },
    DrawAcircle () { // 为了保证是一个正方形从而画出圆形
      let itemHeight = this.$refs.itemBox.clientHeight + 'px'
      let itemWidth = this.$refs.itemBox.clientWidth + 'px'
      if (itemHeight > itemWidth) {
        this.itemRadius = itemWidth
      } else {
        this.itemRadius = itemHeight
      }
    },
    drawArrearChart () {
      // 基于准备好的dom，初始化echarts实例
      let arrearChart = this.$echarts.init(document.getElementById('arrearChart'), 'light')
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
            name: '欠费追缴',
            type: 'pie',
            radius: ['42%', '55%'],
            color: ['#0056D1', '#00DAFE'],
            data: this.arrearChartData
          }
        ]
      }
      arrearChart.setOption(option)
    }
  },
  beforeDestroy () {
    clearInterval(this.autoGetDataInterval)
  }
}
</script>

<style lang="scss">
  $bgc: #011D35;
  @mixin commonFlexItem{
    flex: 1;
    padding: 100px 50px 50px 50px;
    background-color: $bgc;
    display: flex;
  }

  #leftScreen{
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
    .emp-veh{
      flex: 1;
      display: flex;
      justify-content: space-between;
      padding-bottom: 15px;
      .Employees,.Vehicle{
        @include commonFlexItem;
        .upper-half{
          flex:1;
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
      }
      .Employees{
        margin-right: 6px;
        flex-direction: column;
        & .lower-half{
          flex:1;
          display: flex;
          justify-content: space-between;
          .lower-half-item{
            flex:1;
            margin-left: 50px;
            border-radius: 1%;
            padding:30px;
            color:#fff;
            display: flex;
            justify-content: space-between;
            flex-direction: column-reverse;
            align-content: flex-end;
            .itemName{
              display: inline-flex;
              flex-direction: column-reverse;
              flex:2;
              font-size: 80px;
              font-weight: normal
            }
            .itemValue,.itemPercentage{
              flex: 1;
              font-size: 100px;
              align-self: flex-end;
            }
            &:first-child{
              margin-left: 0;
              background: #fbc786; /* Old browsers */
              background: -moz-linear-gradient(-45deg, #fbc786 0%, #f1937a 55%, #eb7573 100%); /* FF3.6-15 */
              background: -webkit-linear-gradient(-45deg, #fbc786 0%,#f1937a 55%,#eb7573 100%); /* Chrome10-25,Safari5.1-6 */
              background: linear-gradient(135deg, #fbc786 0%,#f1937a 55%,#eb7573 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
              filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fbc786', endColorstr='#eb7573',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
            }
            &:nth-child(2){
              background: #70faeb; /* Old browsers */
              background: -moz-linear-gradient(-45deg, #70faeb 0%, #56e9d9 36%, #41d9ca 62%, #24c5b5 100%); /* FF3.6-15 */
              background: -webkit-linear-gradient(-45deg, #70faeb 0%,#56e9d9 36%,#41d9ca 62%,#24c5b5 100%); /* Chrome10-25,Safari5.1-6 */
              background: linear-gradient(135deg, #70faeb 0%,#56e9d9 36%,#41d9ca 62%,#24c5b5 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
              filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#70faeb', endColorstr='#24c5b5',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
            }
            &:nth-child(3){
              background: #98d1f9; /* Old browsers */
              background: -moz-linear-gradient(-45deg, #98d1f9 1%, #75c2fa 13%, #207ce5 100%); /* FF3.6-15 */
              background: -webkit-linear-gradient(-45deg, #98d1f9 1%,#75c2fa 13%,#207ce5 100%); /* Chrome10-25,Safari5.1-6 */
              background: linear-gradient(135deg, #98d1f9 1%,#75c2fa 13%,#207ce5 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
              filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#98d1f9', endColorstr='#207ce5',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
            }
          }
        }
      }
      .Vehicle{
        margin-left: 6px;
        flex-direction: column;
        & .lower-half{
          flex:1;
          display: flex;
          justify-content: space-between;
          .lower-half-item{
            margin-left: 30px;
            border-radius: 50%;
            border: 2px solid rgb(63, 39, 170);
            -webkit-box-shadow:inset 0 0 60px rgba(41, 15, 163, 0.9);
            -moz-box-shadow:inset 0 0 60px rgba(41, 15, 163, 0.9);
            box-shadow:inset 0 0 60px rgba(41, 15, 163, 0.9);
            padding:6px;
            color:#fff;
            display: flex;
            justify-content: space-between;
            flex-direction: column-reverse;
            align-items: center;
            .itemName{
              flex:1;
              font-size: 60px;
            }
            .itemValue{
              display: inline-flex;
              flex-direction: column-reverse;
              flex: 1;
              & span strong{
                font-size: 100px;
                font-weight: normal;
              }
            }
            &:first-child{
              margin-left:0
            }
          }
        }
      }

    }
    .Arrear{
      @include commonFlexItem;
      .left-half{
        flex:1;
        margin-left: 6px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        & .upper-half{
          flex:1;
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
          justify-content: space-around;
          .lower-half-item{
            flex: 1;
            margin-left: 200px;
            border-radius: 1%;
            border: 2px solid rgb(41, 15, 163);
            -webkit-box-shadow:inset 0 0 60px rgba(41, 15, 163, 0.9);
            -moz-box-shadow:inset 0 0 60px rgba(41, 15, 163, 0.9);
            box-shadow:inset 0 0 60px rgba(41, 15, 163, 0.9);
            padding:120px;
            color:#fff;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            .itemName{
              flex:1;
              font-size: 70px;
            }
            .itemValue{
              flex: 1;
              display: inline-flex;
              flex-direction: column-reverse;
              font-size: 60px;
              text-align: right;
              & span strong{
                font-size: 100px;
                font-weight: normal;
              }
            }
            &:first-child{
              margin-left:0
            }
          }
        }
      }
      .right-half{
        flex: 1;

      }
    }
  }
</style>
