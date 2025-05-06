<script setup>
import { computed, ref, onMounted } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import { useLoginStore } from '@/stores/loginStore';
import { useRouter } from 'vue-router';
const router = useRouter();

const taskStore = useTaskStore();
const loginStore = useLoginStore();

onMounted(async () => {
  await taskStore.fetchCategories();
  //console.log('Categories fetched:', taskStore.categories);
});

const titleValidation = computed(() => title.value.length > 0);
const addressValidation = computed(() => address.value.length > 0);

const title = ref(''),
  date = ref(null),
  description = ref(''),
  address = ref(''),
  price = ref(null),
  categories = ref(null),
  taskCategoryId = ref(null),
  userId = ref(null),
  latestUserTaskId = ref(null);

async function addNewTask() {
  const task = {
    title: title.value,
    description: description.value,
    date: date.value,
    address: address.value,
    price: price.value,
    taskCategoryId: taskCategoryId.value,
  };
  console.log(task);
  try {
    const response = await fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${loginStore.token}`,
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      console.log(response);
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Servern svarade med:', result);

    getLatestTasks();
  } catch (error) {
    console.error('Något gick fel:', error.message);
  }
}
async function getLatestTasks() {
  const url = 'http://localhost:3000/api/tasks';
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    latestUserTaskId.value = result.tasks[result.tasks.length - 1];
    // console.log(result.tasks);
    // console.log(latestUserTaskId.value.taskId);
    createUserTask(latestUserTaskId.value.taskId);
  } catch (error) {
    console.error(error.message);
  }
}
async function createUserTask(id) {
  const userTask = {
    userRole: 'taskCreator',
    userTaskUId: userId.value,
    userTaskTId: id,
  };
  console.log(userTask);
  try {
    const response = await fetch('http://localhost:3000/api/user-tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userTask),
    });
    if (!response.ok) {
      console.log(response);
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Servern svarade med:', result);
  } catch (error) {
    console.error('Något gick fel:', error.message);
  }
}
</script>

<template>
  <BContainer>
    <BRow>
      <BCol cols="6">
        <p v-if="!loginStore.isLoggedIn">
          Du behöver skapa ett konto innan du kan lägga upp en ny tjänst.
        </p>
        <BButton
          @click="router.push({ path: '/login' })"
          class="mt-4"
          variant="success"
          v-if="!loginStore.isLoggedIn"
          >Logga in</BButton
        >
        <BForm id="addTaskForm" v-if="loginStore.isLoggedIn">
          <h3>Lägg till en ny tjänst</h3>
          <BFormGroup id="input-group-1" label="Titel:" label-for="input-1">
            <BFormInput
              id="input-1"
              type="text"
              class="mb-2"
              v-model="title"
              placeholder="Titel"
              required
              :state="titleValidation"
            />
            <BFormInvalidFeedback :state="titleValidation">
              Titelfältet får inte vara tomt.
            </BFormInvalidFeedback>
            <BFormValidFeedback :state="titleValidation">
              Ser bra ut!
            </BFormValidFeedback>
          </BFormGroup>

          <BFormGroup id="input-group-2" label="Datum:" label-for="input-2">
            <BFormInput
              id="input-2"
              class="mb-2"
              type="date"
              v-model="date"
              placeholder="Datum"
            ></BFormInput>
          </BFormGroup>

          <BFormGroup
            id="input-group-3"
            label="Beskrivning:"
            label-for="input-3"
          >
            <BFormTextarea
              id="input-3"
              class="mb-2"
              rows="6"
              v-model="description"
              placeholder="Beskrivning"
            >
            </BFormTextarea>
          </BFormGroup>

          <BFormGroup id="input-group-4" label="Adress:" label-for="input-4">
            <BFormInput
              id="input-4"
              type="text"
              class="mb-2"
              v-model="address"
              placeholder="Adress"
              :state="addressValidation"
            />
            <BFormInvalidFeedback :state="addressValidation">
              Adressfältet får inte vara tomt.
            </BFormInvalidFeedback>
            <BFormValidFeedback :state="addressValidation">
              Ser bra ut!
            </BFormValidFeedback>
          </BFormGroup>

          <BFormGroup id="input-group-5" label="Pris:" label-for="input-5">
            <BFormInput
              id="input-5"
              class="mb-2"
              type="number"
              v-model="price"
              placeholder="Pris"
            ></BFormInput>
          </BFormGroup>

          <BFormGroup id="input-group-6" label="Kategori:" label-for="input-6">
            <BFormSelect
              v-if="taskStore.categories"
              id="input-6"
              v-model="taskCategoryId"
              class="mb-2"
            >
              <BFormSelectOption :value="null">Kategori</BFormSelectOption>
              <BFormSelectOption
                :value="category.categoryId"
                :key="index"
                v-for="(category, index) in taskStore.categories"
                >{{ category.categoryName }}</BFormSelectOption
              >
            </BFormSelect>
          </BFormGroup>

          <BFormGroup
            id="input-group-7"
            label="Användare-Id:"
            label-for="input-7"
          >
            <BFormInput
              id="input-7"
              class="mb-2"
              type="number"
              v-model="userId"
              placeholder="Användare-id"
            ></BFormInput>
          </BFormGroup>

          <BButton @click="addNewTask" class="mt-4" variant="primary"
            >Skapa ny tjänst</BButton
          >
        </BForm>
      </BCol>
    </BRow>
  </BContainer>
</template>

<style scoped>
.row {
  justify-content: center; /*Justerar formuläret till mitten*/
}
#addTaskForm {
  /* background-color: grey;
  color: white; */
  border: 1px solid black;
  padding: 10px;
  border-radius: 5px;
}
</style>
