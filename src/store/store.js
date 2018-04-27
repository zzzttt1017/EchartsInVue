/*
* @Author: Administrator
* @Date:   2017-12-08 11:46:48
 * @Last Modified by: someCat.zhangTao
 * @Last Modified time: 2018-04-23 15:02:26
*/

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    sessionId: localStorage.getItem('sessionId') // session Id
  },
  mutations: {
    sessionId (state, data) {
      state.sessionId = data
      localStorage.setItem('sessionId', data)
    }
  }
}
)

export default store
