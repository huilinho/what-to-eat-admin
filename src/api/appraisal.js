import request from '@/utils/request'

export function getInfoById(id) {
  return request({
    url: '/appraisal/' + id,
    method: 'get'
  })
}
export function getDish() {
  return request({
    url: '/dishes/dishesList',
    method: 'get'
  })
}
export function getUser() {
  return request({
    url: '/dishes/userList',
    method: 'get'
  })
}
export function getList(params) {
  return request({
    url: '/appraisal/list',
    method: 'get',
    params
  })
}

export function del(id) {
  return request({
    url: '/appraisal/' + id,
    method: 'delete'
  })
}

