<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import { watch } from 'vue'
import { reactive } from 'vue'
import { computed } from 'vue'

const todoStore = useTodoStore()
const todo = ref<string>('')
const holderList = ref<string[]>(['search todo..', 'please add some todo before search..'])

const listLength = computed(() => todoStore.todoListTemp.length)

watch(todo, (newValue) => {
  if (listLength.value > 0) {
    todoStore.findTodoItems(newValue, todoStore.currentStatus)
  }
})
</script>
<template>
  <form>
    <div
      class="flex flex-row flex-nowrap items-center justify-start border border-purple_01 rounded-md h-12"
      :class="listLength === 0 ? 'bg-gray-200' : ''"
    >
      <button class="pl-3">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
      </button>

      <input
        type="text"
        class="flex-grow outline-none pl-3 text-2xl"
        v-model="todo"
        v-focus
        :placeholder="listLength > 0 ? holderList[0] : holderList[1]"
        :disabled="listLength === 0 ? true : false"
      />
    </div>
  </form>
</template>
