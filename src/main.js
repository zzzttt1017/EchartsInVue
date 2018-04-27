/*
 * @Author: someCat.zhangTao
 * @Date: 2018-04-27 10:56:34
 * @Last Modified by:   someCat.zhangTao
 * @Last Modified time: 2018-04-27 10:56:34
 */
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import 'babel-polyfill'

// 引入echarts
import echarts from 'echarts'
const chinaMap = require('./assets/china.json')
echarts.registerMap('china', chinaMap)

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
