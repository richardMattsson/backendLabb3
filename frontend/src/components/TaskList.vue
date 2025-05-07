<script setup>
import { onMounted, ref } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import { useRouter, useRoute, RouterLink } from 'vue-router';

const router = useRouter();
const taskStore = useTaskStore();
const route = useRoute();
const tasksList = ref([]);
const limit = ref(null);

onMounted(async () => {
  if (route.path.startsWith(`/tasks-in-category/`)) {
    const categoryId = route.params.categoryId;
    console.log(categoryId)

    await taskStore.fetchTasksInCategory(categoryId);
    tasksList.value = taskStore.tasksInCategory;
    limit.value = tasksList.value.length;
    console.log('Tasks fetched:', tasksList.value)
  } else {
    await taskStore.fetchLatestTasks();
    tasksList.value = taskStore.tasks;
    limit.value = 6;
    console.log('Tasks fetched:', taskStore.tasks);
  }
});
</script>

<template>
  <BCol>
    <h1 style="text-align: center">Tjänster</h1>

    <article>
      <b-card v-for="task in tasksList.slice(0, limit || tasksList.length)" :title="task.title" :key="task.taskId"
        :subtitle="task.price + ' kr'" class="mb-2">
        <b-card-text>
          {{ task.description }}
        </b-card-text>

        <b-card-text style="color:sienna;"> <span class="pi pi-map-marker"></span> {{ task.address }}</b-card-text>

        <RouterLink :to="`/tasks/${task.taskId}`" class="card-link">Visa tjänst</RouterLink>
      </b-card>
    </article>
  </BCol>
</template>