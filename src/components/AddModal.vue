<script setup lang="ts">
import { ref } from 'vue'
import { useMagicKeys, whenever } from '@vueuse/core'
import { useTodoStore } from '@/stores/todoStore'

const { escape } = useMagicKeys()

whenever(escape, () => {
  if (isChecked.value) {
    console.log('escape have been pressed')
    isChecked.value = false
  }
})

const todo = ref<string>('')
const isChecked = ref<boolean>(false)
const todoStore = useTodoStore()

function handleSubmit() {
  console.log('submit edildi')
  todoStore.addTodo(todo.value)
  todo.value = ''
  isChecked.value = false
}
</script>
<template>
  <input type="checkbox" id="modal_checkbox" v-model="isChecked" class="hidden" />
  <div class="container">
    <label for="modal_checkbox" class="absolute top-0 left-0 w-full h-full cursor-pointer"></label>
    <form @submit.prevent="handleSubmit" class="inner rounded-lg p-3 font-kanit flex flex-col">
      <h1 class="text-center text-2xl uppercase font-semibold text-black mb-5">New Note</h1>
      <input
        v-focus
        v-model="todo"
        type="text"
        class="outline-none focus:outline-none rounded-md w-full text-2xl p-2 border border-purple_01"
      />
      <div class="w-full flex flex-nowrap items-center justify-between mt-auto">
        <label class="bg-purple_01 text-white rounded-md px-4 py-2" for="modal_checkbox"
          >Cancel</label
        >

        <button
          type="submit"
          class="bg-purple_01 text-white rounded-md px-4 py-2"
          for="modal_checkbox"
        >
          Apply
        </button>
      </div>
    </form>
  </div>
</template>
<style scoped>
#modal_checkbox:checked + .container {
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
