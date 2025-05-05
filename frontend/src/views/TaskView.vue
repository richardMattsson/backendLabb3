<script setup>
import { onMounted } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import { useRoute } from 'vue-router';

const taskStore = useTaskStore();
const route = useRoute();

onMounted(async () => {
    const taskId = route.params.taskId;
    await taskStore.fetchTaskDetails(taskId);
    console.log('Task fetched:', taskStore.taskDetails);
});

</script>

<template>
    <h1>{{ taskStore.taskDetails.title }}</h1>
</template>