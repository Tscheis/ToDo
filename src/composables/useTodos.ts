import { ref, computed, watch } from 'vue'
import type { Todo, FilterType, Priority } from '../types'

const STORAGE_KEY = 'vue-todo-app'

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function useTodos() {
  const todos = ref<Todo[]>(loadTodos())
  const filter = ref<FilterType>('all')

  watch(
    todos,
    (val) => localStorage.setItem(STORAGE_KEY, JSON.stringify(val)),
    { deep: true }
  )

  const filteredTodos = computed(() => {
    switch (filter.value) {
      case 'active':
        return todos.value.filter((t) => !t.completed)
      case 'completed':
        return todos.value.filter((t) => t.completed)
      default:
        return todos.value
    }
  })

  const activeCount = computed(() => todos.value.filter((t) => !t.completed).length)
  const completedCount = computed(() => todos.value.filter((t) => t.completed).length)

  function addTodo(text: string, priority: Priority = 'medium') {
    const trimmed = text.trim()
    if (!trimmed) return
    todos.value.unshift({
      id: crypto.randomUUID(),
      text: trimmed,
      completed: false,
      createdAt: Date.now(),
      priority,
    })
  }

  function removeTodo(id: string) {
    todos.value = todos.value.filter((t) => t.id !== id)
  }

  function toggleTodo(id: string) {
    const todo = todos.value.find((t) => t.id === id)
    if (todo) todo.completed = !todo.completed
  }

  function updateTodo(id: string, text: string) {
    const todo = todos.value.find((t) => t.id === id)
    if (todo) todo.text = text.trim()
  }

  function clearCompleted() {
    todos.value = todos.value.filter((t) => !t.completed)
  }

  function toggleAll() {
    const allDone = todos.value.every((t) => t.completed)
    todos.value.forEach((t) => (t.completed = !allDone))
  }

  return {
    todos,
    filter,
    filteredTodos,
    activeCount,
    completedCount,
    addTodo,
    removeTodo,
    toggleTodo,
    updateTodo,
    clearCompleted,
    toggleAll,
  }
}
