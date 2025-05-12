<script setup>
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import { useTaskStore } from "@/stores/taskStore";
import { useLoginStore } from "@/stores/loginStore";
import { useUserStore } from "@/stores/userStore";
import { useRatingStore } from "@/stores/ratingStore";
import { useRoute, useRouter } from "vue-router";
import { CRating } from "@coreui/vue-pro";

const taskStore = useTaskStore();
const loginStore = useLoginStore();
const ratingStore = useRatingStore();
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const taskDetails = ref(null);
const taskId = ref(null);
const score = ref(0);
const avgRating = ref(null);
const rated = ref(false);
const task = ref(null);

watch(
  () => taskStore.taskDetails,
  (newValue, oldValue) => {
    taskDetails.value = newValue[0];
  }
);

onMounted(async () => {
  taskId.value = route.params.taskId;

  await taskStore.fetchTaskDetails(taskId.value);
  console.log(taskDetails.value);

  await ratingStore.getAvgRating();
  avgRating.value = ratingStore.avgRatingByUser;
  console.log(avgRating.value);

  const response = await fetch(
    `http://localhost:3000/api/tasks/${route.params.taskId}`
  );
  const data = await response.json();
  task.value = data.task[0];
});

async function doerAcceptTask() {
  await userStore.fetchUsers();

  // letar efter userId
  const doer = userStore.allUsers.filter((user) => {
    return user.email === loginStore.username;
  });

  await taskStore.createUserTask(doer[0].userId, taskId.value);
  if (
    avgRating.value.findIndex((user) => user.username !== loginStore.username)
  )
    await ratingStore.addUserToRating(doer[0].email);

  taskStore.fetchTaskDetails(taskId.value);
}

async function rateDoer(doerEmail, newScore, creatorEmail) {
  await ratingStore.addNewScore(doerEmail, newScore, creatorEmail);
  await ratingStore.getUserScore(doerEmail, creatorEmail);

  rated.value = true;
}

function goToPage() {
  router.push({ name: "EditTask", params: { id: taskId.value } });
}

async function deleteTask() {
  try {
    const response = await fetch(
      `http://localhost:3000/api/tasks/${task.value.taskId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${loginStore.token}`,
        },
      }
    );
    if (!response.ok) {
      console.log(response);
      throw new Error(`Response status: ${response.status}`);
    }
    alert("Tjänsten har raderats!");
    const result = await response.json();
    console.log("Servern svarade med:", result);

    router.push({ path: "/tasks" });
  } catch (error) {
    console.log("Något gick fel", error.message);
  }
}

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
  console.log(doers);
  if (avgRating.value && doers) {
    for (const doer of doers) {
      console.log(doer.email);
      const index = avgRating.value.findIndex(
        (user) => user.username === doer.email
      );
      if (index >= 0){
        doer.rating =
          Math.round(avgRating.value[index].avgRating) ||
          "Användare har ingen rating";
        doer.scoreNumber = avgRating.value[index].nRatings;
      }
    }
  }
  console.log(doers);

  return doers;
});

const labelColor = computed(() => {
  if (taskStore.taskDetails[0].status === "New") return "success";
  else if (taskStore.taskDetails[0].status === "Pågående") return "warning";
  else return "secondary";
});

watchEffect(async () => {
  const doers = taskDoers.value;
  const username = loginStore.username;

  if (!doers?.length || !username) return;

  await ratingStore.getUserScore(doers[0].email, username);

  if (ratingStore.userScore.length > 0) {
    score.value = ratingStore.userScore[0].givenRating[0].score;
    rated.value = true;
  } else {
    rated.value = false;
  }
});
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
      <h4 v-if="taskDetails.date">{{ taskDetails.date.split("T")[0] }}</h4>
      <h4 v-else>Datum diskuteras</h4>
      <p class="description" v-if="taskDetails.description">
        {{ taskDetails.description }}
      </p>
      <h4>Adress: {{ taskDetails.address }}</h4>
      <h4>Beställare: {{ taskCreator }}</h4>
      <div id="edit" v-if="viewer === 'creator' && taskDetails.status === 'New'">
        <BButton @click="goToPage()" id="editDelete" variant="warning">
          Redigera
        </BButton>
        <BButton v-if="task && task.taskId" @click="deleteTask()" id="editDelete" variant="danger">
          Radera
        </BButton>
      </div>
    </section>

    <section class="task-actions">
      <!-- Task tatus NEW -->
      <section v-if="taskDetails.status === 'New'">
        <section class="for-creator" v-if="viewer === 'creator'">
          <h3>Utförare för din uppgift</h3>
          <p v-if="taskDoers.length < 1">Inga utförare har tackat ja ännu</p>
          <li v-for="doer in taskDoers" :key="doer.email">
            <h5>{{ doer.name }}</h5>
            <p>Rating: {{ doer.rating }} <span class="pi pi-star-fill"></span></p>
            <BButton @click="taskStore.confirmDoer(taskId, doer.userId)" variant="warning">
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

      <!-- Task status In progress -->
      <section v-if="taskDetails.status === 'Pågående'">
        <section v-if="viewer === 'creator'">
          <h3>Utförare för din uppgift</h3>
          <li v-for="doer in taskDoers" :key="doer.email">
            <h5>{{ doer.name }}</h5>
            <p>Rating: {{ doer.rating }} <span class="pi pi-star-fill"></span></p>
          </li>
          <BButton variant="success" @click="taskStore.markAsDone(taskId)">Markera som klar</BButton>
        </section>
        <section v-if="viewer === 'doer'">
          <h3>🎉 Du har blivit bekräftad som utförare!</h3>
          <p>Grattis! Beställaren har valt dig för att utföra tjänsten. Kontakta beställaren för att diskutera detaljer
            och säkerställa att allt är klart inför utförandet.</p>
          <div class="contacts">
            <a :href="`mailto:${taskDetails.email}`"><i class="pi pi-envelope"
              style="font-size: 1.5rem; color: green"></i></a>
            <i class="pi pi-phone" style="font-size: 1.5rem; color: green"></i>
          </div>
        </section>
      </section>

      <!-- Task status Completed -->
      <section v-if="taskStore.taskDetails[0].status === 'Färdig'">
        <section v-if="viewer === 'creator'">
          <h3>Din uppgift har blivit utförd!</h3>
          <div v-if="!rated">
            <h4>Vill du betygsätta din upplevelse?</h4>
            <div v-for="doer in taskDoers" :key="doer.email">
              <h5>{{ doer.name }}</h5>
              <p>Rating: {{ doer.rating }} <span class="pi pi-star-fill"></span></p>
              <div class="rating">
                <CRating v-model="score" style="padding-block: 0.6em;" />
                <BButton @click="rateDoer(doer.email, score, loginStore.username)" variant="info">Ge betyg</BButton>
              </div>
            </div>
          </div>
          <div v-if="rated">
            <p>Tack, du har betygsätt utföraren 🌟 </p>
            <h4>Utförare för din uppgift</h4>
            <div v-for="doer in taskDoers" :key="doer.email">
              <h5 style="color: slategray;">{{ doer.name }}</h5>
              <div class="rating">
                <p>Rating: {{ doer.rating }} <span class="pi pi-star-fill"></span></p>
                <p>Ditt betyg: {{ score }}</p>
              </div>
            </div>
          </div>
        </section>
        <section v-if="viewer === 'doer'">
          <h3>✅ Du har utfört uppgiften!</h3>
          <div v-for="doer in taskDoers" :key="doer.email">
            <p>Din rating: {{ doer.rating }} <span class="pi pi-star-fill"></span></p>
            <div v-if="!rated">
              <p>Du har slutfört uppgiften - bra jobbat!
                📌 Beställaren har ännu inte betygsatt din insats. Betyg visas här när det finns tillgängligt.</p>
            </div>
            <div v-if="rated">
              <div class="rating">
                <p>Bestallärens betyg: {{ score }}</p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </section>
  </article>
</template>

<style scoped>
article {
  display: grid;
  grid-template-rows: 2fr 1fr;
  padding-block: 1rem;
  gap: 2rem;
}

section {
  box-sizing: border-box;
}

.task-details {
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: auto;
  gap: 2rem;
  margin-inline: auto;
  background-color: #f9f9f9;
  padding-inline: 5rem;
  padding-block: 4rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 30em;
  min-width: 60%;
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

#edit {
  display: flex;
  justify-content: start;
  gap: 1.5em;
}

.task-actions {
  margin-inline: auto;
  background-color: #fff;
  padding-inline: 5rem;
  width: 25em;
  min-width: 60%;
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

.rating {
  display: flex;
  justify-content: center;
  gap: 1em;
}

.contacts {
  display: flex;
  justify-content: flex-start;
  gap: 1em;
}
</style>
