import Layout from '@/layout/index'

const secondCanteenRouter = {
  path: '/secondCanteen',
  component: Layout,
  redirect: 'noRedirect',
  name: '饭堂',
  meta: { title: '二饭', icon: 'canteen' },
  alwaysShow: true,
  children: [
    {
      path: 'list',
      component: () => import('@/views/second/secondList'),
      meta: { title: '二饭窗口管理', icon: 'canteen' }
    },
    {
      path: 'add',
      component: () => import('@/views/second/secondEdit'),
      meta: { title: '新增窗口', icon: 'add' },
      hidden: true
    },
    {
      path: 'edit/:id',
      component: () => import('@/views/second/secondEdit'),
      meta: { title: '编辑窗口' },
      hidden: true
    }
  ]
}
export default secondCanteenRouter
