<script setup>
import { ref, computed } from 'vue';
import { useLoginStore } from '@/stores/loginStore';

const loginStore = useLoginStore();

const passwordValidation = computed(
  () => password.value === repeatPassword.value && password.value.length > 0
);

const userName = ref(''),
  password = ref(''),
  repeatPassword = ref('');
</script>

<template>
  <BContainer>
    <BRow>
      <BCol cols="6">
        <h1>Registrera dig</h1>
        <BForm id="registerForm">
          <BFormGroup id="input-group-3" label="Email:" label-for="input-3">
            <BFormInput
              id="input-3"
              type="email"
              class="mb-2"
              v-model="userName"
              placeholder="Email"
              required
            />
          </BFormGroup>

          <BFormGroup id="input-group-4" label="Lösenord:" label-for="input-4">
            <BFormInput
              id="input-4"
              class="mb-2"
              type="password"
              v-model="password"
              placeholder="Lösenord"
            />
            {{ password }}
          </BFormGroup>
          <BFormGroup
            id="input-group-5"
            label="Upprepa lösenord:"
            label-for="input-5"
          >
            <BFormInput
              id="input-5"
              class="mb-2"
              type="password"
              v-model="repeatPassword"
              placeholder="Upprepa lösenord"
              :state="passwordValidation"
            />
            {{ repeatPassword }}
            <BFormInvalidFeedback :state="passwordValidation">
              Lösenorden matchar inte.
            </BFormInvalidFeedback>
            <BFormValidFeedback :state="passwordValidation">
              Ser bra ut!
            </BFormValidFeedback>
          </BFormGroup>

          <BButton
            @click="loginStore.register(userName, password)"
            class="mt-4"
            variant="success"
            >Skapa användare</BButton
          >
        </BForm>
      </BCol>
    </BRow>
  </BContainer>
</template>
