export interface ITask {
  _id?: string;
  title: string;
  description: string;
  author: string;
  level: number;
  tags: string[] | null;
  hint: string;
  files?: IFiles[] | null;
  testcases?: ITestCases[] | null;
  draft?: boolean;
  status: string;
}
export interface IFiles {
  url: string;
  key: string;
}
export interface ITestCases {
  input: string;
  output: string;
  published: boolean;
}
