<script setup>
import { ref } from 'vue';

const tests = ref(null);
fetch('http://localhost:3000/api/test')
  .then((response) => response.json())
  .then((result) => (tests.value = result.test));
</script>

<template>
  <h1 v-for="test in tests">{{ test.name }}</h1>
</template>
