import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { TaskTable, LoadingFile } from '@/components';
import { ITask } from '@/interface/task';
import Layouts from '@/layouts/Layouts';
import { getTasksData } from '@/services/task.services';

const TasksPage: NextPage = () => {
  const [taskData, setTaskData] = useState<ITask[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limitPage, setLimitPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await getTasksData(currentPage);
      setTaskData(response.data);
      setLimitPage(response.pages);
      setIsLoading(false);
    };
    fetchData();
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const isLastPage = () => {
    return currentPage == limitPage;
  };
  return (
    <Layouts>
      {isLoading ? (
        <LoadingFile />
      ) : (
        <div className="container mx-auto mt-10 overflow-auto rounded-lg py-12 px-6">
          <table className="mx-auto my-auto w-full text-sm text-gray-400 shadow-md">
            <thead className="bg-gray-700 text-xs uppercase text-gray-100">
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
                  Author
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
              {taskData.map((val: ITask, index: number) => (
                <TaskTable
                  index_number={index + (currentPage - 1) * 10 + 1}
                  key={val._id}
                  _id={val._id}
                  title={val.title}
                  description={val.description}
                  author={val.author}
                  level={val.level}
                  status={val.status}
                  tags={val.tags}
                  hint={val.hint}
                  draft={val.draft}
                  files={val.files}
                  testcases={val.testcases}
                  solution_code={val.solution_code}
                  created_at={val.created_at}
                  updated_at={val.updated_at}
                  __v={val.__v}
                  isProfile={false}
                />
              ))}
            </tbody>
          </table>
          <div className="mt-3 flex justify-between pb-2">
            <div className="mt-3 flex items-start justify-start">
              <span className="text-sm text-gray-400">
                Showing{' '}
                <span className="font-semibold text-white">{currentPage}</span>{' '}
                of <span className="font-semibold text-white">{limitPage}</span>{' '}
                Page
              </span>
            </div>
            <div className="flex items-end justify-end">
              <button
                type="button"
                className={`rounded-l-md border-r border-gray-100 bg-gray-800 py-2 px-3 text-white hover:bg-red-700 hover:text-white ${
                  currentPage === 1 ? 'disabled' : ''
                }`}
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                <div className="flex flex-row align-middle">
                  <svg
                    className="mr-2 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <p className="ml-2">Prev</p>
                </div>
              </button>

              <button
                type="button"
                className={`rounded-r-md border-l border-gray-200 bg-gray-800 py-2 px-3 text-white hover:bg-red-700 hover:text-white ${
                  isLastPage() ? 'disabled' : ''
                }`}
                onClick={nextPage}
                disabled={isLastPage()}
              >
                <div className="flex flex-row align-middle">
                  <span className="mr-2">Next</span>
                  <svg
                    className="ml-2 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </Layouts>
  );
};

export default TasksPage;
