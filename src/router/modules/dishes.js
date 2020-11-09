import Layout from '@/layout/index'

const dishesRouter = {
  path: '/dishes',
  component: Layout,
  redirect: '/dishes/list',
  name: '菜式',
  meta: { title: '菜式模块', icon: 'menu' },
  alwaysShow: true,
  children: [
    {
      path: 'list',
      component: () => import('@/views/dishes/list'),
      meta: { title: '菜式列表', icon: 'menu' }
    },
    {
      path: 'add',
      component: () => import('@/views/dishes/edit'),
      meta: { title: '新增菜式', icon: 'add' },
      hidden: true
    },
    {
      path: 'edit/:id',
      component: () => import('@/views/dishes/edit'),
      meta: { title: '编辑菜式' },
      hidden: true
    }
  ]
}
export default dishesRouter
