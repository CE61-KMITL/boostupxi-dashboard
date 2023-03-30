export interface FormType {
  title: string;
  level: number;
  files: any[];
  tags: string[];
  hint: string;
  description: string;
  testcases: testcase[];
  solution_code: string;
}

export interface fileUpload {
  file: File;
  name: string;
}
export interface testcase {
  input: string;
  output: string;
  published: boolean;
}
