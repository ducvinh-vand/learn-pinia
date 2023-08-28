<script setup lang="ts">
import { ref } from 'vue'
import TaskDetails from './components/TaskDetails.vue'
import { useTaskStore } from './stores/TaskStore'
import TaskForm from './components/TaskForm.vue'
import { storeToRefs } from 'pinia'

const taskStore = useTaskStore()
const { tasks, isLoading, favs, favCount, totalCount } = storeToRefs(taskStore)

const filter = ref('all')
taskStore.getTasks()
</script>

<template>
  <main>
    <!-- heading -->
    <header>
      <img
        src="./assets/pinia-logo.svg"
        alt="pinia logo"
      />
      <h1>Pinia Tasks</h1>
    </header>

    <!-- new task form -->
    <div class="new-task-form">
      <TaskForm />
    </div>

    <!-- filter -->
    <nav class="filter">
      <button
        @click="filter = 'all'"
        :style="{ background: filter === 'all' ? 'cyan' : '#fff' }"
      >
        All Task
      </button>
      <button
        @click="filter = 'favs'"
        :style="{ background: filter === 'favs' ? 'cyan' : '#fff' }"
      >
        Favs Task
      </button>
    </nav>

    <!-- filter -->
    <div
      class="loading"
      v-if="isLoading"
    >
      Loading Task...
    </div>

    <!-- task list -->
    <div
      class="task-list"
      v-if="filter === 'all' && !isLoading"
    >
      <p>Your have {{ totalCount }} tasks left todo</p>
      <div
        v-for="task in tasks"
        :key="task.id"
      >
        <TaskDetails :task="task" />
      </div>
    </div>
    <div
      class="task-list"
      v-if="filter === 'favs' && !isLoading"
    >
      <p>Your have {{ favCount }} tasks left todo</p>
      <div
        v-for="task in favs"
        :key="task.id"
      >
        <TaskDetails :task="task" />
      </div>
    </div>

    <button @click="taskStore.$patch({ tasks: [] })">Reset Store</button>
  </main>
</template>
