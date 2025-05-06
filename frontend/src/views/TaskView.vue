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
    if (!loginStore.isLoggedIn) return 'anonymous'

    for (const task of taskStore.taskDetails) {
        if (loginStore.username === task.email) {
            if (task.userRole === 'taskCreator') {
                return 'creator'
            } else
                return 'doer'
        }
    }
    return 'nonDoer'
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
    <main v-if="taskDetails">
        <section class="task-details">
            <h1>{{ taskDetails.title }}</h1>
            <div>
                <p>{{ taskDetails.status }}</p>
            </div>
            <h3>{{ taskDetails.price }} kr</h3>
            <p v-if="taskDetails.description">{{ taskDetails.description }}</p>
            <h4 v-if="taskDetails.date">{{ taskDetails.date.split('T')[0] }}</h4>
            <h4>{{ taskDetails.address }}</h4>
            <h4>{{ taskCreator }}</h4>
        </section>
        <section class="task-actions" v-if="taskDetails.status === 'New'">
            <section v-if="viewer === 'creator'">
                <h3>Utförare för din uppgift</h3>
                <p v-if="taskDoers.length < 1">Inga utförare har tackat ja ännu</p>
                <li v-for="doer in taskDoers" :key="doer.email">
                    <h5>{{ doer.name }}</h5>
                    <p>Rating: </p>
                    <button>Bekräfta utförare</button>
                </li>
            </section>
            <section class="task-actions" v-if="viewer === 'nonDoer'">
                <button>Tacka ja</button>
            </section>
            <div v-if="viewer === 'doer'">
                <p>Vänta på bekräftelse från beställare av tjänsten</p>
            </div>
            <section class="task-actions" v-if="viewer === 'anonymous'">
                <p>Du behöver vara inloggad för att tacka ja till uppgiften</p>
                <button>Logga in</button>
            </section>
        </section>
        <section class="task-actions" v-if="taskDetails.status === 'Pågående'">
            <section v-if="viewer === 'creator'">
                <h3>Utförare för din uppgift</h3>
                <li v-for="doer in taskDoers" :key="doer.email">
                    <h5>{{ doer.name }}</h5>
                    <p>Rating: </p>
                </li>
                <button>Markera som klar</button>
            </section>
        </section>
    </main>
</template>

<style scoped>
section {
    padding: 1rem;
    box-sizing: border-box;
}

main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    max-width: 1200px;
    margin: auto;
}

.task-details {
    background-color: #f9f9f9;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.task-actions {
    background-color: #fff;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button {
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #007ACC;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

li {
    list-style: none;
    margin-bottom: 1rem;
}

@media (max-width: 768px) {
    .task-container {
        grid-template-columns: 1fr;
    }
}
</style>