<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
console.log('categoryId: ', route.params.categoryId); // Skriver ut inkommande categoryId
</script>

<template>
  <h1>Tasks in Category View</h1>
</template>
