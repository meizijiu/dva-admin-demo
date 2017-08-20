import { config, request } from '../utils'

const { api, apiPrefix } = config
const { users, user } = api

export async function queryUsers (params) {
  return request({
    url: users,
    method: 'get',
    data: params
  })
}

export async function add (params) {
  return request({
    url: user,
    data: params
  })
}

export async function update (params) {
  return request({
    url: user,
    data: params
  })
}
