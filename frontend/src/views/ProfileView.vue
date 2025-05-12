<script setup>
import { ref, onMounted } from "vue"
import { useLoginStore } from "@/stores/loginStore"
import { useUserStore } from "@/stores/userStore"
import { useRoute, RouterLink } from "vue-router"

const route = useRoute()
const userStore = useUserStore()
const loginStore = useLoginStore()

const form = ref({})
const isEditing = ref(false)

onMounted(async () => {
const userEmail = loginStore.username
console.log("User email:", userEmail)

try {
await userStore.fetchUserByEmail(userEmail)
console.log("Hämtad användare:", userStore.user.email)

if (userStore.user && userStore.user.userId){
    form.value = {
    email: userEmail,
    firstName: userStore.user.firstName || "",
    lastName: userStore.user.lastName || "",
    phone: userStore.user.phone || "",
    city: userStore.user.city || "",
    }

    const userId = userStore.user.userId
    console.log("User ID:", userId)

    if (userId){
        //Hämtar uppdrag för "taskDoer"
        await userStore.fetchUserTasksByRole(userId, "taskDoer")
        console.log("Hämtade uppdrag för taskDoer:", userStore.tasks.performer)

        //Hämtar uppdrag för "taskCreator"
        await userStore.fetchUserTasksByRole(userId, "taskCreator")
        console.log("Hämtade uppdrag för taskCreator:", userStore.tasks.client)
    } else {
    console.error("Kunde inte hitta userId för att hämta tasks")
    }
} else {
    console.error("Kunde inte hitta användardata")
    }
} catch (error) {
console.error("Fel vid hämtning av användardata eller tasks", error)
}
})

const saveChanges = async () => {
    try {
        if (!userStore.user?.userId) {
            console.error("Kan inte uppdatera användardata, userId saknas")
            return
        }

        const updatedData = {
            userId: userStore.user.userId,
            firstName: form.value.firstName,
            lastName: form.value.lastName,
            phone: form.value.phone,
            city: form.value.city,
        }
        await userStore.updateUser(updatedData)
        isEditing.value = false
    } catch (error) {
        console.error("Ett fel inträffade vid uppdatering av profildata:", error)
    }
}

const enableEdit = () => {
    isEditing.value = true
}

</script>
<template>
    <b-container class="mt-8">
        <b-row class="mb-4">
            <b-col md="8" class="mb-4">
                <h4>Min Profil</h4>
                 <b-col>
                    <p v-if="!loginStore.isLoggedIn">
                    Du behöver logga in för att se dina kontouppgifter och uppdrag.
                </p>
                <BButton
                @click="
                router.push({
                    path: '/login',
                    query: { endpoint: route.fullPath },
                })"
          class="mt-4"
          variant="success"
          v-if="!loginStore.isLoggedIn"
          >Logga in</BButton></b-col>
                <b-form @submit.prevent="saveChanges" v-if="loginStore.isLoggedIn">
                     <!--E-mail ska inte kunna ändras, då den är kopplad till inloggning -->
                    <b-row class="mb-2">
                        <b-form-group label="E-post" label-for="email">
                            <b-form-input v-model="form.email" disabled></b-form-input>
                        </b-form-group>
                    </b-row>
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

        <!-- Performer Task List -->
        <b-row>
            <b-col md="6">
                <h4 class="mt-3">Uppdrag att genomföra</h4>
                <b-list-group >
                    <template v-if="userStore.tasks.performer.length && loginStore.isLoggedIn">
                        <b-list-group-item v-for="task in userStore.tasks.performer" :key="task.taskId">
                            <b-card class="mb-2" :class="
                            'border-3',{
                            'border-success': task.status === 'Completed',
                            'border-warning': task.status === 'In Progress',
                            'border-secondary': task.status === 'New'
}">
                                <h5 class="mb-1">{{ task.title }}</h5>
                                <p class="mb-0"><strong>Roll: </strong>{{task.userrole === "taskDoer" ? "Utförare" : ""}}</p>
                                <p class="mb-0">
                                    <strong>Bokat datum: </strong>{{ task.date.split("T")[0] }}
                                </p>
                                <p class="mb-0">
                                    <strong>Bekräftad: </strong>{{ task.confirmed === true ? "Ja" : "Nej" }}
                                </p>
                                <p class="mb-0">
                                    <strong>Status: </strong><span :class="{'text-success' : task.status === 'Completed',
                                    'text-warning' : task.status === 'In Progress',
                                    'text-secondary' : task.status === 'New',
                                }">{{ task.status }}</span>
                                </p>
                                <b-col class="text-end"><RouterLink
                                    :to="{
                                        path: `/tasks/${task.taskId}`,
                                        query: { endpoint: route.fullPath },
                                     }"
                                     class ="btn btn-primary">Visa Uppdrag</RouterLink>
                                </b-col>
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
                    <template v-if="userStore.tasks.client.length && loginStore.isLoggedIn">
                        <b-list-group-item v-for="task in userStore.tasks.client" :key="task.taskId">
                            <b-card class="mb-2" :class="
                            'border-3',{
                            'border-success': task.status === 'Completed',
                            'border-warning': task.status === 'In Progress',
                            'border-secondary': task.status === 'New'}">
                                <h5 class="mb-1">{{ task.title }}</h5>
                                <p class="mb-0"><strong>Roll: </strong>{{task.userrole === "taskCreator" ? "Beställare" : ""}}</p>
                                <p class="mb-0"><strong>Bokat datum: </strong>{{ task.date.split("T")[0] }}</p>
                                <p class="mb-0"><strong>Status: </strong><span :class="{'text-success' : task.status === 'Completed',
                                    'text-warning' : task.status === 'In Progress',
                                    'text-secondary' : task.status === 'New',
                                }">{{ task.status }}</span></p>
                                <b-col class="text-end"><RouterLink
                                    :to="{
                                        path: `/tasks/${task.taskId}`,
                                        query: { endpoint: route.fullPath },
                                     }"
                                     class ="btn btn-primary">Visa Uppdrag</RouterLink>
                                </b-col>
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
