import request from '@/utils/request'

export function getById(id) {
  return request({
    url: '/window/' + id,
    method: 'get'
  })
}

export function getNameList() {
  return request({
    url: '/window/pack',
    method: 'get'
  })
}

export function getList(params) {
  return request({
    url: '/window/list',
    method: 'get',
    params
  })
}

export function getWindowList(data1, data2) {
  return request({
    url: '/window/' + data1 + '/' + data2,
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: '/window/',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/window/',
    method: 'put',
    data
  })
}

export function del(id) {
  return request({
    url: '/window/' + id,
    method: 'delete'
  })
}


