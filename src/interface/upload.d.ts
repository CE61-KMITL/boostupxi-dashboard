export interface FormType {
  task_name: string;
  task_level: number;
  files: any[];
  task_tags: string[];
  task_hint: string;
  task_desc: string;
  taskIO: { id: string; input: string; output: string }[];
  author: string;
}

export interface fileUpload {
  file: File;
  name: string;
}
