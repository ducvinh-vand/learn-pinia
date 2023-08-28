import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref()
  const isLoading = ref(false)

  const favs = computed(() => tasks.value.filter((t) => t.isFav))
  const favCount = computed(() =>
    tasks.value.reduce((init, curr) => {
      return curr.isFav ? (init += 1) : init
    }, 0),
  )
  const totalCount = computed(() => tasks.value.length)

  async function getTasks() {
    isLoading.value = true
    const data = await (await fetch('http://localhost:8000/tasks')).json()
    await new Promise((res) => setTimeout(res, 1000))
    tasks.value = data

    isLoading.value = false
  }

  async function addTask(task) {
    tasks.value.push(task)

    const res = await fetch('http://localhost:8000/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (res.error) {
      console.log(res)
    }
  }

  async function deleteTask(id) {
    tasks.value = tasks.value.filter((t) => t.id !== id)

    const res = await fetch(`http://localhost:8000/tasks/${id}`, {
      method: 'DELETE',
    })

    if (res.error) {
      console.log(res)
    }
  }

  async function toggleFav(id) {
    const task = tasks.value.find((t) => t.id === id)
    task.isFav = !task.isFav

    const res = await fetch(`http://localhost:8000/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ isFav: task.isFav }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (res.error) {
      console.log(res)
    }
  }

  return {
    tasks,
    isLoading,
    favs,
    favCount,
    totalCount,
    getTasks,
    addTask,
    deleteTask,
    toggleFav,
  }
})
