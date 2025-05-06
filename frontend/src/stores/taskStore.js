import { defineStore } from 'pinia';
import axios from 'axios';

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
    task: null,
    taskDetails: [],
    newTasks: [],
    tasksInCategory: [],
    categories: [],
    oneCategory: null,
    users: [],
    performerTasks: [],
    clientTasks: [],
    loading: false,
    error: null,
    token: localStorage.getItem('token') || null,
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    username: '',
  }),

  actions: {
    async fetchAllTasks() {
      this.loading = true;
      try {
        const res = await axios.get('http://localhost:3000/api/tasks');
        this.tasks = res.data.tasks;
        this.error = null;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchLatestTasks() {
      this.loading = true;
      try {
        const res = await axios.get('http://localhost:3000/api/newtasks');
        this.tasks = res.data.newTasks;
        this.error = null;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchTask(taskId) {
      this.loading = true;
      try {
        const res = await axios.get(
          `http://localhost:3000/api/tasks/${taskId}`
        );
        this.task = res.data.task;
        this.error = null;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchTaskDetails(taskId) {
      this.loading = true;
      try {
        const res = await axios.get(
          `http://localhost:3000/api/tasks/details/${taskId}`
        );
        this.taskDetails = res.data.taskDetails;
        this.error = null;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchTasksInCategory(categoryId) {
      this.loading = true;
      try {
        const res = await axios.get(
          `http://localhost:3000/api/tasks/by-category/${categoryId}`
        );
        this.tasksInCategory = res.data.tasksInCategory;
        this.error = null;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchCategories() {
      try {
        const res = await axios.get('http://localhost:3000/api/categories');
        this.categories = res.data.categories;
        //console.log(res.data);
      } catch (err) {
        this.error = err.message;
      }
    },
    async fetchOneCategory(categoryId) {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/categories/${categoryId}`
        );
        this.oneCategory = res.data.category;
        //console.log(res.data.category);
      } catch (err) {
        this.error = err.message;
      }
    },

    async fetchUser(userId) {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/users/${userId}`
        );
        this.users = res.data;
      } catch (err) {
        this.error = err.message;
      }
    },

    async fetchUserTasksRole(userId, tasksrole) {
      this.loading = true;
      try {
        const res = await axios.get(
          `http://localhost:3000/api/users/${userId}/${tasksrole}`
        );
        this.userTasksRole = res.data.userTasksRole;
        this.error = null;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async login(username, password) {
      const loginBody = {
        username: username,
        password: password,
      };
      try {
        const response = await axios.post(
          'http://localhost:3000/api/auth/login',
          loginBody
        );
        console.log('Svar från servern:', response.data);
        this.token = response.data.token;
        console.log(this.token);
        this.isLoggedIn = true;
        this.username = response.data.username;
        localStorage.setItem('token', this.token);
        localStorage.setItem('isLoggedIn', this.isLoggedIn);
      } catch (error) {
        console.error('Något gick fel: ', error);
      }
    },
    logout() {
      this.username = null;
      this.token = null;
      this.isLoggedIn = false;
      localStorage.removeItem('token');
    },
    async register(
      username,
      password,
      firstName,
      lastName,
      phone,
      email,
      city
    ) {
      const registerBody = {
        username: username,
        password: password,
      };
      try {
        const response = await axios.post(
          'http://localhost:3000/api/auth/register',
          registerBody
        );
        console.log('Svar från servern:', response.data);
        this.createNewUser(firstName, lastName, phone, email, city);
      } catch (error) {
        console.error('Något gick fel: ', error);
      }
    },
    async createNewUser(firstName, lastName, phone, email, city) {
      const inputBody = {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        city: city,
      };
      console.log(inputBody);
      try {
        const response = await axios.post(
          'http://localhost:3000/api/users',
          inputBody
        );
        console.log('Svar från servern:', response.data);
      } catch (error) {
        console.error('Något gick fel: ', error);
      }
    },
  },
});
