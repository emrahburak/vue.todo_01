<script setup lang="ts">
import { useTodoStore } from '@/stores/todoStore'
import { watch } from 'vue'
import { ref } from 'vue'
const todoStore = useTodoStore()
const selectedtStatus = ref(todoStore.listStatus[0].id)

todoStore.currentStatus = todoStore.listStatus[0].name

console.log('Test: ', todoStore.currentStatus)

watch(selectedtStatus, (newStatus) => {
  const statusObj = todoStore.listStatus.find((status) => status.id === newStatus)
  if (statusObj) {
    todoStore.currentStatus = statusObj?.name
    todoStore.getTodoList(statusObj)
  }
})
</script>

<template>
  <div class="relative inline-block">
    <select
      class="py-1.5 px-2 appearance-none border bg-purple_01 rounded-md focus:outline-none h-12 w-full text-white uppercase mr-5"
      v-model="selectedtStatus"
    >
      <option v-for="status in todoStore.listStatus" :key="status.id" :value="status.id">
        {{ status.name }}
      </option>
    </select>
    <font-awesome-icon :icon="['fas', 'angle-down']" class="absolute right-2 top-1/3 text-white" />
  </div>
</template>
