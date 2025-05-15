<script setup>
import { ref, onMounted } from 'vue';
import { useLoginStore } from '@/stores/loginStore';
import { useUserStore } from '@/stores/userStore';
import { useTaskStore } from '@/stores/taskStore';
import { useRoute, useRouter, RouterLink } from 'vue-router';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const loginStore = useLoginStore();
const taskStore = useTaskStore();

const form = ref({});
const isEditing = ref(false);
const doers = taskStore.taskDetails.length;

onMounted(async () => {
  const userEmail = loginStore.username;
  console.log('User email:', userEmail);

  try {
    await userStore.fetchUserByEmail(userEmail);
    console.log('Hämtad användare:', userStore.user.email);

    if (userStore.user && userStore.user.userId) {
      form.value = {
        email: userEmail,
        firstName: userStore.user.firstName || '',
        lastName: userStore.user.lastName || '',
        phone: userStore.user.phone || '',
        city: userStore.user.city || '',
      };

      const userId = userStore.user.userId;
      console.log('User ID:', userId);

      if (userId) {
        //Hämtar uppdrag för "taskDoer"
        await userStore.fetchUserTasksByRole(userId, 'taskDoer');
        console.log('Hämtade uppdrag för taskDoer:', userStore.tasks.performer);

        //Hämtar uppdrag för "taskCreator"
        await userStore.fetchUserTasksByRole(userId, 'taskCreator');
        console.log('Hämtade uppdrag för taskCreator:', userStore.tasks.client);
      } else {
        console.error('Kunde inte hitta userId för att hämta tasks');
      }
    } else {
      console.error('Kunde inte hitta användardata');
    }
  } catch (error) {
    console.error('Fel vid hämtning av användardata eller tasks', error);
  }
});

const saveChanges = async () => {
  try {
    if (!userStore.user?.userId) {
      console.error('Kan inte uppdatera användardata, userId saknas');
      return;
    }

    const updatedData = {
      userId: userStore.user.userId,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      phone: form.value.phone.length > 0 ? form.value.phone : null,
      city: form.value.city,
    };
    await userStore.updateUser(updatedData);
    isEditing.value = false;
  } catch (error) {
    console.error(
      'Ett fel inträffade vid uppdatering av profildata:',
      error.message
    );
  }
};

const enableEdit = () => {
  isEditing.value = true;
};
</script>
<template>
  <b-container class="mt-8">
    <b-row class="mb-4" style="justify-content: center">
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
              })
            "
            class="mt-4"
            variant="success"
            v-if="!loginStore.isLoggedIn"
            >Logga in</BButton
          ></b-col
        >
        <b-form @submit.prevent="saveChanges" v-if="loginStore.isLoggedIn">
          <!--E-mail ska inte kunna ändras, då den är kopplad till inloggning -->
          <b-row class="mb-2">
            <b-form-group label="E-post" label-for="email">
              <b-form-input v-model="form.email" disabled></b-form-input>
            </b-form-group>
          </b-row>
          <b-row class="mb-2">
            <b-col cols="6">
              <b-form-group label="Förnamn" label-for="firstName">
                <b-form-input
                  v-model="form.firstName"
                  :disabled="!isEditing"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group label="Efternamn" label-for="lastName">
                <b-form-input
                  v-model="form.lastName"
                  :disabled="!isEditing"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mb-4">
            <b-col cols="6">
              <b-form-group label="Telefonnummer" label-for="phone">
                <b-form-input
                  v-model="form.phone"
                  :disabled="!isEditing"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group label="Stad" label-for="city">
                <b-form-input
                  v-model="form.city"
                  :disabled="!isEditing"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-button @click="userStore.deleteUser" variant="danger" disabled
                >Ta bort</b-button
              >
            </b-col>
            <b-col class="text-end">
              <b-button v-if="!isEditing" variant="primary" @click="enableEdit"
                >Redigera</b-button
              >
              <b-button v-else type="submit" variant="success"
                >Spara ändringar</b-button
              >
            </b-col>
          </b-row>
        </b-form>
      </b-col>
    </b-row>

    <b-row class="g-4">
      <!-- Performer Task List -->
      <b-col cols="6" class="border-end pe-4">
        <h4 class="mb-3">Uppdrag att genomföra</h4>
        <div v-if="userStore.tasks.performer.length && loginStore.isLoggedIn">
          <b-card
            v-for="task in userStore.tasks.performer"
            :key="task.taskId"
            class="mb-3 px-2 py-2 border-3 accessible-card"
            :class="{
              'border-success': task.status === 'Färdig',
              'border-warning': task.status === 'Pågående',
              'border-secondary': task.status === 'New',
            }"
          >
            <h5 class="mb-3">{{ task.title }}</h5>
            <p class="mb-1">
              <strong>Roll: </strong
              >{{ task.userrole === 'taskDoer' ? 'Utförare' : '' }}
            </p>
            <p class="mb-1" v-if="task.date">
              <strong>Bokat datum: </strong>{{ task.date.split('T')[0] }}
            </p>
            <p class="mb-1">
              <strong>Bekräftad: </strong>
              <span v-if="task.confirmed">
                Ja
                <i
                  class="bi bi-check-circle text-success me-1"
                  aria-hidden="true"
                  title="Bekräftad"
                ></i>
              </span>
              <span v-else>
                Nej
                <i
                  class="bi bi-x-circle text-danger me-1"
                  aria-hidden="true"
                  title="Ej bekräftad"
                ></i>
              </span>
            </p>
            <p class="mb-2">
              <strong
                >Status:
                <span
                  :class="{
                    'text-success': task.status === 'Färdig',
                    'text-warning': task.status === 'Pågående',
                    'text-secondary': task.status === 'New',
                  }"
                  >{{ task.status }}
                </span></strong
              >
            </p>
            <div class="text-end">
              <RouterLink
                :to="{
                  path: `/tasks/${task.taskId}`,
                  query: { endpoint: route.fullPath },
                }"
                class="btn btn-primary"
                >Visa Uppdrag</RouterLink
              >
            </div>
          </b-card>
        </div>
        <p v-else class="text-muted ps-3">Inga uppdrag</p>
      </b-col>

      <!-- Client Task List -->
      <b-col cols="6" class="ps-4">
        <h4 class="mb-3">Beställda uppdrag</h4>
        <div v-if="userStore.tasks.client.length && loginStore.isLoggedIn">
          <b-card
            v-for="task in userStore.tasks.client"
            :key="task.taskId"
            class="mb-3 px-2 py-2 border-3 accessible-card"
            :class="{
              'border-success': task.status === 'Färdig',
              'border-warning': task.status === 'Pågående',
              'border-secondary': task.status === 'New',
            }"
          >
            <h5 class="mb-3">{{ task.title }}</h5>
            <p class="mb-1">
              <strong>Roll: </strong
              >{{ task.userrole === 'taskCreator' ? 'Beställare' : '' }}
            </p>
            <p class="mb-1" v-if="task.date">
              <strong>Bokat datum: </strong>{{ task.date.split('T')[0] }}
            </p>
            <p class="mb-2">
              <strong
                >Status:
                <span
                  :class="{
                    'text-success': task.status === 'Färdig',
                    'text-warning': task.status === 'Pågående',
                    'text-secondary': task.status === 'New',
                  }"
                  >{{ task.status }}</span
                ></strong
              >
            </p>
            <div class="text-end">
              <RouterLink
                :to="{
                  path: `/tasks/${task.taskId}`,
                  query: { endpoint: route.fullPath },
                }"
                class="btn btn-primary"
                >Visa Uppdrag</RouterLink
              >
            </div>
          </b-card>
        </div>
        <template v-else>
          <p class="text-muted ps-3">Du har inga beställda uppdrag</p>
        </template>
      </b-col>
    </b-row>
  </b-container>
</template>

<style scoped>
.accessible-card {
  font-size: 1rem; /* 16px */
  line-height: 1.4;
}

.accessible-card h5 {
  font-size: 1.125rem; /* 18px – bra rubrikstorlek */
}

.accessible-card p {
  margin-bottom: 0.5rem;
}

.accessible-card .btn {
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
}
</style>
