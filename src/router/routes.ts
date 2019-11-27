import { RouteConfig } from 'vue-router';
import { getModule } from 'vuex-module-decorators';
import AuthStore from '../store/modules/AuthStore';

const store = getModule(AuthStore);

const ifNotAuthenticated = (to: any, from: any, next: any) => {
  if (!store.isAuthenticated) {
    next();
    return;
  }
  next('/panel');
};

const ifAuthenticated = (to: any, from: any, next: any) => {
  if (store.isAuthenticated) {
    next();
    return;
  } else {
    next('/');
  }
};

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'index',
    component: () => import('pages/Index.vue'),
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/panel',
    name: 'panel',
    component: () => import('layouts/MasterLayout.vue'),
    beforeEnter: ifAuthenticated
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
