import { createRouter, createWebHashHistory } from 'vue-router';

import CategoryView from './views/CategoryView.vue';
import HomeView from './views/HomeView.vue';
import CreateTaskView from './views/CreateTaskView.vue';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      component: CategoryView,
      path: '/categories',
    },
    {
      component: HomeView,
      path: '/',
    },
    {
      component: CreateTaskView,
      path: '/createtask',
    },
  ],
});
