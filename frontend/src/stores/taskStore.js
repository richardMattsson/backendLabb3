import { defineStore } from 'pinia'
import axios from 'axios'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
    taskDetails: [],
    tasksInCategory: [],
    categories: [],
    users: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchAllTasks() {
      this.loading = true
      try {
        const res = await axios.get('http://localhost:3000/api/tasks')
        this.tasks = res.data.tasks
        this.error = null
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async fetchTask(taskId) {
        this.loading = true
        try {
          const res = await axios.get(`http://localhost:3000/api/tasks/${taskId}`)
          this.taskDetails = res.data
          this.error = null
        } catch (err) {
          this.error = err.message
        } finally {
          this.loading = false
        }
      },

    async fetchTaskDetails(taskId) {
      this.loading = true
      try {
        const res = await axios.get(`http://localhost:3000/api/tasks/details/${taskId}`)
        this.taskDetails = res.data
        this.error = null
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async fetchTasksInCategory(categoryId) {
      this.loading = true
      try {
        const res = await axios.get(`http://localhost:3000/api/tasks/by-category/${categoryId}`)
        this.tasksInCategory = res.data
        this.error = null
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async fetchCategories() {
      try {
        const res = await axios.get('http://localhost:3000/api/categories')
        this.categories = res.data
      } catch (err) {
        this.error = err.message
      }
    },

    async fetchUser(userId) {
      try {
        const res = await axios.get(`http://localhost:3000/api/users/${userId}`)
        this.users = res.data
      } catch (err) {
        this.error = err.message
      }
    },
  }
})
