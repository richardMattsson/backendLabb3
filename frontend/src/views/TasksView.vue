<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useTaskStore } from '@/stores/taskStore';

const taskStore = useTaskStore()

onMounted(async () => {
  await taskStore.fetchAllTasks()
  console.log('Tasks fetched:', taskStore.tasks)
})

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
  <article>
    <BContainer id="tasks-container">
      <BRow align-h="center">
        <BCol>
          <h1 style="text-align: center">Tjänster</h1>
          <BCard v-for="task in taskStore.tasks" no-body class="overflow-hidden mt-4 mb-2"
            style="max-width: 540px; cursor: pointer">
            <BRow class="g-0">
              <!-- <BCol md="4">
                <BCardImg alt="Image" class="rounded-0" />
              </BCol> -->
              <BCol md="8">
                <BCardBody :title="task.title">
                  <BCardText>
                    {{ task.description }}
                  </BCardText>
                </BCardBody>
              </BCol>
            </BRow>
          </BCard>
        </BCol>
        <BCol>
          <BContainer>
            <BRow>
              <h1 style="text-align: center">Kategorier</h1>
              <BCol class="mt-4 mb-2" cols="6" lg="4" v-for="category in categories">
                <BCard overlay :title="category.categoryName" :img-src="category.categoryImage" img-alt="Image"
                  tag="figure" style="max-width: 20rem; cursor: pointer">
                </BCard>
              </BCol>
            </BRow>
          </BContainer>
        </BCol>
      </BRow>
    </BContainer>
  </article>
</template>

<style scoped>
article {
  width: 100vw;
}

#tasks-container {
  width: 100vw;
}
</style>
