import { defineStore } from "pinia"
import axios from "axios"

export const useUserStore = defineStore("userStore", {
  state: () => {
    return {
      user: null,
      tasks:{
      performer: [],
      client: [],
      },
      loading: false,
      error: null,
    }
  },

  actions: {
    /*async fetchUser(userId) {
      this.loading = true
      try {
        const res = await axios.get(`http://localhost:3000/api/users/${userId}`)
        this.user = res.data
        this.error = null
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },*/

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
        this.tasks.performer = res.data.taskDoer
        this.tasks.client = res.data.taskCreator
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
        console.log("fetchUserByEmail response:",res.data.user)
        this.user = res.data.user
        this.error = null
      } catch (err) {
        console.error("Fel i fetchUserByEmail:", err)
      } finally {
        this.loading = false
      }
     },

    async updateUser(userData) {
      this.loading = true
      try {
        const res = await axios.put(
          `http://localhost:3000/api/users/${userData.userId}`,
          userData
        )
        this.user = {...this.user, ...userData}
        this.error = null
      }catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    /*async deleteUser(userId) {
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
    },*/
  }
})
