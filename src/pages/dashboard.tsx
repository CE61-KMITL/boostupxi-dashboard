import { NextPage } from 'next';
import { ITask } from '@/interface/task';
import { TaskTable } from '@/components';
import Layouts from '@/layouts/Layouts';
import { useState, useEffect } from 'react';
import { getTasksData } from '@/services/task.services';

const TasksPage: NextPage = () => {
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTasksData();
      setTaskData(response);
    };
    fetchData();
  }, []);

  return (
    <Layouts>
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
      <div className="container mx-auto mt-20 overflow-auto rounded-lg py-12 px-6">
        <table className="mx-auto my-auto w-full text-sm text-gray-500 shadow-md dark:text-gray-400">
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
                  status={val.status}
                  tags={val.tags}
                  hint={val.hint}
                  files={val.files}
                  testcases={val.testcases}
                  solution_code={val.solution_code}
                  created_at={val.created_at}
                  updated_at={val.updated_at}
                  __v={val.__v}
                />
              ))}
          </tbody>
        </table>
      </div>
    </Layouts>
  );
};

export default TasksPage;
