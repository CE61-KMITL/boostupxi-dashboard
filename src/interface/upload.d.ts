export interface IForm {
  title: string;
  level: number;
  files: IFiles[];
  tags: string[];
  hint: string;
  description: string;
  testcases: ITestCases[];
  solution_code: string;
}

export interface IFormUpload {
  title: string;
  level: number;
  files: string[];
  tags: string[];
  hint: string;
  description: string;
  testcases: ITestCases[];
  solution_code: string;
}

export interface IFileUpload {
  file: File;
  name: string;
}
export interface ITestCases {
  input: string;
  output: string;
  published: boolean;
}

export interface IFiles {
  url: string;
  key: string;
}
