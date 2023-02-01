import TaskList from '@/constants/task';
import { TaskForm } from '@/interface/task';
import { NextPage } from 'next';
import TaskTable from '@/components/TaskTable';
import Navbar from '@/components/Navbar';
import { Fragment } from 'react';

const TasksPage: NextPage = () => {
  return (
    <Fragment>
      <Navbar />
      <div className="gradient-radial-bg background flex min-h-screen grow items-center justify-center">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
        <div className="container py-12 px-6">
          <div className="block rounded-lg bg-white shadow-lg">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="text-center">
                    <th scope="col" className="px-6 py-3">
                      Task ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Task Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Author
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Levels
                    </th>
                    <th scope="col" className=" px-6 py-3">
                      Tags
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-9 py-3">
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
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TasksPage;
