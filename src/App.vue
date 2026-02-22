<script setup lang="ts">
import { computed } from 'vue'
import TodoInput from './components/TodoInput.vue'
import TodoItem from './components/TodoItem.vue'
import TodoFilter from './components/TodoFilter.vue'
import { useTodos } from './composables/useTodos'
import type { Priority } from './types'

const {
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
  todos,
} = useTodos()

const isEmpty = computed(() => filteredTodos.value.length === 0)
const totalCount = computed(() => todos.value.length)
</script>

<template>
  <div class="app-bg">
    <main class="app-container">
      <header class="app-header">
        <div class="logo">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 11l3 3L22 4"></path>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
          </svg>
        </div>
        <div>
          <h1 class="app-title">待办事项</h1>
          <p class="app-subtitle">共 {{ totalCount }} 项，{{ activeCount }} 项待完成</p>
        </div>
      </header>

      <TodoInput @add="(text: string, priority: Priority) => addTodo(text, priority)" />

      <TodoFilter
        v-model:filter="filter"
        :active-count="activeCount"
        :completed-count="completedCount"
        @clear-completed="clearCompleted"
        @toggle-all="toggleAll"
      />

      <div class="divider"></div>

      <TransitionGroup name="list" tag="ul" class="todo-list">
        <TodoItem
          v-for="todo in filteredTodos"
          :key="todo.id"
          :todo="todo"
          @toggle="toggleTodo"
          @remove="removeTodo"
          @update="updateTodo"
        />
      </TransitionGroup>

      <div v-if="isEmpty" class="empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.3">
          <path d="M9 11l3 3L22 4"></path>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
        </svg>
        <p>{{ totalCount === 0 ? '暂无待办，添加第一条吧！' : '该分类下暂无内容' }}</p>
      </div>
    </main>
  </div>
</template>

<style>
:root {
  --accent: #6366f1;
  --accent-hover: #4f46e5;
  --accent-glow: rgba(99, 102, 241, 0.15);
  --danger: #ef4444;
  --danger-bg: rgba(239, 68, 68, 0.08);
  --danger-border: rgba(239, 68, 68, 0.2);
  --priority-low: #22c55e;
  --priority-low-bg: rgba(34, 197, 94, 0.12);
  --priority-medium: #f59e0b;
  --priority-medium-bg: rgba(245, 158, 11, 0.12);
  --priority-high: #ef4444;
  --priority-high-bg: rgba(239, 68, 68, 0.12);

  /* Light theme */
  --bg: #f1f5f9;
  --bg-card: #ffffff;
  --bg-input: #f8fafc;
  --bg-hover: #f1f5f9;
  --text-primary: #1e293b;
  --text-muted: #94a3b8;
  --border: #e2e8f0;
  --border-check: #cbd5e1;
  --shadow: rgba(0, 0, 0, 0.08);
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0f172a;
    --bg-card: #1e293b;
    --bg-input: #1e293b;
    --bg-hover: #334155;
    --text-primary: #f1f5f9;
    --text-muted: #64748b;
    --border: #334155;
    --border-check: #475569;
    --shadow: rgba(0, 0, 0, 0.4);
  }
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background: var(--bg);
  color: var(--text-primary);
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

.app-bg {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 40px 16px;
}

.app-container {
  width: 100%;
  max-width: 640px;
  display: flex;
  flex-direction: column;
  gap: 0;
  background: var(--bg-card);
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 8px 40px var(--shadow);
  border: 1px solid var(--border);
  height: fit-content;
}

.app-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
  color: var(--accent);
}

.logo {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: var(--accent-glow);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.app-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.2;
}

.app-subtitle {
  font-size: 13px;
  color: var(--text-muted);
  margin-top: 2px;
}

.divider {
  height: 1px;
  background: var(--border);
  margin: 12px 0;
}

.todo-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 0;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 48px 16px;
  color: var(--text-muted);
  font-size: 14px;
}

/* List transition animations */
.list-enter-active,
.list-leave-active {
  transition: all 0.25s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(-12px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.list-move {
  transition: transform 0.25s ease;
}

.list-leave-active {
  position: absolute;
  width: calc(100% - 56px);
}
</style>
