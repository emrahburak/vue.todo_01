<script setup lang="ts">
import TaskInput from '@/components/TaskInput.vue'
import TodoList from '@/components/TodoList.vue'
import TaskStatus from '@/components/TaskStatus.vue'
import AddTodo from '@/components/AddTodo.vue'
import AddModal from '@/components/AddModal.vue'
import DeleteModal from '@/components/DeleteModal.vue'
</script>

<template>
  <main class="pt-5 font-kanit mx-auto space-y-4 mt-7">
    <h1 class="text-center text-2xl uppercase font-semibold">Todo List</h1>
    <div class="lg:w-1/2 mx-auto flex flex-col gap-6 px-3 h-96">
      <div class="flex lg:flex-row sm:flex-col items-center justify-start gap-4">
        <div class="flex-grow">
          <task-input />
        </div>
        <div class="sm:shrink-0">
          <task-status />
        </div>
      </div>
      <div>
        <todo-list />
      </div>
      <div class="text-end mt-auto">
        <add-todo />
      </div>
    </div>
  </main>
  <div class="w-full">
    <add-modal />
  </div>
  <div class="w-full">
    <delete-modal />
  </div>
</template>
