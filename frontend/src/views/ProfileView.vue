<script setup>
import { ref, onMounted } from "vue"
import { useUserStore } from "@/stores/userStore"


const userStore = useUserStore()
const userId = 2
const form = ref({})

const isEditing = ref(false)

onMounted(async () => {
    await userStore.fetchUserTasksByRole(userId)
})
</script>
<template>
    <b-container class="mt-8">

        <b-row class="mb-4">
            <b-col md="8" class="mb-4">
                <h4>Min Profil</h4>
                <b-form>
                    <b-row class="mb-2">
                        <b-col cols="6"> <b-form-group label="Förnamn" label-for="firstName">
                                <b-form-input v-model="form.firstName" :disabled="!isEditing"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col cols="6"> <b-form-group label="Efternamn" label-for="lastName">
                                <b-form-input v-model="form.lastName" :disabled="!isEditing"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <!--E-mail ska inte kunna ändras, då den är kopplad till inloggning -->
                    <b-row class="mb-2">
                        <b-form-group label="E-post" label-for="email">
                            <b-form-input v-model="form.email" :disabled="!isEditing"></b-form-input>
                        </b-form-group>
                    </b-row>
                    <b-row class="mb-4">
                        <b-col cols="6">
                            <b-form-group label="Telefonnummer" label-for="phone">
                                <b-form-input v-model="form.phone" :disabled="!isEditing"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col cols="6">
                            <b-form-group label="Stad" label-for="city">
                                <b-form-input v-model="form.city" :disabled="!isEditing"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col class="text-end">
                            <b-button v-if="!isEditing" variant="primary" @click="enableEdit">Redigera</b-button>
                            <b-button v-else type="submit" variant="success">Spara ändringar</b-button>
                        </b-col>
                    </b-row>
                </b-form>
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
                <h4 class="mt-3">Uppdrag att genomföra</h4>
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
                        Inga uppdrag
                    </p>
                </b-list-group>
            </b-col>

            <!-- Client Task List -->
            <b-col md="6">
                <h4 class="mt-3">Beställda uppdrag</h4>
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
                        <p class="text-muted ps-3">Du har inga beställda uppdrag</p>
                    </template>
                </b-list-group>
            </b-col>
        </b-row>
    </b-container>
</template>
