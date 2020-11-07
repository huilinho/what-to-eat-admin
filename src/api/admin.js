import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getAdminInfo() {
  return request({
    url: '/admin/info',
    method: 'get'
  })
}


export function getInfoById(id) {
  return request({
    url: '/admin/' + id,
    method: 'get'
  })
}
export function getList(params) {
  return request({
    url: '/admin/list',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: '/admin/',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/admin/',
    method: 'put',
    data
  })
}

export function del(id) {
  return request({
    url: '/admin/' + id,
    method: 'delete'
  })
}

