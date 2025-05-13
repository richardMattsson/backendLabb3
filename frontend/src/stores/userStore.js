import { defineStore } from "pinia"
import axios from "axios"

export const useUserStore = defineStore("userStore", {
  state: () => {
    return {
      user: null,
      tasks:{
      performer: [
        /*{ taskId: 1, title: "Task 1", date: "2025-05-01", status: "Pending" },
        { taskId: 2, title: "Task 2", date: "2025-05-02", status: "Completed" }*/
       ],
      client: [
        /*{ taskId: 3, title: "Task 3", date: "2025-05-03", status: "In Progress" }*/
      ]
      },
      allUsers: [],
      loading: false,
      error: null,
    }
  },

  actions: {

    async fetchUsers() {
      try {
        const res = await axios.get(`http://localhost:3000/api/users`);
        this.allUsers = res.data.users;
      } catch (err) {
        this.error = err.message;
      }
    },

    async fetchUserTasksByRole(userId, role) {
      this.loading = true
      try {
        const res = await axios.get(`http://localhost:3000/api/users/${userId}/${role}`)
        if (role === "taskDoer") {
          this.tasks.performer = res.data.userTasksRole
        }
        else if (role === "taskCreator") {
          this.tasks.client = res.data.userTasksRole
        }
        this.error = null
      } catch (err) {
        this.error = err.message
        console.error("Fel vid hämtning av uppdrag:", err)
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

    async updateUser(updatedData) {
      this.loading = true
      try {
        const res = await axios.put(
          `http://localhost:3000/api/users/${updatedData.userId}`, updatedData)
          if (res.data.success) {
            this.user = {...this.user, ...updatedData}
            this.error = null
          } else {
            this.error = res.data.message
          }
      }catch (error) {
        this.error = error.message
        console.error("Fel vid uppdatering av användare:", error)
      } finally {
        this.loading = false
      }
    },
  }
})
