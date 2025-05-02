<script setup>
import { onMounted } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const taskStore = useTaskStore();

onMounted(async () => {
  await taskStore.fetchAllTasks();
  console.log('Tasks fetched:', taskStore.tasks);
});
</script>

<template>
        <BCol>
          <h1 style="text-align: center">Tjänster</h1>
          <BCard
            v-for="task in taskStore.tasks"
            no-body
            class="overflow-hidden mt-4 mb-2"
            style="max-width: 540px; cursor: pointer"
          >
            <BRow class="g-0">
              <!-- <BCol md="4">
                <BCardImg alt="Image" class="rounded-0" />
              </BCol> -->
              <BCol md="8">
                <BCardBody :title="task.title">
                  <BCardText>
                    {{ task.description }}
                  </BCardText>
                </BCardBody>
              </BCol>
            </BRow>
          </BCard>
        </BCol>
</template>