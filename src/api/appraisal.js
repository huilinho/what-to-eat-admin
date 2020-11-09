import request from '@/utils/request'

export function getInfoById(id) {
  return request({
    url: '/appraisal/' + id,
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

