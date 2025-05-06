<script setup>
import { computed, onMounted, ref } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import { useLoginStore } from '@/stores/loginStore';
import { useRoute } from 'vue-router';

const taskStore = useTaskStore();
const loginStore = useLoginStore();
const route = useRoute();
const taskDetails = ref(null);
const confirmed = ref(false)

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

const viewer = computed(() => {
    if (loginStore.isLoggedIn) {
        for (const task of taskStore.taskDetails) {
            if (loginStore.username === task.email) {
                if (task.role === 'taskCreator')
                    return 'creator'
                else {
                    if (task.confirmed)
                        confirmed.value = true;
                }
            } else
                return 'doer'
        }
    } else
        return 'anonymous'
})

const taskDoers = computed(() => {
    let doers = []
    for (const task of taskStore.taskDetails) {
        if (task.userRole === "taskDoer")
            doers.push({ name: task.firstName, email: task.email })
    }
    return doers;
})

console.log("status", loginStore.isLoggedIn)
console.log("username", loginStore.username)
console.log("viewer", viewer.value)

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
        <p v-if="viewer === 'creator'">you can manage the task</p>
    </section>
    <section v-if="viewer === 'creator'">
        <li v-if="taskDoers.length < 1">Inga utf</li>
        <li v-for="doer in taskDoers" :key="doer.email">{{ doer.name }}</li>
    </section>
    <section v-if="viewer === 'doer'">
        <button>Tacka ja</button>
    </section>
    <section v-if="viewer === 'anonymous'">
        <button>Logga in</button>
    </section>
</template>