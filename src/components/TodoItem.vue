<script setup lang="ts">
import { useTodoStore, type ITodoItem } from '@/stores/todoStore'
import { ref } from 'vue'

const todoStore = useTodoStore()
const isLine = ref(false)

const props = defineProps<{ todo: ITodoItem }>()

function handleChange(event: Event) {
  const isChecked = (event.target as HTMLInputElement).checked
  todoStore.toggleTodo({ ...props.todo, status: isChecked })
  isLine.value = isChecked
}

function handleDelete(todoItem: ITodoItem) {
  console.log('click edildi', todoItem)
  todoStore.selectedTodo(todoItem)
}
</script>
<template>
  <label
    class="container relative border-b border-purple_01"
    :class="{ 'line-through text-gray_01 ': isLine }"
    >{{ todo.text }}
    <input type="checkbox" :checked="todo.status" @change="handleChange" />
    <span class="checkmark border border-purple_01"></span>
    <label
      class="h-12 text-gray_01 absolute right-0 cursor-pointer"
      for="delete_modal_checkbox"
      @click="handleDelete(todo)"
    >
      <font-awesome-icon :icon="['fas', 'trash-can']" />
    </label>
  </label>
</template>

<style scoped>
/* Customize the label (the container) */
.container {
  display: block;
  position: relative;
  padding-left: 45px;
  padding-bottom: 0.4rem;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #9333ea;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: '';
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
