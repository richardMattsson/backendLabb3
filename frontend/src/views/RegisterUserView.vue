<script setup>
import { ref, computed } from 'vue';
import { useLoginStore } from '@/stores/loginStore';
import { useRoute, useRouter } from 'vue-router';
import { BAlert } from 'bootstrap-vue-next';

const loginStore = useLoginStore();
const router = useRouter();
const route = useRoute();

const passwordValidation = computed(
  () => password.value === repeatPassword.value && password.value.length > 0
);

const firstName = ref(''),
  userName = ref(''),
  password = ref(''),
  repeatPassword = ref(''),
  showAlert = ref(false);

const handleSignUp = () => {
  console.log('Redirect to:', route.query.endpoint);
  loginStore.register(userName.value, password.value, firstName.value);
  const redirectTo = route.query.endpoint || '/';
  router.push(redirectTo);
};
</script>

<template>
  <BContainer>
    <BRow style="justify-content: center">
      <BCol lg="6">
        <h1>Registrera dig</h1>

        <BForm id="registerForm">
          <BFormGroup id="input-group-2" label="Förnamn:" label-for="input-2">
            <BFormInput
              id="input-2"
              type="text"
              class="mb-2"
              v-model="firstName"
              placeholder="Förnamn"
              required
            />
          </BFormGroup>
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

            <BFormInvalidFeedback :state="passwordValidation">
              Lösenorden matchar inte.
            </BFormInvalidFeedback>
            <BFormValidFeedback :state="passwordValidation">
              Ser bra ut!
            </BFormValidFeedback>
          </BFormGroup>

          <BButton @click="handleSignUp" class="mt-4" variant="success"
            >Skapa användare
          </BButton>
        </BForm>
      </BCol>
    </BRow>
  </BContainer>
</template>
