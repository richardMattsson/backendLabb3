<script setup>
import { onMounted } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const taskStore = useTaskStore();

onMounted(async () => {
  await taskStore.fetchAllTasks();
  console.log('Tasks fetched:', taskStore.tasks);
});
</script>

<template>
  <BCol>
    <h1 style="text-align: center">Tjänster</h1>

    <article>
      <b-card v-for="task in taskStore.tasks" :title="task.title" :subtitle="task.price + ' kr'" class="mb-2">
        <b-card-text>
          {{ task.description }}
        </b-card-text>

        <b-card-text style="color:sienna;"> <span class="pi pi-map-marker"></span> {{ task.address }}</b-card-text>

        <a @click="router.push(`/tasks/${task.taskId}`)" href="#" class="card-link">Visa tjänst</a>
      </b-card>
    </article>
  </BCol>
</template>