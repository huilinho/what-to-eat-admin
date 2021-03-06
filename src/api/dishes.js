import request from '@/utils/request'


export function getInfoById(id) {
  return request({
    url: '/dishes/' + id,
    method: 'get'
  })
}
export function getList(params) {
  return request({
    url: '/dishes/list',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: '/dishes/',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/dishes/',
    method: 'put',
    data
  })
}

export function del(id) {
  return request({
    url: '/dishes/' + id,
    method: 'delete'
  })
}

