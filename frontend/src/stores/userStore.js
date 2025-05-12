import { defineStore } from "pinia"
import axios from "axios"

export const useUserStore = defineStore("userStore", {
  state: () => {
    return {
      user: null,
      allUsers: [],
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


    async fetchUsers() {
      try {
        const res = await axios.get(`http://localhost:3000/api/users`);
        this.allUsers = res.data;
      } catch (err) {
        this.error = err.message;
      }
    },

    async fetchUserTasksByRole(userId) {
      this.loading = true
      try {
        const res = await axios.get(
          `http://localhost:3000/api/users/${userId}/taskrole`
        )
        this.performerTasks = res.data.taskDoer;
        console.log('from store doer', this.performerTasks);
        this.clientTasks = res.data.taskCreator;
        console.log('from store creator', this.clientTasks);
        this.error = null
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async fetchUserByEmail(email) {
      this.loading = true
      try {
        const res = await axios.get(
          `http://localhost:3000/api/users/email/${email}`
        )
        this.user = res.data.user
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
  }
})
