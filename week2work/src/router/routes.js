import DefaultLayout from '@/views/layout/default';

export default [
  {
    path: '',
    component: DefaultLayout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/page/index'),
        meta: { title: '首页', icon: 's-home' }
      },
      {
        path: 'curd',
        name: 'curd',
        component: () => import('@/views/curd/index'),
        meta: { title: '增删改查', icon: 's-opportunity' }
      }
    ],
  },
]
