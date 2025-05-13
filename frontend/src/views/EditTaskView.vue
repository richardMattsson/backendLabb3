<script setup>
import { computed, ref, onMounted } from "vue";
import { useTaskStore } from "@/stores/taskStore";
import { useLoginStore } from "@/stores/loginStore";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const taskStore = useTaskStore();
const loginStore = useLoginStore();
const taskId = ref(null);
const task = ref(null);
const title = ref("");
const date = ref(null);
const description = ref("");
const address = ref("");
const price = ref(null);
const taskCategoryId = ref(null);

onMounted(async () => {
  taskId.value = route.params.id;
  await taskStore.fetchTask(taskId.value);
  task.value = taskStore.task[0];
  await taskStore.fetchCategories();
  console.log(task.value);
  title.value = task.value.title;
  description.value = task.value.description;
  date.value = task.value.date;
  address.value = task.value.address;
  price.value = task.value.price;
  taskCategoryId.value = task.value.taskCategoryId;

  //console.log('Categories fetched:', taskStore.categories);
});

// watch(
//   () => taskStore.taskDetails,
//   (newValue, oldValue) => {
//     task.value = newValue[0];
//   }
// );

const titleValidation = computed(() => title.value.length > 0);
const addressValidation = computed(() => address.value.length > 0);

async function updateTask(id) {
  const task = {
    taskId: id,
    title: title.value,
    description: description.value,
    date: date.value,
    address: address.value,
    price: price.value,
    taskCategoryId: taskCategoryId.value,
    status: "New",
    dateCreated: Date.now(),
  };
  console.log(task);
  try {
    const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${loginStore.token}`,
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      console.log(response);
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Servern svarade med:", result);

    router.push({ name: "TaskView", params: { taskId: id } });
  } catch (error) {
    console.log("Något gick fel", error.message);
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
          @click="
            router.push({
              path: '/login',
              query: { endpoint: route.fullPath },
            })
          "
          class="mt-4"
          variant="success"
          v-if="!loginStore.isLoggedIn"
          >Logga in</BButton
        >
        <BForm id="addTaskForm" v-if="loginStore.isLoggedIn">
          <h3>Uppdatera tjänst</h3>
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
              type="range"
              min="0"
              max="5000"
              v-model="price"
              placeholder="Pris"
            >
            </BFormInput>

            <BFormInput
              class="mb-2"
              type="number"
              v-model="price"
              placeholder="Pris"
            ></BFormInput>
            <div class="mt-2">Pris: {{ price }}</div>
          </BFormGroup>

          <BButton @click="updateTask(taskId)" class="mt-4" variant="primary"
            >Uppdatera tjänst</BButton
          >
        </BForm>
      </BCol>
    </BRow>
  </BContainer>
</template>

<style scoped>
.row {
  justify-content: center;
  /*Justerar formuläret till mitten*/
}

#addTaskForm {
  /* background-color: grey;
  color: white; */
  border: 1px solid black;
  padding: 10px;
  border-radius: 5px;
}
</style>
