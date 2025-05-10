<script setup>
import { ref } from 'vue';
import { useLoginStore } from '@/stores/loginStore';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

const loginStore = useLoginStore();

const userName = ref(''),
  password = ref('');

const handleLogin = (userName, password) => {
  //console.log('Redirect to:', route.query.endpoint)
  loginStore.login(userName, password);
  const redirectTo = route.query.endpoint || '/';
  router.push(redirectTo);
};
</script>

<template>
  <BContainer>
    <BRow>
      <BCol cols="6">
        <h1 v-if="!loginStore.isLoggedIn">Logga in</h1>
        <!-- <h1 v-else>Logga ut</h1> -->
        <BForm id="loginForm" v-if="!loginStore.isLoggedIn">
          <BFormGroup id="input-group-1" label="Email:" label-for="input-1">
            <BFormInput id="input-1" type="text" class="mb-2" v-model="userName" placeholder="Email" required />
            {{ userName }}
          </BFormGroup>

          <BFormGroup id="input-group-2" label="Lösenord:" label-for="input-2">
            <BFormInput id="input-2" class="mb-2" type="password" v-model="password" placeholder="Lösenord" />
            {{ password }}
          </BFormGroup>

          <BButton :disabled="!userName || !password" v-if="!loginStore.isLoggedIn"
            @click="handleLogin(userName, password)" class="mt-4" variant="primary">Logga in
          </BButton>
        </BForm>
        <!-- <BButton v-if="loginStore.isLoggedIn" @click="loginStore.logout()" class="mt-4" variant="danger">Logga ut
        </BButton> -->
        <BButton v-if="!loginStore.isLoggedIn" @click="router.push({ path: '/register' })" class="mt-4"
          variant="success">Har du inget konto?
        </BButton>
      </BCol>
    </BRow>
  </BContainer>
</template>
