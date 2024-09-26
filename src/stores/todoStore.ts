import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'

export interface ITodoItem {
  id: number
  text: string
  status: boolean
}

export interface IStatus {
  id: number
  name: string
}

const initialStatus: IStatus[] = [
  { id: 1, name: 'all' },
  { id: 2, name: 'complete' },
  { id: 3, name: 'incomplete' }
]

export const useTodoStore = defineStore('todo', () => {
  const todoList = reactive<ITodoItem[]>([])
  const todoListTemp = ref([...todoList]) // Geçici liste

  const listStatus = reactive(initialStatus)
  let idCounter = 1

  function addTodo(todoItem: string) {
    todoList.push({
      id: idCounter++,
      text: todoItem,
      status: false
    })

    todoListTemp.value = [...todoList]
  }

  function toggleTodo(todo: ITodoItem) {
    const todoItem = todoList.find((item) => item.id === todo.id)
    if (todoItem) {
      todoItem.status = todo.status
    }
  }

  function getTodoList(status: IStatus) {
    const currentStatus = status.name.toLowerCase()
    if (currentStatus === 'all') {
      // Eğer status 'all' ise, todoListTemp'i todoList ile güncelliyoruz (filtreleme yapmıyoruz)
      console.log(currentStatus, 'all')
      todoListTemp.value = [...todoList] // todoListTemp, todoList'in aynısı olur
    } else if (currentStatus === 'complete') {
      console.log(currentStatus, 'complete')
      // Eğer status 'complete' ise, sadece status'u true olanları filtreleyip temp'e atıyoruz
      todoListTemp.value = todoList.filter((item) => item.status)
    } else if (currentStatus === 'incomplete') {
      console.log(currentStatus, 'incomplete')
      // Eğer status 'incomplete' ise, sadece status'u false olanları filtreleyip temp'e atıyoruz
      todoListTemp.value = todoList.filter((item) => item.status === false)
    }
  }

  return {
    addTodo,
    toggleTodo,
    listStatus,
    todoListTemp,
    getTodoList
  }
})
