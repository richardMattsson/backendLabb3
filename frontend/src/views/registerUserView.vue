<script setup>
import { ref, computed } from 'vue';
import { useTaskStore } from '@/stores/taskStore';

const taskStore = useTaskStore();

const passwordValidation = computed(
  () => password.value === repeatPassword.value && password.value.length > 0
);

const userName = ref(''),
  password = ref(''),
  repeatPassword = ref(''),
  firstName = ref(''),
  lastName = ref(''),
  phone = ref(''),
  email = ref(''),
  city = ref('');
</script>

<template>
  <h1>Registrera ny användare</h1>
  <BContainer>
    <BRow>
      <BCol cols="6">
        <BForm id="registerForm">
          <BFormGroup
            id="input-group-3"
            label="Användarnamn:"
            label-for="input-3"
          >
            <BFormInput
              id="input-3"
              type="text"
              class="mb-2"
              v-model="userName"
              placeholder="Användarnamn"
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

          <BFormGroup id="input-group-6" label="Förnamn:" label-for="input-6">
            <BFormInput
              id="input-6"
              type="text"
              class="mb-2"
              v-model="firstName"
              placeholder="Förnamn"
              required
            />
          </BFormGroup>

          <BFormGroup id="input-group-7" label="Efternamn:" label-for="input-7">
            <BFormInput
              id="input-7"
              type="text"
              class="mb-2"
              v-model="lastName"
              placeholder="Efternamn"
              required
            />
          </BFormGroup>

          <BFormGroup
            id="input-group-8"
            label="Användarnamn:"
            label-for="input-8"
          >
            <BFormInput
              id="input-8"
              type="text"
              class="mb-2"
              v-model="phone"
              placeholder="Telefon"
              required
            />
          </BFormGroup>

          <BFormGroup id="input-group-9" label="Email:" label-for="input-9">
            <BFormInput
              id="input-9"
              type="text"
              class="mb-2"
              v-model="email"
              placeholder="Email"
              required
            />
          </BFormGroup>

          <BFormGroup id="input-group-10" label="Stad:" label-for="input-10">
            <BFormInput
              id="input-10"
              type="text"
              class="mb-2"
              v-model="city"
              placeholder="Stad"
              required
            />
          </BFormGroup>

          <BButton
            @click="
              taskStore.register(
                userName,
                password,
                firstName,
                lastName,
                phone,
                email,
                city
              )
            "
            class="mt-4"
            variant="success"
            >Skapa användare</BButton
          >
        </BForm>
      </BCol>
    </BRow>
  </BContainer>
</template>
