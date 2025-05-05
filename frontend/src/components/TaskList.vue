<script setup>
import { onMounted, ref } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const taskStore = useTaskStore();
const route = useRoute();
const tasksList = ref([]);


onMounted(async () => {
  if (route.path.startsWith(`/tasks-in-category/`)) {
    const categoryId = route.params.categoryId;
    console.log(categoryId)

    await taskStore.fetchTasksInCategory(categoryId);
    tasksList.value = taskStore.tasksInCategory;
    console.log('Tasks fetched:', taskStore.tasksInCategory)
  } else {
    await taskStore.fetchLatestTasks();
    tasksList.value = taskStore.tasks;
    console.log('Tasks fetched:', taskStore.tasks);
  }
});
</script>

<template>
  <BCol>
    <h1 style="text-align: center">Tjänster</h1>

    <article>
      <b-card v-for="task in tasksList.slice(0, 6 || tasksList.length)" :title="task.title"
        :subtitle="task.price + ' kr'" class="mb-2">
        <b-card-text>
          {{ task.description }}
        </b-card-text>

        <b-card-text style="color:sienna;"> <span class="pi pi-map-marker"></span> {{ task.address }}</b-card-text>

        <a @click="router.push(`/tasks/${task.taskId}`)" href="#" class="card-link">Visa tjänst</a>
      </b-card>
    </article>
  </BCol>
</template>