<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import { useLoginStore } from '@/stores/loginStore';
import { useRoute } from 'vue-router';

const taskStore = useTaskStore();
const loginStore = useLoginStore();
const route = useRoute();
const taskDetails = ref(null);
const viewer = ref( loginStore.username ? loginStore.username : "anonymous");


onMounted(async () => {
    const taskId = route.params.taskId;

    await taskStore.fetchTaskDetails(taskId);
    console.log('Task fetched:', taskStore.taskDetails);
    taskDetails.value = taskStore.taskDetails[0];
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

const taskDoers = computed(() => {
    let doers = []
    for (const task of taskStore.taskDetails) {
        if (task.userRole === "taskDoer")
            doers.push({ name: task.firstName, email: task.email })
    }
    return doers;
})

</script>

<template>
    <section v-if="taskDetails">
        <h1>{{ taskDetails.title }}</h1>
        <p v-if="taskDetails.description">{{ taskDetails.description }}</p>
        <h2>{{ taskDetails.price }} kr</h2>
        <h3 v-if="taskDetails.date">{{ taskDetails.date.split('T')[0] }}</h3>
        <h3>{{ taskDetails.address }}</h3>
        <h3>{{ taskCreator }}</h3>
        <p>{{ taskDetails.status }}</p>
    </section>
    <li v-for="doer in taskDoers">{{ doer.name }}</li>
</template>