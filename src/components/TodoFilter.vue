<script setup lang="ts">
import type { FilterType } from '../types'

defineProps<{
  filter: FilterType
  activeCount: number
  completedCount: number
}>()

const emit = defineEmits<{
  'update:filter': [filter: FilterType]
  clearCompleted: []
  toggleAll: []
}>()

const filters: { key: FilterType; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'active', label: '进行中' },
  { key: 'completed', label: '已完成' },
]
</script>

<template>
  <div class="filter-bar">
    <div class="filter-left">
      <button class="toggle-all-btn" @click="emit('toggleAll')" title="全部切换">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="9 11 12 14 22 4"></polyline>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
        </svg>
      </button>
      <span class="count-text">
        <strong>{{ activeCount }}</strong> 项待完成
      </span>
    </div>

    <div class="filter-tabs">
      <button
        v-for="f in filters"
        :key="f.key"
        class="filter-tab"
        :class="{ active: filter === f.key }"
        @click="emit('update:filter', f.key)"
      >
        {{ f.label }}
      </button>
    </div>

    <button
      v-if="completedCount > 0"
      class="clear-btn"
      @click="emit('clearCompleted')"
    >
      清除已完成 ({{ completedCount }})
    </button>
    <div v-else class="filter-right-placeholder"></div>
  </div>
</template>

<style scoped>
.filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 0;
  flex-wrap: wrap;
}

.filter-left {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 120px;
}

.toggle-all-btn {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg-input);
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.toggle-all-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.count-text {
  font-size: 13px;
  color: var(--text-muted);
  white-space: nowrap;
}

.count-text strong {
  color: var(--text-primary);
  font-size: 15px;
}

.filter-tabs {
  display: flex;
  gap: 4px;
  background: var(--bg-input);
  padding: 4px;
  border-radius: 10px;
  border: 1px solid var(--border);
}

.filter-tab {
  padding: 6px 14px;
  border-radius: 7px;
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-size: 13px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  font-weight: 500;
}

.filter-tab.active {
  background: var(--accent);
  color: white;
}

.filter-tab:not(.active):hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.clear-btn {
  font-size: 13px;
  color: var(--danger);
  border: 1px solid var(--danger-border);
  background: var(--danger-bg);
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  min-width: 120px;
  text-align: center;
}

.clear-btn:hover {
  background: var(--danger);
  color: white;
}

.filter-right-placeholder {
  min-width: 120px;
}
</style>
