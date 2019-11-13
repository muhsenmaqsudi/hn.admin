import { RouteConfig } from 'vue-router'
const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [{ path: '', component: () => import('pages/Index.vue') }]
  },
  {
    path: '/login',
    component: () => import('layouts/Login.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('layouts/User.vue'),
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: () => import('pages/Profile.vue')
      },
      {
        path: 'posts',
        name: 'posts',
        component: () => import('pages/Posts.vue')
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  });
}

export default routes;
