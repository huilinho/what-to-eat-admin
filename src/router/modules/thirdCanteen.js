import Layout from '@/layout/index'

const thirdCanteenRouter = {
  path: '/thirdCanteen',
  component: Layout,
  redirect: 'noRedirect',
  name: '第三饭堂',
  meta: { title: '三饭', icon: 'canteen' },
  alwaysShow: true,
  children: [
    {
      path: 'list',
      component: () => import('@/views/third/thirdList'),
      meta: { title: '三饭窗口管理', icon: 'canteen' }
    },
    {
      path: 'add',
      component: () => import('@/views/third/thirdEdit'),
      meta: { title: '新增窗口', icon: 'add' },
      hidden: true
    },
    {
      path: 'edit/:id',
      component: () => import('@/views/third/thirdEdit'),
      meta: { title: '编辑窗口' },
      hidden: true
    }
  ]
}
export default thirdCanteenRouter
