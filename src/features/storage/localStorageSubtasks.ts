import { Subtask } from "../subtask/types/types";

export function getSubtasks(todoId: number): Subtask[] {
  const key = `subtasks_${todoId}`;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
}

export function setSubtasksCompleted(todoId: number, completed: boolean) {
  const key = `subtasks_${todoId}`;
  const subtasks = getSubtasks(todoId);
  const updated = subtasks.map(sub => ({ ...sub, completed }));
  localStorage.setItem(key, JSON.stringify(updated));
}
