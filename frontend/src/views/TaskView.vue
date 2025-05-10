<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import { useLoginStore } from '@/stores/loginStore';
import { useRatingStore } from '@/stores/ratingStore';
import { useRoute, useRouter } from 'vue-router';

const taskStore = useTaskStore();
const loginStore = useLoginStore();
const ratingStore = useRatingStore();
const router = useRouter();
const route = useRoute();
const taskDetails = ref(null);
const taskId = ref(null);
const score = ref(0);
const rated = ref(false);
const avgRating = ref(null)

watch(
  () => taskStore.taskDetails,
  (newValue, oldValue) => {
    // console.log(oldValue, 'ändras till ', newValue[0]);
    taskDetails.value = newValue[0];
  }
);

onMounted(async () => {
  taskId.value = route.params.taskId;

  await taskStore.fetchTaskDetails(taskId.value);
  //console.log('Task fetched:', taskStore.taskDetails[0]);
  // taskDetails.value = taskStore.taskDetails[0];
  console.log(taskDetails.value);

  await ratingStore.getAvgRating();
  avgRating.value = ratingStore.avgRatingByUser;
  console.log(avgRating.value)
});

async function doerAcceptTask() {
  await taskStore.fetchUsers();

  // letar efter userId
  const doer = taskStore.allUsers.users.filter((user) => {
    return user.email === loginStore.username;
  });
  // userID (userTaskUId) === doer[0].userId

  await taskStore.createUserTask(doer[0].userId, taskId.value);
  await ratingStore.addUserToRating(doer[0].email)

  taskStore.fetchTaskDetails(taskId.value);
}

async function rateDoer(newScore, creatorEmail) {
  const doer = taskStore.taskDetails.email;
  await ratingStore.addNewScore(doer, newScore, creatorEmail);
  await ratingStore.getUserScore(doer, creatorEmail);
  rated.value = true;
}


function goToPage() {
  router.push({ name: 'EditTask', params: { id: taskId.value } });
}

// function goToHomePage() {
//   router.push({ path: "/tasks" });
// }

// async function deleteTask() {
//   try {
//     const response = await fetch(
//       `http://localhost:3000/api/tasks/${taskId.value}`,
//       {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `${loginStore.token}`,
//         },
//       }
//     );
//     if (!response.ok) {
//       console.log(response);
//       throw new Error(`Response status: ${response.status}`);
//     }
//     alert("Tjänsten har raderats!");
//     const result = await response.json();
//     console.log("Servern svarade med:", result);

//     router.push({ name: "TasksView" });
//   } catch (error) {
//     console.log("Något gick fel", error.message);
//   }
// }

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
      return task.userRole === 'taskCreator';
    });
  }
  return taskStore.taskDetails[index].firstName;
});

const viewer = computed(() => {
  if (!loginStore.isLoggedIn) return 'anonymous';

  for (const task of taskStore.taskDetails) {
    if (loginStore.username === task.email) {
      if (task.userRole === 'taskCreator') {
        return 'creator';
      } else return 'doer';
    }
  }
  return 'nonDoer';
});

const taskDoers = computed(() => {
  let doers = [];
  for (const task of taskStore.taskDetails) {
    if (task.userRole === 'taskDoer')
      doers.push({
        name: task.firstName,
        email: task.email,
        userId: task.userTaskUId,
      });
  }
  console.log(doers)
  if (avgRating.value && doers) {
    for (const doer of doers) {
      console.log(doer.email)
      const index = avgRating.value.findIndex((user) => user.username === doer.email)
      console.log(index)
      doer.rating = Math.round(avgRating.value[index].avgRating) || 'Användare har ingen rating'
      doer.scoreNumber = avgRating.value[index].nRatings
    }
  }
  console.log(doers)
  return doers;
});

const labelColor = computed(() => {
  if (taskStore.taskDetails[0].status === 'New') return 'success';
  else if (taskStore.taskDetails[0].status === 'Pågående')
    return 'warning';
  else return 'secondary';
});

// console.log('status', loginStore.isLoggedIn);
// console.log('username', loginStore.username);
// console.log('viewer', viewer.value);
</script>

<template>
  <i @click="router.push({ path: route.query.endpoint || '/tasks' })" class="pi pi-arrow-left" style="
      font-size: 1.2rem;
      font-weight: 500;
      margin-top: 0.8em;
      padding-left: 2em;
      cursor: pointer;
    "><span style="
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        cursor: pointer;
      ">
      Till tjänster</span></i>
  <article v-if="taskDetails">
    <section class="task-details">
      <h1>
        {{ taskDetails.title }}
        <BBadge :variant="labelColor">{{ taskDetails.status }}</BBadge>
      </h1>
      <h3>{{ taskDetails.price }} kr</h3>
      <h4 v-if="taskDetails.date">{{ taskDetails.date.split('T')[0] }}</h4>
      <h4 v-else>Datum diskuteras</h4>
      <p class="description" v-if="taskDetails.description">
        {{ taskDetails.description }}
      </p>
      <h4>Adress: {{ taskDetails.address }}</h4>
      <h4>Beställare: {{ taskCreator }}</h4>
      <div v-if="viewer === 'creator'">
        <BButton @click="goToPage()" id="editDelete" variant="warning">
          Redigera
        </BButton>
        <BButton @click="deleteTask()" id="editDelete" variant="danger">
          Radera
        </BButton>
      </div>
    </section>

    <section class="task-actions" v-if="taskStore.taskDetails[0].status === 'New'">
      <section class="for-creator" v-if="viewer === 'creator'">
        <h3>Utförare för din uppgift</h3>
        <p v-if="taskDoers.length < 1">Inga utförare har tackat ja ännu</p>
        <li v-for="doer in taskDoers" :key="doer.email">
          <h5>{{ doer.name }}</h5>
          <p>Rating: {{ doer.rating }}</p>
          <BButton @click="taskStore.confirmDoer(taskId, doer.userId, doer)" variant="warning">
            Bekräfta utförare
          </BButton>
        </li>
      </section>
      <section v-if="viewer === 'nonDoer'">
        <BButton @click="doerAcceptTask" type="button" variant="primary">
          Tacka ja
        </BButton>
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
        <BButton variant="primary" @click="
          router.push({
            path: '/login',
            query: { endpoint: route.fullPath },
          })
          " type="button">
          Logga in
        </BButton>
      </div>
    </section>

    <section class="task-actions" v-if="taskStore.taskDetails[0].status === 'Pågående'">
      <section v-if="viewer === 'creator'">
        <h3>Utförare för din uppgift</h3>
        <li v-for="doer in taskDoers" :key="doer.email">
          <h5>{{ doer.name }}</h5>
          <p>Rating: {{ doer.rating }}</p>
        </li>
        <BButton variant="success" @click="taskStore.markAsDone(taskId)">Markera som klar</BButton>
      </section>
    </section>

    <section class="task-actions" v-if="taskStore.taskDetails[0].status === 'Färdig'">
      <section v-if="viewer === 'creator'">
        <h3>Din uppgift har blivit utförd!</h3>
        <div v-if="!rated">
          <h5>Vill du betygsätta din upplevelse?</h5>
          <!-- <b-form-rating v-model="score" variant="primary" class="mb-2" show-value inline></b-form-rating> FUNKAR INTE -->
          <!-- <BButton @click="rateDoer(score, loginStore.username)" variant="secondary">Ge betyg</BButton> -->
        </div>
        <div v-if="rated">
          <p>Tack, du har betygsätt utföraren</p>
        </div>
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
