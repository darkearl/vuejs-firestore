
import {
  LoginPage,
  DashContainer,
  DashboardPage,
  AccountsPage,
  EventsPage,
  TagsPage,
  SettingPage,
  NotFoundPage
} from '@/containers'


const routes = [{
    path: '/login',
    component: LoginPage,
    meta: { requiresNotAuth: true }
  },
  {
    path: '/',
    component: DashContainer,
    meta: { requiresAuth: true },
    children: [{
        path: 'dashboard',
        alias: '',
        component: DashboardPage,
        name: 'Dashboard',
        meta: { description: 'Thống kê và báo cáo' }
      },
      {
        path: 'events',
        alias: '',
        component: EventsPage,
        name: 'Sự kiện',
        meta: { description: 'Quản lý sự kiện hàng ngày' }
      },
      {
        path: 'tags',
        alias: '',
        component: TagsPage,
        name: 'Danh mục',
        meta: { description: 'Quản lý các danh mục' }
      },
      {
        path: 'accounts',
        alias: '',
        component: AccountsPage,
        name: 'Tài khoản',
        meta: { description: 'Thông tin tài khoản và chuyển khoản' }
      },
      {
        path: 'setting',
        alias: '',
        component: SettingPage,
        name: 'Cài đặt',
        meta: { description: '' }
      }
    ]
  },
  {
    // not found handler
    path: '*',
    component: NotFoundPage
  }
]

export default routes