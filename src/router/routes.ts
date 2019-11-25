import { RouteConfig } from 'vue-router';
const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'index',
    component: () => import('pages/Index.vue')
  },
  {
    path: '/panel',
    component: () => import('layouts/MasterLayout.vue')
    // children: [{ path: '', component: () => import('pages/Login.vue') }]
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
