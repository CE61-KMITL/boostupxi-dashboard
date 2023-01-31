import { NextPage } from 'next';
import { Fragment } from 'react';

// Fake Data
import TaskList from '@/constants/task';

import { TaskForm } from '@/interface/task';
import Navbar from '@/components/Navbar';
import TaskTable from '@/components/TaskTable';

const TasksPage: NextPage = () => {
  return (
    <Fragment>
      <Navbar />
      <div className="container mx-auto flex justify-center items-baseline mt-8 gradient-radial-bg grow min-h-screen">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 z-20 rounded-lg overflow-hidden">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-center">
              <th scope="col" className='py-3 px-2'>
                Task ID
              </th>
              <th scope="col" className='py-3 px-2'>
                Task Name
              </th>
              <th scope="col" className='py-3 px-2'>
                Author
              </th>
              <th scope="col" className='py-3 px-2'>
                Levels
              </th>
              <th scope="col" className='py-3 px-2'>
                Tags
              </th>
              <th scope="col" className='py-3 px-2'>
                Status
              </th>
              <th scope="col" className='py-3 px-2'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {TaskList &&
              TaskList.map((val: TaskForm, index: number) => (
                <TaskTable
                  key={index}
                  id={val.id}
                  title={val.title}
                  author={val.author}
                  level={val.level}
                  tags={val.tags}
                  status={val.status}
                />
              ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default TasksPage;
