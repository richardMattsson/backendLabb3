<template>
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

  <BFormGroup id="input-group-8" label="Användarnamn:" label-for="input-8">
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
</template>
