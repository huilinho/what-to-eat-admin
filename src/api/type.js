import request from '@/utils/request'

export function getInfoById(id) {
  return request({
    url: '/type/' + id,
    method: 'get'
  })
}
export function getList(params) {
  return request({
    url: '/type/list',
    method: 'get',
    params
  })
}

export function getTypeList() {
  return request({
    url: '/type/pack',
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: '/type/',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/type/',
    method: 'put',
    data
  })
}

export function del(id) {
  return request({
    url: '/type/' + id,
    method: 'delete'
  })
}


