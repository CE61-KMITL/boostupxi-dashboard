export interface ITask {
  _id: Key | null | undefined;
  title: string;
  description: string;
  author:
    | {
        id: string;
        username: string;
      }
    | any;
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
