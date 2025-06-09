import { Subtask } from "../../subtask/types/types";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  subtasks?: Subtask[];
}