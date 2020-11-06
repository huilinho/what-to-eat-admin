import Layout from '@/layout/index'

const userRouter = {
  path: '/user',
  component: Layout,
  redirect: '/user/list',
  name: '用户管理',
  meta: { title: '用户管理', icon: 'form' },
  alwaysShow: true,
    children: [
  {
    path: 'list',
    component: () => import('@/views/user/list'),
    meta: { title: '用户列表', icon: 'form' }
  },
  {
    path: 'add',
    component: () => import('@/views/user/edit'),
    meta: { title: '新增用户', icon: 'add' },
    hidden: true
  },
  {
    path: 'edit/:id',
    component: () => import('@/views/user/edit'),
    meta: { title: '编辑用户' },
    hidden: true
  }
]
}
export default userRouter
