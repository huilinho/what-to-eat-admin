import request from '@/utils/request'

export function getInfoById(id) {
  return request({
    url: '/window/' + id,
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

export function getWindowList(id) {
  return request({
    url: '/window/pack' + id,
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


