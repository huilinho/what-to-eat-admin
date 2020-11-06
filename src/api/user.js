import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return request({
    url: '/admin/info',
    method: 'get'
  })
}


export function getInvestInfo() {
  return request({
    url: '/admin/getInvestInfo',
    method: 'get'
  })
}

export function getInfoById(id) {
  return request({
    url: '/user/' + id,
    method: 'get'
  })
}
export function getList(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: '/user/',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/user/',
    method: 'put',
    data
  })
}

export function del(id) {
  const url = '/user/' + id
  return request({
    url: url,
    method: 'delete'
  })
}

