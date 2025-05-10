import { defineStore } from "pinia"
import axios from "axios"

export const useUserStore = defineStore("userStore", {
  state: () => {
    return {
      performerTasks: [],
      clientTasks: [],
      loading: false,
      error: null,
    }
  },

  actions: {
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
    async fetchUserTasksbyRole(userId) {
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
    }
  },
})
