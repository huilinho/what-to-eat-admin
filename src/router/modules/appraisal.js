import Layout from '@/layout/index'

const appraisalRouter = {
  path: '/appraisal',
  component: Layout,
  redirect: '/appraisal/list',
  name: '评价管理',
  meta: { title: '评价模块', icon: 'form' },
  alwaysShow: true,
  children: [
    {
      path: 'list',
      component: () => import('@/views/appraisal/list'),
      meta: { title: '评价记录列表', icon: 'form' }
    }
  ]
}
export default appraisalRouter
