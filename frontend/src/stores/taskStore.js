import { defineStore } from 'pinia';
import axios from 'axios';

export const useTaskStore = defineStore('taskStore', {
  state: () => {
    return {
      tasks: [],
      task: null,
      taskDetails: [],
      newTasks: [],
      tasksInCategory: [],
      categories: [],
      oneCategory: null,
      loading: false,
      error: null,
    };
  },

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
        //console.log(this.taskDetails);
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
    
    async createUserTask(userId, taskId) {
      const userTask = {
        userRole: 'taskDoer',
        userTaskUId: userId,
        userTaskTId: Number(taskId),
      };
      console.log(userTask);
      try {
        const response = await axios.post(
          'http://localhost:3000/api/user-tasks',
          userTask
        );

        console.log('Servern svarade med:', response.data);
      } catch (error) {
        console.error('Något gick fel:', error.message);
      }
    },

    async confirmDoer(taskId, doerId) {
      const doerInput = {
        taskId: taskId,
        doerId: doerId,
      };
      try {
        const response = await axios.post(
          'http://localhost:3000/api/confirm-doer',
          doerInput
        );
        console.log('Servern svarade med:', response.data);
      } catch (error) {
        console.log(error.response.data);
      }
      await this.fetchTaskDetails(taskId);
    },

    async markAsDone(taskId) {
      const inTaskId = {
        inTaskId: Number(taskId),
      };
      console.log(inTaskId);
      try {
        const response = await axios.post(
          'http://localhost:3000/api/tasks/mark-as-done',
          inTaskId
        );
        console.log(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
      await this.fetchTaskDetails(taskId);
    },
  },
});
