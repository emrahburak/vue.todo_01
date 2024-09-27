<script setup lang="ts">
import { useTodoStore } from '@/stores/todoStore'
import TodoItem from './TodoItem.vue'
const todoStore = useTodoStore()
</script>

<template>
  <ul v-if="todoStore.todoListTemp.length > 0">
    <li v-for="todo in todoStore.todoListTemp" :key="todo.id">
      <todo-item :todo="todo" />
    </li>
  </ul>
  <div v-else class="flex flex-col items-center justify-center mt-7 space-y-1">
    <img src="/src/assets/empty.png" alt="toto list" />
    <p>Empty..</p>
  </div>
</template>
