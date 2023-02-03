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
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
      <div className="container mx-auto py-12 px-6 overflow-x-auto w-full">
        <table className="table table-zebra shadow-lg	z-20 w-full overflow-hidden rounded-lg text-sm text-gray-500 dark:text-gray-400">
          <thead className="table-header-group bg-gray-50 text-center text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th>
                Task ID
              </th>
              <th>
                Task Name
              </th>
              <th>
                Author
              </th>
              <th>
                Levels
              </th>
              <th>
                Tags
              </th>
              <th>
                Status
              </th>
              <th>
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
