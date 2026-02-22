<script setup lang="ts">
import { ref } from 'vue'
import type { Priority } from '../types'

const emit = defineEmits<{
  add: [text: string, priority: Priority]
}>()

const inputText = ref('')
const priority = ref<Priority>('medium')

function handleSubmit() {
  if (inputText.value.trim()) {
    emit('add', inputText.value, priority.value)
    inputText.value = ''
    priority.value = 'medium'
  }
}
</script>

<template>
  <div class="todo-input-wrapper">
    <div class="input-row">
      <input
        v-model="inputText"
        type="text"
        class="todo-input"
        placeholder="添加新待办事项..."
        @keydown.enter="handleSubmit"
        autofocus
      />
      <select v-model="priority" class="priority-select">
        <option value="low">低</option>
        <option value="medium">中</option>
        <option value="high">高</option>
      </select>
      <button class="add-btn" @click="handleSubmit">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.todo-input-wrapper {
  padding: 0 0 16px;
}

.input-row {
  display: flex;
  gap: 8px;
  align-items: center;
}

.todo-input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid var(--border);
  border-radius: 12px;
  font-size: 15px;
  background: var(--bg-input);
  color: var(--text-primary);
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
}

.todo-input::placeholder {
  color: var(--text-muted);
}

.todo-input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-glow);
}

.priority-select {
  padding: 12px 10px;
  border: 2px solid var(--border);
  border-radius: 12px;
  font-size: 14px;
  background: var(--bg-input);
  color: var(--text-primary);
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s;
}

.priority-select:focus {
  border-color: var(--accent);
}

.add-btn {
  width: 46px;
  height: 46px;
  border-radius: 12px;
  border: none;
  background: var(--accent);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, transform 0.1s;
  flex-shrink: 0;
}

.add-btn:hover {
  background: var(--accent-hover);
  transform: scale(1.05);
}

.add-btn:active {
  transform: scale(0.95);
}
</style>
