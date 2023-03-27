import { NextPage } from 'next';
import { ITask } from '@/interface/task';
import { TaskTable } from '@/components';
import Layouts from '@/layouts/Layouts';
import { useState, useEffect } from 'react';
import axios from 'axios';

const TasksPage: NextPage = () => {
  const [taskData, setTaskData] = useState([]);

  const getTaskData = async () => {
    const token: string | null = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await axios.get(`/api/tasks`).then((res) => {
        setTaskData(res.data);
      });
    }
  };

  useEffect(() => {
    getTaskData();
  }, []);

  return (
    <Layouts>
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
      <div className="container mx-auto mt-20 overflow-auto rounded-lg py-12 px-6">
        <table className="mx-auto my-auto w-full text-center text-sm text-gray-500 shadow-md dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Task Name
              </th>
              <th scope="col" className="px-6 py-3">
                Task Description
              </th>
              <th scope="col" className="px-6 py-3">
                Author
              </th>
              <th scope="col" className="px-6 py-3">
                Level
              </th>
              <th scope="col" className="px-6 py-3">
                Task Tags
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {taskData &&
              taskData.map((val: ITask) => (
                <TaskTable
                  key={val._id}
                  _id={val._id}
                  title={val.title}
                  description={val.description}
                  author={val.author}
                  level={val.level}
                  tags={val.tags}
                  hint={val.hint}
                  files={val.files}
                  testcases={val.testcases}
                  status={val.status}
                />
              ))}
          </tbody>
        </table>
      </div>
    </Layouts>
  );
};

export default TasksPage;
