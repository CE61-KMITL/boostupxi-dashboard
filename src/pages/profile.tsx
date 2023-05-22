import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { TaskTable, ProfileCard } from '@/components';
import { ITask } from '@/interface/task';
import Layouts from '@/layouts/Layouts';
import UpdateProfile from '@/components/UpdateProfile';
import { getProfile } from '@/services/user.services';
import { LoadingFile } from '@/components';
import { useAuth } from '@/contexts/auth';
import Link from 'next/link';

const ProfilePage: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { user: taskData, setUpdateUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await getProfile();
      setUpdateUser(response);
      setIsLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenModal = () => setOpenModal(true);

  const handleCloseModal = () => setOpenModal(false);

  return (
    <Layouts>
      {isLoading ? (
        <LoadingFile />
      ) : (
        <div className="container mx-auto my-auto  mt-10 w-full overflow-auto rounded-lg py-12  px-6">
          <ProfileCard {...taskData} handleOpenModal={handleOpenModal} />
          <table className="mx-auto my-auto w-full text-sm text-gray-400 shadow-md">
            <thead className=" bg-gray-700 text-xs uppercase text-gray-100">
              <tr>
                <th scope="col" className="px-6 py-1">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Level
                </th>
                <th scope="col" className="px-6 py-3">
                  Tags
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Publication Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {taskData.tasks.length === 0 ? (
                <tr className="bg-gray-700 text-xs uppercase text-gray-100">
                  <td colSpan={9} className="py-12 text-center">
                    No task in the system. <br />
                    If you want to create a new task,{' '}
                    <Link className="text-red-500" href="/task/upload">
                      click here
                    </Link>
                    .
                  </td>
                </tr>
              ) : (
                <>
                  {taskData.tasks.map((val: ITask, index: number) => (
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
                      isProfile={true}
                    />
                  ))}
                </>
              )}
            </tbody>
          </table>
          {openModal && (
            <UpdateProfile {...taskData} handleCloseModal={handleCloseModal} />
          )}
        </div>
      )}
    </Layouts>
  );
};
export default ProfilePage;
