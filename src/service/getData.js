/*
 * @Author: someCat.zhangTao
 * @Date: 2018-04-23 14:37:44
 * @Last Modified by: someCat.zhangTao
 * @Last Modified time: 2018-04-25 11:02:29
 */
import fetch from '../config/fetch'

/* 查询全网停车,车牌来源各省数量（用于mapChart） */
export const getQuantityFromEachPovince = () => fetch({
  url: '/qp-platform/datas/get/provinces/license/number',
  method: 'get'
})

/* 查询各个收费员类型的个数及收入 */
export const getNumberIncomeFromEachCollector = () => fetch({
  url: '/qp-platform/datas/get/position/infos',
  method: 'get'
})

/* 查询会员车辆总数;所有会员车牌在全网累计停车总时长、累计消费金额、累计停车次数 */
export const getCarsFromAll = () => fetch({
  url: '/qp-platform/datas/get/owners/license',
  method: 'get'
})

/* 查询全网追缴信息 */
export const getChasingFromAll = () => fetch({
  url: '/qp-platform/datas/get/chase/pay/info',
  method: 'get'
})

/* 行业服务(总停车次数，当月新增停车次数、今日新增停车次数、各类型订单数) */
export const getIndustryServiceFromAll = () => fetch({
  url: '/qp-platform/datas/get/service/info',
  method: 'get'
})

/* （静态时长）查询全网时长信息(有效停车总时长、车辆总数、总停车记录条数、时长分布) */
export const getDurationFromAll = () => fetch({
  url: '/qp-platform/datas/get/duration/info',
  method: 'get'
})

/* 全网潮汐分布(全网今天各个时刻来车走车次数) */
export const getTidalDistributionFromAll = () => fetch({
  url: '/qp-platform/datas/get/tidehunter/distribution',
  method: 'get'
})

/* 查询数据生产(累计创收总额、今日停车次数、累计停车次数) */
export const getGrandTotalFromAll = () => fetch({
  url: '/qp-platform/datas/get/production',
  method: 'get'
})
