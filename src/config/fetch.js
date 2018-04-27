/*
 * @Author: someCat.zhangTao
 * @Date: 2018-04-23 14:34:18
 * @Last Modified by: someCat.zhangTao
 * @Last Modified time: 2018-04-26 11:06:38
 */
import axios from 'axios'
import { baseUrl } from './evn'

const service = axios.create({
  baseURL: baseUrl
})

// 请求拦截器
service.interceptors.request.use(config => {
  config.data = JSON.stringify(config.data)
  config.headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
service.interceptors.response.use(res => {
  return res
}, err => {
  console.log('服务器貌似出了点问题')
  return Promise.reject(err)
})

export default service
