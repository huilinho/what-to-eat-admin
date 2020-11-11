import Layout from '@/layout/index'

const firstCanteenRouter = {
  path: '/firstCanteen',
  component: Layout,
  redirect: 'noRedirect',
  name: '饭堂',
  meta: { title: '一饭', icon: 'canteen' },
  alwaysShow: true,
  children: [
    {
      path: 'list',
      component: () => import('@/views/first/firstList'),
      meta: { title: '一饭窗口管理', icon: 'canteen' }
    },
    {
      path: 'add',
      component: () => import('@/views/first/firstEdit'),
      meta: { title: '新增窗口', icon: 'add' },
      hidden: true
    },
    {
      path: 'edit/:id',
      component: () => import('@/views/first/firstEdit'),
      meta: { title: '编辑窗口' },
      hidden: true
    }
  ]
}
export default firstCanteenRouter
