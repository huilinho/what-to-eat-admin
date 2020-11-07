import Layout from '@/layout/index'

const adminRouter = {
  path: '/admin',
  component: Layout,
  redirect: '/admin/list',
  name: '管理员',
  meta: { title: '管理员模块', icon: 'form' },
  alwaysShow: true,
  children: [
    {
      path: 'list',
      component: () => import('@/views/admin/list'),
      meta: { title: '管理员列表', icon: 'form' }
    },
    {
      path: 'add',
      component: () => import('@/views/admin/edit'),
      meta: { title: '新增管理员', icon: 'add' },
      hidden: true
    },
    {
      path: 'edit/:id',
      component: () => import('@/views/admin/edit'),
      meta: { title: '编辑管理员' },
      hidden: true
    }
  ]
}
export default adminRouter
