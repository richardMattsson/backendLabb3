import { createRouter, createWebHashHistory } from 'vue-router';

import HomeView from './views/HomeView.vue';
import CreateTaskView from './views/CreateTaskView.vue';
import TasksView from './views/TasksView.vue';
import TasksInCategoryView from './views/TasksInCategoryView.vue';
import ProfileView from './views/ProfileView.vue';
import TaskView from './views/TaskView.vue';
import LoginView from './views/LoginView.vue';
import RegisterUserView from './views/RegisterUserView.vue';
import EditTaskView from './views/EditTaskView.vue';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      component: TasksView,
      path: '/tasks',
    },
    {
      component: TaskView,
      path: '/tasks/:taskId',
      name: 'TaskView',
    },
    {
      component: HomeView,
      path: '/',
    },
    {
      component: ProfileView,
      path: '/profile',
    },
    {
      component: CreateTaskView,
      path: '/createtask',
      name: 'CreateTask',
    },
    {
      component: TasksInCategoryView,
      path: '/tasks-in-category/:categoryId',
      name: 'TasksInCategory',
    },
    {
      component: LoginView,
      path: '/login',
    },
    {
      component: RegisterUserView,
      path: '/register',
    },
    {
      component: EditTaskView,
      path: '/edit-task/:id',
      name: 'EditTask'
    }
  ],
});
