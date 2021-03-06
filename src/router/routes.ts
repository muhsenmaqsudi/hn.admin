import { RouteConfig } from 'vue-router';
import { getModule } from 'vuex-module-decorators';
import AuthStore from '../store/modules/AuthStore';

const store = getModule(AuthStore);

// @ts-ignore
const ifNotAuthenticated = (to, from, next) => {
  if (!store.isAuthenticated) {
    next();
    return;
  }
  next('/panel');
};

// @ts-ignore
const ifAuthenticated = (to, from, next) => {
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
    beforeEnter: ifAuthenticated,
    children: [
      {
        path: 'users',
        name: 'users-index',
        component: () => import('pages/users/UsersIndex.vue')
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
