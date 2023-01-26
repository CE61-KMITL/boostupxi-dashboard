export interface TaskForm {
  id: number;
  taskName: string;
  author: string;
  lastEdited: string;
  status: string;
}

export interface FormType {
  task_name: string;
  task_level: number;
  task_tags: string;
  task_hint: string;
  task_desc: string;
  taskIO: { id: string; input: string; output: string }[];
  author: string;
}

export interface LoginForm {
    email: string;
    password: string;
}