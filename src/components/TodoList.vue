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
</template>
