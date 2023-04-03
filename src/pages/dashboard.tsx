import { NextPage } from 'next';
import { ITask } from '@/interface/task';
import { TaskTable } from '@/components';
import Layouts from '@/layouts/Layouts';
import { useState, useEffect } from 'react';
import { getTasksData } from '@/services/task.services';
import Fuse from 'fuse.js';

const TasksPage: NextPage = () => {
  const [taskData, setTaskData] = useState<ITask[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);
  const [fuse, setFuse] = useState<Fuse<ITask>>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTasksData(currentPage);
      setTaskData(response);
      setFilteredTasks(response);
      setFuse(
        new Fuse(response, {
          keys: ['title', 'description', 'author', 'level', 'tags'],
        }),
      );
    };
    fetchData();
  }, [currentPage]);
  useEffect(() => {
    if (fuse && searchTerm) {
      const results = fuse.search(searchTerm);
      setFilteredTasks(results.map((result) => result.item));
    } else {
      setFilteredTasks(taskData);
    }
  }, [searchTerm, taskData, fuse]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const isLastPage = () => {
    return taskData.length < 10 || taskData.length == 0;
  };
  return (
    <Layouts>
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
      <div className="container mx-auto mt-10 overflow-auto rounded-lg py-12 px-6">
        <div className="float-left">
          <h1 className="text-3xl font-bold text-white">Tasks</h1>
        </div>

        <div className="mx-auto my-3 ml-3 flex flex-row justify-end">
          <input
            type="text"
            className="center mx-2 flex w-11 rounded-md border py-2 pl-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 "
            value={currentPage}
            readOnly
          ></input>
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
        <div className="mb-4 flex flex-row justify-center">
          <input
            type="text"
            placeholder="Search task by name"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full rounded-md border px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <table className="mx-auto my-auto w-full text-sm text-gray-500 shadow-md dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
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
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((val: ITask, index: number) => (
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
        <div className="mx-auto mt-3 ml-3 flex flex-row justify-end">
          <input
            type="text"
            className="center mx-2 flex w-11 rounded-md border py-2 pl-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 "
            value={currentPage}
            readOnly
          ></input>
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
    </Layouts>
  );
};

export default TasksPage;
