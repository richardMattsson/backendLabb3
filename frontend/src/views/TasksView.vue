<script setup>
import { onMounted } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import { useRouter } from 'vue-router';
import TaskList from '@/components/TaskList.vue'

const router = useRouter();
const taskStore = useTaskStore();

onMounted(async () => {
  // await taskStore.fetchAllTasks();
  // console.log('Tasks fetched:', taskStore.tasks);
  await taskStore.fetchCategories();
  console.log('Categories fetched:', taskStore.categories);
});

function sendToTasksInCategoryView(id, name) {
  console.log(id);
  router.push({
    name: 'TasksInCategory',
    params: { categoryId: id },
    query: { endpoint: name },
  });
}
</script>

<template>
  <article>
    <BContainer id="tasks-container">
      <BRow align-h="center">
        <BCol>
          <h1 style="text-align: center; padding-bottom: 1em;">Senaste tjänster</h1>
          <TaskList />
        </BCol>
        <BCol>
          <BContainer>
            <BRow>
              <h1 style="text-align: center; padding-bottom: 1em;">Kategorier</h1>
              <BCol class="mt-4 mb-2" cols="6" lg="4" v-for="category in taskStore.categories"
                :key="category.categoryId">
                <BCard overlay :title="category.categoryName" :img-src="category.categoryImage" img-alt="Image"
                  tag="figure" style="max-width: 20rem; cursor: pointer" @click="
                    sendToTasksInCategoryView(
                      category.categoryId,
                      category.categoryName
                    )
                    ">
                </BCard>
              </BCol>
            </BRow>
          </BContainer>
        </BCol>
      </BRow>
    </BContainer>
  </article>
</template>

<style scoped>
/* article {
  width: 100vw;
}

#tasks-container {
  width: 100vw;
} */
</style>
