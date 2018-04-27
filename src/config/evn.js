/*
 * @Author: someCat.zhangTao
 * @Date: 2018-04-23 14:24:05
 * @Last Modified by: someCat.zhangTao
 * @Last Modified time: 2018-04-27 11:04:05
 */
let baseUrl = ''
let urlArray = [
  'http://120.76.154.100:8030', // 测试服
  'http://web.quickpark.com.cn:8030' // 线上
]

// if (process.env.NODE_ENV == 'development') {
baseUrl = urlArray[1]
// } else if (process.env.NODE_ENV == 'production') {
//   // baseUrl = '';
// }

export {
  baseUrl
}
