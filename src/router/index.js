import Vue from 'vue'
import Router from 'vue-router'
import Navigation from '@/components/Navigation'
import mapChart from '@/pages/mapChart/mapChart'
import leftScreen from '@/pages/leftScreen/leftScreen'
import rightScreen from '@/pages/rightScreen/rightScreen'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Navigation',
      component: Navigation
    },
    {
      path: '/mapChart',
      name: 'mapChart',
      component: mapChart
    },
    {
      path: '/leftScreen',
      name: 'leftScreen',
      component: leftScreen
    },
    {
      path: '/rightScreen',
      name: 'rightScreen',
      component: rightScreen
    }
  ]
})
