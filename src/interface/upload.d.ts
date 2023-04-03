export interface IForm {
  title: string;
  level: number;
  files: any[]; // TODO: files type
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
