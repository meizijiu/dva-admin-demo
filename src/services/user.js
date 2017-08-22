import { request, config } from '../utils'

const { api } = config
const { user, users } = api

export async function update (params) {
  return request({
    url: user,
    method: 'patch',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: user,
    method: 'delete',
    data: params
  })
}

export async function add (params) {
  return request({
    url: user,
    method: 'post',
    data: params
  })
}
