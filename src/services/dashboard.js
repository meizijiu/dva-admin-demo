import { request, config } from '../utils'

const { api, appKey } = config
const { dashboard } = api
const { weatherKey } = appKey

export async function myCity (params) {
  return request({
    url: 'http://weatherapi.market.xiaomi.com/wtr-v2/temp/forecast',
    data: params,
  })
}

export async function queryWeather (params) {
  params = {
    ...params,
    key: weatherKey,
  }

  return request({
    url: 'http://v.juhe.cn/weather/index',
    data: params,
  })
}

export async function query (params) {
  return request({
    url: dashboard,
    method: 'get',
    data: params,
  })
}
