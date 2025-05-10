<script setup>
import { onMounted } from "vue"
import { useLoginStore } from "@/stores/loginStore"
import { useUserStore } from "@/stores/userStore"

const userStore = useUserStore()
const loginStore = useLoginStore()

const performerTasks = userStore.performerTasks
console.log("Performer tasks:", performerTasks)
const clientTasks = userStore.clientTasks
console.log("Client tasks:", clientTasks)

const userEmail = loginStore.username
console.log("User email:", userEmail)



const userId = 2
onMounted(async () => {
    /*await taskStore.fetchUserByEmail() */
    await userStore.fetchUserTasksbyRole(userId)
})
</script>
<template>
    <b-container class="mt-4">
        <b-row>
            <b-col md="4" class="mb-4">
                <h2>Mina uppdrag</h2>
            </b-col>
        </b-row>

        <!-- Loading and Error Handling -->
        <b-row>
            <b-col cols="12">
                <div v-if="userStore.loading">Laddar uppdrag...</div>
                <div v-else-if="userStore.error" class="text-danger">
                    Fel: {{ userStore.error }}
                </div>
            </b-col>
        </b-row>

        <!-- Performer Task List -->
        <b-row>
            <b-col md="6">
                <h4 class="mt-3">Som Utförare</h4>
                <b-list-group>
                    <template v-if="userStore.performerTasks.length">
                        <b-list-group-item v-for="task in userStore.performerTasks" :key="task.taskId">
                            <b-card class="mb-2">
                                <h5 class="mb-1">{{ task.title }}</h5>
                                <p class="mb-0">
                                    <strong>Datum: </strong>{{ task.date }}
                                </p>
                                <p class="mb-0">
                                    <strong>Status: </strong>{{ task.status }}
                                </p>
                            </b-card>
                        </b-list-group-item>
                    </template>
                    <p v-else class="text-muted ps-3">
                        Inga uppdrag som utförare
                    </p>
                </b-list-group>
            </b-col>

            <!-- Client Task List -->
            <b-col md="6">
                <h4 class="mt-3">Som Beställare</h4>
                <b-list-group>
                    <template v-if="userStore.clientTasks.length">
                        <b-list-group-item v-for="task in userStore.clientTasks" :key="task.taskId">
                            <b-card class="mb-2">
                                <h5 class="mb-1">{{ task.title }}</h5>
                                <p class="mb-0"><strong>Datum: </strong>{{ task.date }}</p>
                                <p class="mb-0"><strong>Status: </strong>{{ task.status }}</p>
                            </b-card>
                        </b-list-group-item>
                    </template>
                    <template v-else>
                        <p class="text-muted ps-3">Inga uppdrag som beställare</p>
                    </template>
                </b-list-group>
            </b-col>
        </b-row>
    </b-container>
</template>
