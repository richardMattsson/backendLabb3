<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useTaskStore } from '@/stores/taskStore';

const taskStore = useTaskStore();

onMounted(async () => {
  await taskStore.fetchCategories();
  console.log('Categories fetched:', taskStore.categories);
});

const title = ref(''),
  date = ref(null),
  description = ref(''),
  address = ref(''),
  price = ref(null),
  categories = ref(null),
  taskCategoryId = ref(null),
  userId = ref(null);

function addNewTask() {
  // console.log(
  //   title.value,
  //   date.value,
  //   description.value,
  //   address.value,
  //   price.value,
  //   taskCategoryId.value
  // );
  // skapar först en task och hämtar dess taskId
  // fetchTask(taskId)
  //
  // lägger till en ny rad i userTask-tabbelen
  // Behöver information om userId (den är beställare som default)
  // Om vi skapar en logga in funktion kan vi spara userId via Pinia
}
</script>

<template>
  <BContainer>
    <BRow>
      <BCol cols="6">
        <BForm id="addTaskForm">
          <h3>Lägg till en ny tjänst</h3>
          <BFormGroup id="input-group-1" label="Titel:" label-for="input-1">
            <BFormInput
              id="input-1"
              type="text"
              class="mb-2"
              v-model="title"
              placeholder="Titel"
              required
            />
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
            ></BFormInput>
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
              v-if="categories"
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

          <BButton @click="addNewTask" class="mt-4" variant="light"
            >Lägg till</BButton
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
  background-color: grey;
  color: white;
  padding: 10px;
  border-radius: 5px;
}
</style>
