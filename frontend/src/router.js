import { createRouter, createWebHashHistory } from 'vue-router';

import HomeView from './views/HomeView.vue';
import CreateTaskView from './views/CreateTaskView.vue';
import TasksView from './views/TasksView.vue';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      component: TasksView,
      path: '/tasks',
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
