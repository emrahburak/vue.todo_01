<script setup lang="ts">
import { ref } from 'vue'
const todo = ref<string>('')
import { useTodoStore } from '@/stores/todoStore'

const todoStore = useTodoStore()
function handleSubmit() {
  console.log('submit edildi')
  todoStore.addTodo(todo.value)
  todo.value = ''
}
</script>
<template>
  <form @submit.prevent="handleSubmit">
    <div
      class="flex flex-row flex-nowrap items-center justify-start border border-purple_01 rounded-md h-12"
    >
      <button class="pl-3">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
      </button>

      <input type="text" class="flex-grow outline-none pl-3 text-2xl" v-model="todo" />
    </div>
  </form>
</template>
