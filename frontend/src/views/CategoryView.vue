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
  <h1>Kategorier</h1>
  <!-- <ul>
    <li v-for="category in categories">{{ category.categoryName }}</li>
  </ul> -->
  <BContainer>
    <BRow>
      <BCol class="mt-4 mb-2" cols="6" sm="4" v-for="category in categories">
        <BCard
          overlay
          :title="category.categoryName"
          :img-src="category.categoryImage"
          img-alt="Image"
          tag="article"
          style="max-width: 20rem"
        >
          <!-- no-body tag="section" class="categoryCard" -->

          <!-- <BCardImg
            :src="category.categoryImage"
            alt="Image"
            top
            class="categoryCardImage"
          /> -->
          <!-- <BCardBody>
            <BCardTitle>{{ category.categoryName }}</BCardTitle> -->
          <!-- <BCardSubtitle class="mb-2">Card Sub Title</BCardSubtitle> -->
          <!-- <BCardText>
              {{ recept.recept_beskrivning }}
            </BCardText>
            <BContainer>
              <BRow>
                <BCol> {{ recept.recept_tid_minuter }} min </BCol>
                <BCol>{{ recept.recept_kategori }} </BCol>
              </BRow>
            </BContainer> -->
          <!-- </BCardBody> -->
          <!-- <BCardText>
            {{ recept.recept_beskrivning }}
          </BCardText> -->
        </BCard>
      </BCol>
    </BRow>
  </BContainer>
</template>

<style scoped>
.categoryCard {
  height: 150px;
  background-color: grey;
  color: white;
}
.categoryCardImage {
  max-width: 100%;
}
</style>
