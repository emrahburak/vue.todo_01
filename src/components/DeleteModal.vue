<script setup lang="ts">
import { ref } from 'vue'
import { useMagicKeys, whenever } from '@vueuse/core'
import { useTodoStore, type ITodoItem } from '@/stores/todoStore'
import type { UnaryExpression } from 'typescript'
const todoStore = useTodoStore()
const { escape } = useMagicKeys()

whenever(escape, () => {
  if (isChecked.value) {
    console.log('escape have been pressed')
    isChecked.value = false
  }
})

const isChecked = ref<boolean>(false)

function handleDelete(todo: ITodoItem | undefined) {
  console.log('submit edildi')
  if (todo) {
    todoStore.deleteTodoItem(todo)
    isChecked.value = false
  }
}
</script>
<template>
  <input type="checkbox" id="delete_modal_checkbox" v-model="isChecked" class="hidden" />
  <div class="container">
    <label
      for="delete_modal_checkbox"
      class="absolute top-0 left-0 w-full h-full cursor-pointer"
    ></label>
    <div class="inner rounded-lg p-3 font-kanit flex flex-col">
      <h1 class="text-center text-2xl uppercase font-semibold text-black mb-5">Are you sure?</h1>
      <p class="text-2xl text-center">{{ todoStore.selectedTodoItem?.text }}</p>
      <div class="w-full flex flex-nowrap items-center justify-between mt-auto">
        <label class="bg-purple_01 text-white rounded-md px-4 py-2" for="delete_modal_checkbox"
          >Cancel</label
        >
        <button
          type="button"
          class="bg-purple_01 text-white rounded-md px-4 py-2"
          @click="handleDelete(todoStore.selectedTodoItem)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
#delete_modal_checkbox:checked + .container {
  visibility: visible;
  opacity: 0.9;
}
.container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: black;
  opacity: 0;
  z-index: 2;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: hidden;
  transition: all 400ms ease-in-out;
}
.inner {
  height: 300px;
  width: 500px;
  background-color: white;
  z-index: 40;
}
</style>
