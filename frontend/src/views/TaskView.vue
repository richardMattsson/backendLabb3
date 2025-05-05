<script setup>
import { computed, onMounted, ref } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import { useRoute } from 'vue-router';

const taskStore = useTaskStore();
const route = useRoute();
const isLoaded = ref(false)


onMounted(async () => {
    const taskId = route.params.taskId;

    await taskStore.fetchTaskDetails(taskId);
    console.log('Task fetched:', taskStore.taskDetails);
    isLoaded.value = true;
});

const taskCreator = computed(() => {
    let index = 0;
    if (taskStore.taskDetails.length > 1) {
        index = taskStore.taskDetails.findIndex((task) => {
            return task.userRole === 'taskCreator'
        })
    }
    return taskStore.taskDetails[index].firstName;
})


</script>

<template>
    <section v-if="isLoaded">
        <h1>{{ taskStore.taskDetails[0].title }}</h1>
        <p v-if="taskStore.taskDetails[0].description">{{ taskStore.taskDetails[0].description }}</p>
        <h2>{{ taskStore.taskDetails[0].price }} kr</h2>
        <h3 v-if="taskStore.taskDetails[0].date">{{ taskStore.taskDetails[0].date.split('T')[0] }}</h3>
        <h3>{{ taskStore.taskDetails[0].address }}</h3>
        <h3>{{ taskCreator }}</h3>
    </section>
</template>