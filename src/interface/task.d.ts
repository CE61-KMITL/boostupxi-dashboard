export interface ITask {
  _id: Key | null | undefined;
  title: string;
  description: string;
  author: author | any;
  level: number;
  tags: string[] | null;
  hint: string;
  files?: IFiles[] | null;
  testcases?: ITestCases[] | null;
  draft?: boolean;
  status: string;
  solution_code: string;

  status: 'queue';
  created_at: string | null;
  updated_at: string | null;
  draft: boolean | null;
  __v: number;
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

export interface author {
  username: string;
  id: string;
}
