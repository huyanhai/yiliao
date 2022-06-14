import Layout from '@/layouts';
import DashboardIcon from '@/assets/assets-slide-dashboard.svg';

export default [
  {
    path: '/workspace',
    component: Layout,
    name: 'workspace',
    redirect: '/workspace/index',
    meta: { title: '工作站管理', icon: DashboardIcon },
    children: [
      {
        path: 'index',
        name: '工作站管理',
        component: () => import('@/pages/admin/workspace/Index.vue'),
        meta: { title: '工作站管理', hidden: true },
      },
      {
        path: 'details/:id',
        name: '工作站详情',
        component: () => import('@/pages/admin/workspace/Details.vue'),
        meta: { title: '工作站详情', hidden: true },
      },
    ],
  },
];
