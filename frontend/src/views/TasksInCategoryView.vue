<script setup>
import { onMounted } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import { useRoute } from 'vue-router';
import TaskList from '@/components/TaskList.vue';

const taskStore = useTaskStore();
const route = useRoute();
// console.log('categoryId: ', route.params.categoryId); // Skriver ut inkommande categoryId

onMounted(async () => {
  //   await taskStore.fetchTasksInCategory(route.params.categoryId);
  //   //console.log('Tasks fetched:', taskStore.tasksInCategory);
  await taskStore.fetchOneCategory(route.params.categoryId);
  console.log('Category fetched:', taskStore.oneCategory);
});
</script>

<template>
  <header v-if="taskStore.oneCategory">
    <h1 style="text-align: center; margin-bottom: -0.5em;">
      {{ taskStore.oneCategory[0].categoryName }}
    </h1>
    <div id="image-container">
      <img :src="taskStore.oneCategory[0].categoryImage" alt="" style="max-width: 100%; max-height: 100%" />
    </div>
  </header>
  <BContainer style="max-width: 70%;">
    <TaskList />
  </BContainer>
</template>

<style scoped>
#image-container {
  height: 100px;
  display: flex;
  justify-content: center;
}
</style>
