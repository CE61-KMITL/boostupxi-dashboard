import { NextPage } from 'next';
import TaskList from '../constants/task';
import { UserProfile } from '@/interface/user';
import ProfileCard from '../components/ProfileCard';
import Layouts from '@/layouts/Layouts';
import { TaskTable } from '@/components';
import { ITask } from '@/interface/task';
import { useState, useEffect } from 'react';
import { getTaskbyUserId } from '@/services/task.services';

const ProfilePage: NextPage = (id) => {
  //TODO FETCH DATA USER TABLE , DATA HERE

  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTaskbyUserId(id as string);
      setTaskData(response);
    };
    fetchData();
  }, []);

  const profileData: UserProfile = {
    _id: '596840596804574596',
    username: 'Teetouch Jaknamon',
    email: 'teawkrub.ghs@gmail.com',
    role: 'Admin',
    tasks: taskData,
  };
  console.log(taskData);
  return (
    <Layouts>
      <div className="min-h-screen flex-col items-center justify-center bg-black px-6 pt-20">
        <div className="container mx-auto max-w-screen-xl">
          <ProfileCard {...profileData} />
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
                    solution_code={val.solution_code}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layouts>
  );
};
export default ProfilePage;
