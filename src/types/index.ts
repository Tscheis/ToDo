export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: number
  priority: Priority
}

export type Priority = 'low' | 'medium' | 'high'

export type FilterType = 'all' | 'active' | 'completed'
