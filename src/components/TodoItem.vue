<script setup lang="ts">
import { ref, nextTick } from 'vue'
import type { Todo } from '../types'

const props = defineProps<{ todo: Todo }>()

const emit = defineEmits<{
  toggle: [id: string]
  remove: [id: string]
  update: [id: string, text: string]
}>()

const editing = ref(false)
const editText = ref('')
const editInput = ref<HTMLInputElement | null>(null)

async function startEdit() {
  editing.value = true
  editText.value = props.todo.text
  await nextTick()
  editInput.value?.focus()
  editInput.value?.select()
}

function confirmEdit() {
  if (editText.value.trim()) {
    emit('update', props.todo.id, editText.value)
  }
  editing.value = false
}

function cancelEdit() {
  editing.value = false
}

const priorityLabels = { low: '低', medium: '中', high: '高' }
</script>

<template>
  <li class="todo-item" :class="{ completed: todo.completed, editing }">
    <div class="item-main">
      <button class="check-btn" @click="emit('toggle', todo.id)" :aria-label="todo.completed ? '取消完成' : '标记完成'">
        <svg v-if="todo.completed" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </button>

      <span
        v-if="!editing"
        class="todo-text"
        @dblclick="startEdit"
        :title="'双击编辑'"
      >{{ todo.text }}</span>

      <input
        v-else
        ref="editInput"
        v-model="editText"
        class="edit-input"
        @keydown.enter="confirmEdit"
        @keydown.esc="cancelEdit"
        @blur="confirmEdit"
      />

      <span class="priority-badge" :class="todo.priority">{{ priorityLabels[todo.priority] }}</span>

      <button class="edit-btn" @click="startEdit" v-if="!editing" aria-label="编辑">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
      </button>

      <button class="delete-btn" @click="emit('remove', todo.id)" aria-label="删除">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
          <path d="M10 11v6M14 11v6"></path>
          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
        </svg>
      </button>
    </div>
  </li>
</template>

<style scoped>
.todo-item {
  border-radius: 12px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  transition: box-shadow 0.2s, transform 0.15s, opacity 0.2s;
  overflow: hidden;
}

.todo-item:hover {
  box-shadow: 0 4px 16px var(--shadow);
  transform: translateY(-1px);
}

.todo-item.completed {
  opacity: 0.6;
}

.item-main {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 14px;
}

.check-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid var(--border-check);
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: border-color 0.2s, background 0.2s;
  color: white;
}

.todo-item.completed .check-btn {
  background: var(--accent);
  border-color: var(--accent);
}

.check-btn:hover {
  border-color: var(--accent);
}

.todo-text {
  flex: 1;
  font-size: 15px;
  color: var(--text-primary);
  cursor: pointer;
  word-break: break-word;
  line-height: 1.4;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: var(--text-muted);
}

.edit-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 15px;
  background: transparent;
  color: var(--text-primary);
  border-bottom: 2px solid var(--accent);
  padding-bottom: 2px;
}

.priority-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 20px;
  flex-shrink: 0;
}

.priority-badge.low {
  background: var(--priority-low-bg);
  color: var(--priority-low);
}

.priority-badge.medium {
  background: var(--priority-medium-bg);
  color: var(--priority-medium);
}

.priority-badge.high {
  background: var(--priority-high-bg);
  color: var(--priority-high);
}

.edit-btn,
.delete-btn {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  opacity: 0;
  transition: opacity 0.15s, background 0.15s, color 0.15s;
  flex-shrink: 0;
}

.todo-item:hover .edit-btn,
.todo-item:hover .delete-btn {
  opacity: 1;
}

.edit-btn:hover {
  background: var(--bg-hover);
  color: var(--accent);
}

.delete-btn:hover {
  background: var(--danger-bg);
  color: var(--danger);
}
</style>
