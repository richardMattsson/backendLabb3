<script setup>
import { onMounted } from "vue"
import { useTaskStore } from "@/stores/taskStore"

const taskStore = useTaskStore()
const userId = 2

onMounted(async () => {
    await taskStore.fetchUserTasksbyRole(userId)
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
                <div v-if="taskStore.loading">Laddar uppdrag...</div>
                <div v-else-if="taskStore.error" class="text-danger">
                    Fel: {{ taskStore.error }}
                </div>
            </b-col>
        </b-row>

        <!-- Performer Task List -->
        <b-row>
            <b-col md="6">
                <h4 class="mt-3">Som Utförare</h4>
                <b-list-group>
                    <template v-if="taskStore.performerTasks.length">
                        <b-list-group-item v-for="task in taskStore.performerTasks" :key="task.taskId">
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
                    <template v-if="taskStore.clientTasks.length">
                        <b-list-group-item v-for="task in taskStore.clientTasks" :key="task.taskId">
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
