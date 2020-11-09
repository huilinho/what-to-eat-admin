import Layout from '@/layout/index'

const typeRouter = {
  path: '/type',
  component: Layout,
  redirect: '/type/list',
  name: '类型',
  meta: { title: '菜式类型模块', icon: 'type' },
  alwaysShow: true,
  children: [
    {
      path: 'list',
      component: () => import('@/views/type/list'),
      meta: { title: '菜式类型列表', icon: 'type' }
    },
    {
      path: 'add',
      component: () => import('@/views/type/edit'),
      meta: { title: '新增类型', icon: 'add' },
      hidden: true
    },
    {
      path: 'edit/:id',
      component: () => import('@/views/type/edit'),
      meta: { title: '编辑类型' },
      hidden: true
    }
  ]
}
export default typeRouter
