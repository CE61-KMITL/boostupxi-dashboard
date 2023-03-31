import { author } from '@/interface/task';

interface TaskForm {
  index?: number;
  _id: string;
  title: string;
  author: author;
  level: number;
  tags: string[];
  status: string;
}

const TaskList: TaskForm[] = [
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

export default TaskList;
