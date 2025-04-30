<script setup>
import { ref } from 'vue';

const categories = ref(null);

async function getCategories() {
  const url = 'http://localhost:3000/api/categories';
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    categories.value = result.categories;
  } catch (error) {
    console.error(error.message);
  }
}
getCategories();
</script>
<template>
  <h1 style="text-align: center">Kategorier</h1>

  <BContainer>
    <BRow>
      <BCol class="mt-4 mb-2" cols="6" md="4" v-for="category in categories">
        <BCard
          overlay
          :title="category.categoryName"
          :img-src="category.categoryImage"
          img-alt="Image"
          tag="article"
          style="max-width: 20rem"
        >
        </BCard>
      </BCol>
    </BRow>
  </BContainer>
</template>

<style scoped></style>
