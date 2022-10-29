import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('pages/Home.vue'),
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('src/pages/products/Product.vue'),
  },
  {
    path: '/product/:id',
    name: 'product-id',
    component: () => import(/* webpackChunkName: "principio-ativo" */'src/pages/products/Product.vue'),
  },
  {
    path: '/search-products',
    name: 'search-products',
    component: () => import('src/pages/products/Search.vue'),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/404.vue'),
  },
];

export default routes;
