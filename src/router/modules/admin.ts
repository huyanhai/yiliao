import Layout from '@/layouts';
import DashboardIcon from '@/assets/assets-slide-dashboard.svg';

export default [
  {
    path: '/workspace',
    component: Layout,
    name: 'workspace',
    redirect: '/workspace/base',
    meta: { title: '工作站管理', icon: DashboardIcon, single: true },
    children: [
      {
        path: 'base',
        name: 'WorkspaceAdmin',
        component: () => import('@/pages/workspace/Index.vue'),
        meta: { title: '工作站管理' },
      },
      {
        path: 'details',
        name: 'WorkspaceDetails',
        component: () => import('@/pages/workspace/Details.vue'),
        meta: { title: '工作站详情' },
      },
    ],
  },
  {
    path: '/server',
    component: Layout,
    name: 'server',
    redirect: '/server/section',
    meta: { title: '医疗服务', icon: DashboardIcon },
    children: [
      {
        path: 'section',
        name: 'SectionAdmin',
        component: () => import('@/pages/server/Index.vue'),
        meta: { title: '科室管理' },
      },
      {
        path: 'doctors',
        name: 'DoctorsAdmin',
        component: () => import('@/pages/server/Doctors.vue'),
        meta: { title: '医生管理' },
      },
      {
        path: 'beds',
        name: 'BedsAdmin',
        component: () => import('@/pages/server/Bed.vue'),
        meta: { title: '床位管理' },
      },
    ],
  },
  {
    path: '/patient',
    component: Layout,
    name: 'patient',
    redirect: '/patient/base',
    meta: { title: '患者管理', icon: DashboardIcon, single: true },
    children: [
      {
        path: 'base',
        name: 'PatientBase',
        component: () => import('@/pages/patient/Index.vue'),
        meta: { title: '患者管理' },
      },
    ],
  },
  {
    path: '/device',
    component: Layout,
    name: 'device',
    redirect: '/device/base',
    meta: { title: '设备管理', icon: DashboardIcon, single: true },
    children: [
      {
        path: 'base',
        name: 'DeviceBase',
        component: () => import('@/pages/device/Index.vue'),
        meta: { title: '设备管理' },
      },
    ],
  },
  {
    path: '/report',
    component: Layout,
    name: 'report',
    redirect: '/report/base',
    meta: { title: '报告管理', icon: DashboardIcon, single: true },
    children: [
      {
        path: 'base',
        name: 'ReportBase',
        component: () => import('@/pages/report/Index.vue'),
        meta: { title: '报告管理' },
      },
    ],
  },
  {
    path: '/system',
    component: Layout,
    name: 'system',
    redirect: '/system/account',
    meta: { title: '系统设置', icon: DashboardIcon },
    children: [
      {
        path: 'account',
        name: 'AccountAdmin',
        component: () => import('@/pages/system/Index.vue'),
        meta: { title: '账号管理' },
      },
      {
        path: 'role',
        name: 'RoleAdmin',
        component: () => import('@/pages/system/Role.vue'),
        meta: { title: '角色管理' },
      },
      {
        path: 'menu',
        name: 'MenuAdmin',
        component: () => import('@/pages/system/Menu.vue'),
        meta: { title: '菜单管理' },
      },
      {
        path: 'logs',
        name: 'LogsAdmin',
        component: () => import('@/pages/system/Logs.vue'),
        meta: { title: '日志管理' },
      },
      {
        path: 'upgrade',
        name: 'UpgradeAdmin',
        component: () => import('@/pages/system/Upgrade.vue'),
        meta: { title: '升级管理' },
      },
    ],
  },
];
