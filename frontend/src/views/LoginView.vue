<script setup>
import { ref, computed } from 'vue';
import { useLoginStore } from '@/stores/loginStore';
import { useRouter } from 'vue-router';
const router = useRouter();

const loginStore = useLoginStore();

const passwordValidation = computed(
  () => password.value === repeatPassword.value && password.value.length > 0
);

const userName = ref(''),
  password = ref('');
</script>

<template>
  <BContainer>
    <BRow>
      <BCol cols="6">
        <h1>Logga in / Logga ut</h1>
        <BForm id="loginForm">
          <BFormGroup id="input-group-1" label="Email:" label-for="input-1">
            <BFormInput id="input-1" type="text" class="mb-2" v-model="userName" placeholder="Email" required />
            {{ userName }}
          </BFormGroup>

          <BFormGroup id="input-group-2" label="Lösenord:" label-for="input-2">
            <BFormInput id="input-2" class="mb-2" type="password" v-model="password" placeholder="Lösenord" />
            {{ password }}
          </BFormGroup>

          <BButton @click="loginStore.login(userName, password)" class="mt-4" variant="primary">Logga in
          </BButton>
          <BButton @click="loginStore.logout()" class="mt-4" variant="danger">Logga ut
          </BButton>
        </BForm>
        <BButton @click="router.push({ path: '/register' })" class="mt-4" variant="success">Har du inget konto?
        </BButton>
      </BCol>
    </BRow>
  </BContainer>
</template>
