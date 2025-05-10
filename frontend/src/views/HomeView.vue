<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
const router = useRouter();
const userCount = ref(null);

onMounted(async () => {
  try {
    const res = await fetch("http://localhost:3000/api/user-count");
    const data = await res.json();
    userCount.value = data.userCount;
  } catch (error) {
    console.log("Fel vid hämtning utav användartal", error);
  }
}
);

function goToTasks() {
  router.push({ path: "/tasks" });
}
function goToCreateTask() {
  router.push({ path: "/createtask" });
}
</script>

<template>
  <BContainer style="">
    <BRow align-v="center" align-h="evenly">
      <BCol cols="4" style="" class="homeBtn">
        <BButton @click="goToTasks" variant="outline-success" class="p-5">Visa tjänster</BButton>
      </BCol>
      <BCol cols="4" class="homeBtn">
        <BButton @click="goToCreateTask" variant="outline-danger" class="p-5">Lägg till tjänst</BButton>
      </BCol>
    </BRow>
  </BContainer>
  <div>Registrerade användare: {{ userCount }}</div>
</template>

<style scoped>
.container {
  flex-grow: 1;
  display: flex;
}

.row {
  flex-grow: 1;
}

.homeBtn {
  display: flex;
  justify-content: center;
}
</style>
