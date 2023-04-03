import { IAuthor, ITaskByID } from '@/interface/task';
import { IForm } from '@/interface/upload';

interface TaskForm {
  index?: number;
  _id: string;
  title: string;
  author: IAuthor;
  level: number;
  tags: string[];
  status: string;
}

interface IComment {
  id: number;
  auditor: string;
  comment: string;
  date: string;
}

export const TaskList: TaskForm[] = [
  {
    _id: '1',
    title: 'Direct Proof',
    author: {
      username: '1tpp',
      id: '1',
    },
    level: 1,
    tags: ['Discrete Structure', 'Computer Engineer'],
    status: 'queue',
  },
];

export const InitialTaskBtyId: ITaskByID = {
  _id: '',
  title: '',
  description: '',
  author: {
    id: '',
    username: '',
    _id: '',
  },
  level: 0,
  tags: [],
  hint: '',
  files: [],
  testcases: [],
  draft: false,
  status: '',
  solution_code: '',
  createdAt: '',
  updatedAt: '',
  __v: 0,
};

export let InitialForm: IForm = {
  title: '',
  level: 1,
  tags: [],
  hint: '',
  description: '',
  files: [],
  testcases: [{ input: '', output: '', published: false }],
  solution_code: '',
};

export const AvariablesTags: string[] = [
  'Algorithm',
  'Basic I/O',
  'Data Types',
  'Operators',
  'Conditional Statement',
  'Loops',
  'Arrays and Function',
  'Reverse Engineer',
  'CTF',
  'Crypto',
];

export const CommentData: IComment[] = [
  {
    id: 1,
    auditor: 'Khris Bharmmanao',
    comment: 'Good',
    date: '1-10-2023',
  },
  {
    id: 2,
    auditor: 'Khris Bharmmanao',
    comment: 'Very Good',
    date: '1-10-2023',
  },
  {
    id: 3,
    auditor: 'Khris Bharmmanao',
    comment: 'Very Good',
    date: '1-10-2023',
  },
  {
    id: 4,
    auditor: 'Khris Bharmmanao',
    comment: 'Very Good',
    date: '1-10-2023',
  },
];
