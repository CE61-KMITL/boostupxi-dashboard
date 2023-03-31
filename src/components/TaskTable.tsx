import { IFiles, ITask, ITestCases } from '@/interface/task';
import Link from 'next/link';
import { Fragment, useState, useEffect } from 'react';
import { getTaskById } from '@/services/task.services';
import SyntaxHighlighter from 'react-syntax-highlighter';
import c from 'react-syntax-highlighter/dist/cjs/languages/prism/c';
import { vs2015 } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const TaskTable = ({
  _id,
  title,
  description,
  author,
  level,
  tags,
  status,
}: ITask) => {
  const [taskDataById, setTaskDataById] = useState<any>({});
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState('');
  const customStyle = {
    borderRadius: '10px',
  };

  useEffect(() => {
    const fetchDataById = async () => {
      try {
        const response = await getTaskById({ id });
        setTaskDataById(response);
      } catch (error) {
        return error;
      }
    };
    fetchDataById();
  }, [id]);

  return (
    <Fragment>
      <tr className="border-b bg-white text-center hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
        <th
          scope="row"
          className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
        >
          {title}
        </th>
        <td className="px-6 py-4 dark:text-white sm:max-w-xs md:max-w-md lg:max-w-xl xl:max-w-2xl">
          {description}
        </td>
        <td className="px-6 py-4 dark:text-white sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
          {author.username}
        </td>
        <td className="px-6 py-4 dark:text-white sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
          {level}
        </td>
        <td className="px-6 py-4">
          {tags ? (
            tags.map((tag: string, index: number) => (
              <span
                className="mr-3 mb-3 inline-block rounded-lg bg-third-color px-2 py-1 text-xs font-medium text-gray-600"
                key={index}
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="text-sm leading-none text-gray-600 dark:text-white">
              No tags
            </span>
          )}
        </td>
        <td className="px-6 py-4 dark:text-white sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
          {status}
        </td>
        <td className="px-6 py-4">
          <button className="px-2 font-medium text-blue-600 hover:underline dark:text-blue-500">
            Edit
          </button>
          <button
            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            onClick={() => (setShowModal(true), setId(`${_id}`))}
          >
            Preview
          </button>
        </td>
      </tr>
      <div>
        {showModal ? (
          <>
            <div
              className={`${
                showModal ? 'flex' : 'hidden'
              } fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70`}
            >
              <div className="relative mx-20 mt-14 w-full xl:mx-40">
                <div className="relative rounded-lg bg-white">
                  <div className="px-6 py-9 md:px-20 lg:px-28 xl:px-32">
                    <div className="mt-2 mb-8 w-full">
                      <h4 className="text-navy-700 px-2 text-xl font-bold dark:text-black">
                        {taskDataById.title}
                      </h4>
                      <p className="mt-2 px-2 text-base text-gray-600">
                        {taskDataById.description}
                      </p>
                    </div>
                    <div className="grid w-full grid-cols-2 gap-4 px-2">
                      <div className="shadow-3xl shadow-shadow-500 dark:!bg-navy-700 flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 dark:shadow-none">
                        <label className="text-sm text-gray-600">Author</label>
                        <p className="text-navy-700 text-base font-medium dark:text-black">
                          {taskDataById.author?.username}
                        </p>
                      </div>

                      <div className="shadow-3xl shadow-shadow-500 dark:!bg-navy-700 flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 dark:shadow-none">
                        <p className="text-sm text-gray-600">Level</p>
                        <p className="text-navy-700 text-base font-medium dark:text-black">
                          {taskDataById.level}
                        </p>
                      </div>
                    </div>
                    <div className="shadow-3xl shadow-shadow-500 dark:!bg-navy-700 flex flex-col rounded-2xl bg-white bg-clip-border px-3 py-4 dark:shadow-none">
                      <p className="text-sm text-gray-600">Solution Code</p>
                      <SyntaxHighlighter language={c} style={vs2015}>
                        {taskDataById.solution_code}
                      </SyntaxHighlighter>
                    </div>

                    <div className="grid w-full grid-cols-3 gap-2 px-2 py-4">
                      <div className="shadow-3xl shadow-shadow-500 dark:!bg-navy-700 flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 dark:shadow-none">
                        <p className="text-sm text-gray-600">Task Category</p>
                        {taskDataById.tags &&
                          taskDataById.tags.map(
                            (val: string, index: number) => (
                              <li
                                className="text-navy-700 text-base font-medium dark:text-black"
                                key={index}
                              >
                                {val}
                              </li>
                            ),
                          )}
                      </div>

                      <div className="shadow-3xl shadow-shadow-500 dark:!bg-navy-700 flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 dark:shadow-none">
                        <p className="text-sm text-gray-600">Task Hints</p>
                        <p className="text-navy-700 text-base font-medium dark:text-black">
                          {taskDataById.hint}
                        </p>
                      </div>

                      <div className="shadow-3xl shadow-shadow-500 dark:!bg-navy-700 flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 dark:shadow-none">
                        <p className="text-sm text-gray-600">Task Status</p>
                        <p className="text-navy-700 text-base font-medium dark:text-black">
                          {taskDataById.status}
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="shadow-3xl shadow-shadow-500 dark:!bg-navy-700 flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 dark:shadow-none">
                        <p className="text-sm text-gray-600">Task Files</p>
                        {taskDataById.files &&
                          taskDataById.files.map((val: IFiles) => (
                            <p
                              className="text-navy-700 text-base font-medium dark:text-black"
                              key={val.key}
                            >
                              <Link href={val.url}>{val.url}</Link>
                            </p>
                          ))}
                      </div>
                    </div>
                    <div className="grid w-full grid-cols-3 gap-2 px-2 py-4">
                      {taskDataById.testcases &&
                        taskDataById.testcases.map(
                          (val: ITestCases, length: number) => (
                            <>
                              <div
                                className="shadow-3xl shadow-shadow-500 dark:!bg-navy-700 flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 dark:shadow-none"
                                key={length}
                              >
                                <p className="text-sm text-gray-600">
                                  Task Input {length + 1}
                                </p>
                                <p className="text-navy-700 text-base font-medium dark:text-black">
                                  {val.input}
                                </p>
                              </div>
                              <div
                                className="shadow-3xl shadow-shadow-500 dark:!bg-navy-700 flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 dark:shadow-none"
                                key={length}
                              >
                                <p className="text-sm text-gray-600">
                                  Task Output {length + 1}
                                </p>
                                <p className="text-navy-700 text-base font-medium dark:text-black">
                                  {val.output}
                                </p>
                              </div>
                              <div
                                className="shadow-3xl shadow-shadow-500 dark:!bg-navy-700 flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 dark:shadow-none"
                                key={length}
                              >
                                <p className="text-sm text-gray-600">
                                  Published
                                </p>
                                <p className="text-navy-700 text-base font-medium dark:text-black">
                                  {val.published
                                    ? 'Published'
                                    : 'Not Published'}
                                </p>
                              </div>
                            </>
                          ),
                        )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
                    <button
                      type="button"
                      className="rounded-lg border border-gray-200 bg-red-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-600 focus:z-10 focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </Fragment>
  );
};

export default TaskTable;
