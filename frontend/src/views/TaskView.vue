<script setup>
import { computed, onMounted, ref } from "vue";
import { useTaskStore } from "@/stores/taskStore";
import { useLoginStore } from "@/stores/loginStore";
import { useRoute, useRouter } from "vue-router";

const taskStore = useTaskStore();
const loginStore = useLoginStore();
const router = useRouter();
const route = useRoute();
const taskDetails = ref(null);
const taskId = ref(null);

function goToPage() {
  router.push({ name: "EditTask", params: { id: taskId.value } });
}

onMounted(async () => {
  taskId.value = route.params.taskId;

  await taskStore.fetchTaskDetails(taskId.value);
  console.log("Task fetched:", taskStore.taskDetails[0]);
  taskDetails.value = taskStore.taskDetails[0];
  console.log(taskStore.taskDetails);
});

async function onClick() {
  await taskStore.fetchUsers();

  // letar efter userId
  const doer = taskStore.allUsers.users.filter((user) => {
    return user.email === loginStore.username;
  });
  // userTaskUId === doer[0].userId

  await taskStore.createUserTask(doer[0].userId, taskId.value);
  alert("Du har tackat jag till att utföra tjänsten!");

  taskStore.fetchTaskDetails(taskId.value);
}

// async function deleteTask() {
//     try {
//     const res = await fetch(`http://localhost:3000/api/tasks/${taskId.value}`, {
//         method: 'DELETE'
//     });

//     const result = await res.json();

//     if (!res.ok) {
//         throw new Error(result.error)
//     }
//     alert('Tjänsten har raderats!', result.message);
//     router.push('/tasks');
// } catch (error) {
//     console.error('Fel vid radering')
//     }
// };

const taskCreator = computed(() => {
  let index = 0;
  if (taskStore.taskDetails.length > 1) {
    index = taskStore.taskDetails.findIndex((task) => {
      return task.userRole === "taskCreator";
    });
  }
  return taskStore.taskDetails[index].firstName;
});

const viewer = computed(() => {
  if (!loginStore.isLoggedIn) return "anonymous";

  for (const task of taskStore.taskDetails) {
    if (loginStore.username === task.email) {
      if (task.userRole === "taskCreator") {
        return "creator";
      } else return "doer";
    }
  }
  return "nonDoer";
});

const taskDoers = computed(() => {
  let doers = [];
  for (const task of taskStore.taskDetails) {
    if (task.userRole === "taskDoer")
      doers.push({
        name: task.firstName,
        email: task.email,
        userId: task.userTaskUId,
      });
  }
  return doers;
});

const labelColor = computed(() => {
  if (taskStore.taskDetails[0].status === "New") return "badge bg-success";
  else if (taskStore.taskDetails[0].status === "Pågående")
    return "badge bg-warning text-dark";
  else return "badge bg-secondary";
});

// console.log('status', loginStore.isLoggedIn);
// console.log('username', loginStore.username);
// console.log('viewer', viewer.value);
</script>

<template>
  <i
    @click="router.push({ path: route.query.endpoint || '/tasks' })"
    class="pi pi-arrow-left"
    style="
      font-size: 1.2rem;
      font-weight: 500;
      margin-top: 0.8em;
      padding-left: 2em;
      cursor: pointer;
    "
    ><span
      style="
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        cursor: pointer;
      "
    >
      Till tjänster</span
    ></i
  >
  <article v-if="taskDetails">
    <section class="task-details">
      <h1>
        {{ taskDetails.title }}
        <span :class="labelColor">{{ taskDetails.status }}</span>
      </h1>
      <h3>{{ taskDetails.price }} kr</h3>
      <h4 v-if="taskDetails.date">{{ taskDetails.date.split("T")[0] }}</h4>
      <h4 v-else>Datum diskuteras</h4>
      <p class="description" v-if="taskDetails.description">
        {{ taskDetails.description }}
      </p>
      <h4>Adress: {{ taskDetails.address }}</h4>
      <h4>Beställare: {{ taskCreator }}</h4>
      <div v-if="viewer === 'creator'">
        <button @click="goToPage()" class="btn btn-warning">Redigera</button>
        <button type="button" class="btn btn-danger">Radera</button>
      </div>
    </section>
    <section
      class="task-actions"
      v-if="taskStore.taskDetails[0].status === 'New'"
    >
      <section class="for-creator" v-if="viewer === 'creator'">
        <h3>Utförare för din uppgift</h3>
        <p v-if="taskDoers.length < 1">Inga utförare har tackat ja ännu</p>
        <li v-for="doer in taskDoers" :key="doer.email">
          <h5>{{ doer.name }}</h5>
          <p>Rating:</p>
          <button
            @click="taskStore.confirmDoer(taskId, doer.userId, doer)"
            type="button"
            class="btn btn-warning"
          >
            Bekräfta utförare
          </button>
        </li>
      </section>
      <section v-if="viewer === 'nonDoer'">
        <button @click="onClick" type="button" class="btn btn-primary">
          Tacka ja
        </button>
      </section>
      <div class="card" v-if="viewer === 'doer'">
        <div class="card-body">
          Vänta på bekräftelse från beställare av tjänsten
        </div>
      </div>
      <div class="card" v-if="viewer === 'anonymous'">
        <div class="card-body">
          Du behöver vara inloggad för att tacka ja till uppgiften
        </div>
        <button
          @click="
            router.push({
              path: '/login',
              query: { endpoint: route.fullPath },
            })
          "
          type="button"
          class="btn btn-primary"
        >
          Logga in
        </button>
      </div>
    </section>
    <section
      class="task-actions"
      v-if="taskStore.taskDetails[0].status === 'Pågående'"
    >
      <section v-if="viewer === 'creator'">
        <h3>Utförare för din uppgift</h3>
        <li v-for="doer in taskDoers" :key="doer.email">
          <h5>{{ doer.name }}</h5>
          <p>Rating:</p>
        </li>
        <button @click="taskStore.markAsDone(taskId)">Markera som klar</button>
      </section>
    </section>

    <section
      class="task-actions"
      v-if="taskStore.taskDetails[0].status === 'Färdig'"
    >
      <section v-if="viewer === 'creator'">
        <h3>Din uppgift har blivit utförd!</h3>
        <p>Vill du betygsätta din upplevelse?</p>

        <button>Ge betyg</button>
      </section>
    </section>
  </article>
</template>

<style scoped>
article {
  display: grid;
  grid-template-rows: 70% 20% 20%;
  padding-block: 2.5rem;
  gap: 0.5rem;
}

section {
  padding: 1rem;
  box-sizing: border-box;
}

.task-details {
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 3fr 1fr 1fr;
  gap: 2rem;
  margin-inline: auto;
  background-color: #f9f9f9;
  padding: 5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 70%;
}

h1 {
  grid-column: span 2;
}

h3 {
  color: blue;
  font-size: 1.5rem;
}

h4 {
  font-size: 1.2rem;
}

.description {
  grid-row: span 2;
  font-size: 1.1rem;
}

.task-actions {
  margin-inline: auto;
  background-color: #fff;
  padding-inline: 5rem;
  /* border-radius: 8px; */
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
}

li {
  list-style: none;
  margin-bottom: 1rem;
}

.for-creator {
  padding-block: 1rem;
}

.for-creator h3 {
  padding-block: 1rem;
}

.for-creator li {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
