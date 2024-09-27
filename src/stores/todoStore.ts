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
  const currentStatus = ref('')
  const selectedTodoItem = ref<ITodoItem | undefined>(undefined)

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

  function selectedTodo(todo: ITodoItem) {
    selectedTodoItem.value = todoList.find((item) => item.id === todo.id)
  }

  function deleteTodoItem(todoItem: ITodoItem) {
    // todoList içinden silme işlemi
    const updatedList = todoList.filter((item) => item.id !== todoItem.id)

    // reactive olan todoList'i güncelle
    todoList.length = 0
    todoList.push(...updatedList)
    // todoListTemp'i güncellenen todoList ile eşitle
    todoListTemp.value = [...todoList]
  }

  function toggleTodo(todo: ITodoItem) {
    const todoItem = todoList.find((item) => item.id === todo.id)
    if (todoItem) {
      todoItem.status = todo.status
    }
  }

  function findTodoItems(text: string, status: string) {
    // Tüm öğeleri tutan değişken
    let filteredList = [...todoList]

    // Status'a göre filtreleme yap
    if (status === 'complete') {
      // Status 'complete' olanları filtrele
      filteredList = filteredList.filter((item) => item.status)
    } else if (status === 'incomplete') {
      // Status 'incomplete' olanları filtrele
      filteredList = filteredList.filter((item) => item.status === false)
    }
    // Arama metnini kullanarak filtrele
    todoListTemp.value = filteredList.filter((item) =>
      item.text.toLocaleLowerCase().includes(text.toLowerCase())
    )
  }

  function getTodoList(status: IStatus) {
    currentStatus.value = status.name.toLowerCase()
    if (currentStatus.value === 'all') {
      // Eğer status 'all' ise, todoListTemp'i todoList ile güncelliyoruz (filtreleme yapmıyoruz)
      todoListTemp.value = [...todoList] // todoListTemp, todoList'in aynısı olur
    } else if (currentStatus.value === 'complete') {
      // Eğer status 'complete' ise, sadece status'u true olanları filtreleyip temp'e atıyoruz
      todoListTemp.value = todoList.filter((item) => item.status)
    } else if (currentStatus.value === 'incomplete') {
      // Eğer status 'incomplete' ise, sadece status'u false olanları filtreleyip temp'e atıyoruz
      todoListTemp.value = todoList.filter((item) => item.status === false)
    }
  }

  return {
    addTodo,
    toggleTodo,
    listStatus,
    todoListTemp,
    getTodoList,
    findTodoItems,
    currentStatus,
    deleteTodoItem,
    selectedTodoItem,
    selectedTodo
  }
})
