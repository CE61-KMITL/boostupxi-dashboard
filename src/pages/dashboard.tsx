import { LoadingFile, TaskTable } from '@/components';
import { ITask } from '@/interface/task';
import Layouts from '@/layouts/Layouts';
import { getTasksData } from '@/services/task.services';
import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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

  const renderPaginationLinks = () => {
    const links = [];

    if (currentPage > 1) {
      links.push(
        <a
          key="prev"
          href="#"
          className="mr-4 rounded p-2 hover:bg-gray-100"
          onClick={prevPage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </a>,
      );
    }

    for (let page = 1; page <= limitPage; page++) {
      links.push(
        <a
          key={page}
          href="#"
          className={`rounded px-4 py-2 hover:bg-gray-100 ${
            currentPage === page ? 'bg-gray-200' : ''
          }`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </a>,
      );
    }

    // Next page link
    if (currentPage < limitPage) {
      links.push(
        <a
          key="next"
          href="#"
          className="ml-4 rounded p-2 hover:bg-gray-100"
          onClick={nextPage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>,
      );
    }

    return links;
  };

  return (
    <Layouts>
      {isLoading ? (
        <LoadingFile />
      ) : (
        <div className="container mx-auto mt-14 min-h-screen overflow-auto rounded-lg py-12 px-6">
          <table className="mx-auto my-auto w-full overflow-hidden rounded-lg border-none bg-white bg-opacity-5 text-sm text-gray-400 shadow-md backdrop-filter">
            <thead className="bg-gray-700 text-xs uppercase text-gray-100 backdrop-blur-sm">
              <tr>
                <th scope="col" className="px-6 py-1">
                  #
                </th>
                <th scope="col" className="px-62 py-3">
                  Name
                </th>{' '}
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
              {taskData.length === 0 ? (
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
                      comments={val.comments}
                      solution_code={val.solution_code}
                      created_at={val.created_at}
                      updated_at={val.updated_at}
                      __v={val.__v}
                      isProfile={false}
                    />
                  ))}
                </>
              )}
            </tbody>
          </table>

          {taskData.length > 0 && (
            <div className="mt-3 flex justify-between pb-2">
              <div className="mt-3 flex items-start justify-start">
                <span className="text-sm text-gray-400">
                  Showing{' '}
                  <span className="font-semibold text-white">
                    {currentPage}
                  </span>{' '}
                  of{' '}
                  <span className="font-semibold text-white">{limitPage}</span>{' '}
                  Page
                </span>
              </div>
              <nav
                aria-label="Pagination"
                className="flex items-center text-gray-600"
              >
                {renderPaginationLinks()}
              </nav>
            </div>
          )}
        </div>
      )}
    </Layouts>
  );
};

export default TasksPage;
