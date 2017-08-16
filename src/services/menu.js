import { request, config } from '../utils'

const { api } = config
const { menu } = api

export async function query (params) {
  return request({
    url: menus,
    method: 'get',
    data: params,
  })
}
