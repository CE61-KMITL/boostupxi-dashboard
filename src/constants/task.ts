interface TaskForm {
  index?: number;
  _id: string;
  title: string;
  author: string;
  level: number;
  tags: string[];
  status: string;
}

const TaskList: TaskForm[] = [
  {
    _id: '1',
    title: 'Direct Proof',
    author: 'Thanunchai Threepak',
    level: 1,
    tags: ['Discrete Structure', 'Computer Engineer'],
    status: 'queue',
  },
  {
    _id: '2',
    title: 'Finite State Machine',
    author: 'Thana Hongsuwan',
    level: 2,
    tags: ['Arduino', 'ITC'],
    status: 'approve',
  },
  {
    _id: '3',
    title: 'Try hack me',
    author: '1tpp',
    level: 3,
    tags: ['ctf', 'reverse engineer', 'Programming'],
    status: 'approve',
  },
  {
    _id: '4',
    title: 'Clone Facebook',
    author: 'khris-xp',
    level: 2,
    tags: ['Web Dev', 'TypeScript'],
    status: 'reject',
  },
  {
    _id: '5',
    title: 'Happy Hacking',
    author: 'kittonn',
    level: 3,
    tags: ['ctf', 'Programming'],
    status: 'queue',
  },
];

export default TaskList;
