<script setup>
import { onMounted } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import { useRoute, useRouter } from 'vue-router';
import TaskList from '@/components/TaskList.vue';

const taskStore = useTaskStore();
const route = useRoute();
const router = useRouter();
// console.log('categoryId: ', route.params.categoryId); // Skriver ut inkommande categoryId

onMounted(async () => {
  //   await taskStore.fetchTasksInCategory(route.params.categoryId);
  //   //console.log('Tasks fetched:', taskStore.tasksInCategory);
  await taskStore.fetchOneCategory(route.params.categoryId);
  //console.log('Category fetched:', taskStore.oneCategory);
});
</script>

<template>
    <i @click="router.push({ path: '/tasks' })" class="pi pi-arrow-left" style="
      font-size: 1.2rem;
      font-weight: 500;
      margin-top: 0.8em;
      padding-left: 2em;
      cursor: pointer;
    "><span style="
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        cursor: pointer;
      ">
      Till tjänster</span></i>
  <BContainer class="mb-4 mt-4" v-if="taskStore.oneCategory">
    <BRow>
      <BCol class="d-flex justify-content-center align-items-center">
        <h1>
          {{ taskStore.oneCategory[0].categoryName }}
        </h1>
      </BCol>
      <BCol class="d-flex justify-content-center align-items-center">
        <img
          :src="taskStore.oneCategory[0].categoryImage"
          alt=""
          style="max-width: 50%"
        />
      </BCol>
    </BRow>
  </BContainer>
  <BContainer style="max-width: 70%">
    <TaskList />
  </BContainer>
</template>

<style scoped></style>
