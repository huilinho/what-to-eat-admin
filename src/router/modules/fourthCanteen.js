import Layout from '@/layout/index'

const fourthCanteenRouter = {
  path: '/fourthCanteen',
  component: Layout,
  redirect: 'noRedirect',
  name: '第四饭堂',
  meta: { title: '四饭', icon: 'canteen' },
  alwaysShow: true,
  children: [
    {
      path: 'list',
      component: () => import('@/views/fourth/fourthList'),
      meta: { title: '四饭窗口管理', icon: 'canteen' }
    },
    {
      path: 'add',
      component: () => import('@/views/fourth/fourthEdit'),
      meta: { title: '新增窗口', icon: 'add' },
      hidden: true
    },
    {
      path: 'edit/:id',
      component: () => import('@/views/fourth/fourthEdit'),
      meta: { title: '编辑窗口' },
      hidden: true
    }
  ]
}
export default fourthCanteenRouter
