import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { TaskTable, ProfileCard, LoadingFile } from '@/components';
import { IUserProfile } from '@/interface/user';
import { ITask } from '@/interface/task';
import Layouts from '@/layouts/Layouts';
import { getProfile } from '@/services/user.services';

const ProfilePage: NextPage = () => {
  const [taskData, setTaskData] = useState<IUserProfile>({} as IUserProfile);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await getProfile();
      setTaskData(response);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return (
    <Layouts>
      {isLoading ? (
        <LoadingFile />
      ) : (
        <div className="container mx-auto my-auto  mt-10 w-full overflow-auto rounded-lg py-12  px-6">
          <ProfileCard {...taskData} />
          <table className="mx-auto my-auto w-full text-sm text-gray-400 shadow-md">
            <thead className=" bg-gray-700 text-xs uppercase text-gray-100">
              <tr>
                <th scope="col" className="px-6 py-1">
                  #
                </th>
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
                  Deploy
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {taskData.tasks &&
                taskData.tasks.map((val: ITask, index: number) => (
                  <TaskTable
                    index_number={index + 1}
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
                    draft={val.draft}
                    solution_code={val.solution_code}
                    created_at={val.created_at}
                    updated_at={val.updated_at}
                    __v={val.__v}
                  />
                ))}
            </tbody>
          </table>
        </div>
      )}
    </Layouts>
  );
};
export default ProfilePage;
