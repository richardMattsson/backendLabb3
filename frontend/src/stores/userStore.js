import { defineStore } from "pinia"
import axios from "axios"

export const useUserStore = defineStore("userStore", {
  state: () => {
    return {
      user: null,
      performerTasks: [],
      clientTasks: [],
      loading: false,
      error: null,
    }
  },

  actions: {
    async fetchUser(userId) {
      this.loading = true
      try {
        const res = await axios.get(`http://localhost:3000/api/users/${userId}`)
        this.user = res.data.user
        this.error = null
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    /*async fetchUserTasksRole(userId, tasksrole) {
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
    },*/

    async fetchUserTasksByRole(userId) {
      this.loading = true
      try {
        const res = await axios.get(
          `http://localhost:3000/api/users/${userId}/tasksrole`
        )
        this.performerTasks = res.data.taskDoer
        this.clientTasks = res.data.taskCreator
        this.error = null
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async updateUser(userId, userData) {
      this.loading = true
      try {
        const res = await axios.put(
          `http://localhost:3000/api/users/${userId}`,
          userData
        )
        const index = this.users.findIndex((user) => user.id === userId)
        if (index !== -1) {
          this.users[index] = res.data.user
        }
        this.error = null
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async deleteUser(userId) {
      this.loading = true
      try {
        await axios.delete(`http://localhost:3000/api/users/${userId}`)
        this.users = this.users.filter((user) => user.id !== userId)
        this.error = null
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
  },
})
