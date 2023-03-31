import { ITask } from '@/interface/task';
import Link from 'next/link';
import { Fragment, useState, useEffect } from 'react';
import { getTaskById } from '@/services/task.services';

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
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState('');

  console.log(id);

  useEffect(() => {
    const fetchDataById = async () => {
      try {
        const response = await getTaskById({ id });
        setTaskDataById(response);
        console.log(taskDataById);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchDataById();
  }, [id]);

  return (
    <Fragment>
      <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
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
          {author}
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

      {showModal ? (
        <>
          <div
            className={`${
              showModal ? 'flex' : 'hidden'
            } fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70`}
            onClick={() => setShowModal(false)}
          >
            <div className="relative mx-auto w-full max-w-lg mt-9">
              <div className="relative rounded-lg bg-white">
                <div className="px-6 py-9 md:px-20 lg:px-28 xl:px-32">
                  <div className="mt-14 text-center">
                    <p className="text-base leading-4 text-gray-600">
                      Welcome to thecrib
                    </p>
                    <h1 className="mt-3 text-3xl font-semibold leading-7 text-gray-800 lg:text-4xl lg:leading-9">
                      ENJOY 10% OFF
                    </h1>
                    <p className="mt-6 text-base leading-4 text-gray-600">
                      Enter your Email to get 10% of discount
                    </p>
                  </div>

                  <div className="mt-8">
                    <input
                      placeholder="Email address"
                      type="email"
                      className="w-full border-b border-gray-400 py-4 text-base leading-4 text-gray-600 focus:outline-none"
                    />
                    <button
                      role="button"
                      aria-label="unlock ten percent off"
                      className="mt-4 w-full bg-gray-800 py-4 text-base font-medium uppercase leading-4 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
                    >
                      Unlock 10% Off
                    </button>
                  </div>

                  <div className="mt-8">
                    <input
                      placeholder="Email address"
                      type="email"
                      className="w-full border-b border-gray-400 py-4 text-base leading-4 text-gray-600 focus:outline-none"
                    />
                    <button
                      role="button"
                      aria-label="unlock ten percent off"
                      className="mt-4 w-full bg-gray-800 py-4 text-base font-medium uppercase leading-4 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
                    >
                      Unlock 10% Off
                    </button>
                  </div>

                  <div className="mt-8">
                    <input
                      placeholder="Email address"
                      type="email"
                      className="w-full border-b border-gray-400 py-4 text-base leading-4 text-gray-600 focus:outline-none"
                    />
                    <button
                      role="button"
                      aria-label="unlock ten percent off"
                      className="mt-4 w-full bg-gray-800 py-4 text-base font-medium uppercase leading-4 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
                    >
                      Unlock 10% Off
                    </button>
                  </div>

                  <div className="mt-8">
                    <input
                      placeholder="Email address"
                      type="email"
                      className="w-full border-b border-gray-400 py-4 text-base leading-4 text-gray-600 focus:outline-none"
                    />
                    <button
                      role="button"
                      aria-label="unlock ten percent off"
                      className="mt-4 w-full bg-gray-800 py-4 text-base font-medium uppercase leading-4 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
                    >
                      Unlock 10% Off
                    </button>
                  </div>

                  <div className="mt-8">
                    <input
                      placeholder="Email address"
                      type="email"
                      className="w-full border-b border-gray-400 py-4 text-base leading-4 text-gray-600 focus:outline-none"
                    />
                    <button
                      role="button"
                      aria-label="unlock ten percent off"
                      className="mt-4 w-full bg-gray-800 py-4 text-base font-medium uppercase leading-4 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
                    >
                      Unlock 10% Off
                    </button>
                  </div>

                  <div className="mt-8">
                    <input
                      placeholder="Email address"
                      type="email"
                      className="w-full border-b border-gray-400 py-4 text-base leading-4 text-gray-600 focus:outline-none"
                    />
                    <button
                      role="button"
                      aria-label="unlock ten percent off"
                      className="mt-4 w-full bg-gray-800 py-4 text-base font-medium uppercase leading-4 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
                    >
                      Unlock 10% Off
                    </button>
                  </div>

                  <div className="mt-8">
                    <input
                      placeholder="Email address"
                      type="email"
                      className="w-full border-b border-gray-400 py-4 text-base leading-4 text-gray-600 focus:outline-none"
                    />
                    <button
                      role="button"
                      aria-label="unlock ten percent off"
                      className="mt-4 w-full bg-gray-800 py-4 text-base font-medium uppercase leading-4 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
                    >
                      Unlock 10% Off
                    </button>
                  </div>

                  <div className="mt-8">
                    <input
                      placeholder="Email address"
                      type="email"
                      className="w-full border-b border-gray-400 py-4 text-base leading-4 text-gray-600 focus:outline-none"
                    />
                    <button
                      role="button"
                      aria-label="unlock ten percent off"
                      className="mt-4 w-full bg-gray-800 py-4 text-base font-medium uppercase leading-4 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
                    >
                      Unlock 10% Off
                    </button>
                  </div>

                  <div className="mt-8 text-center">
                    <button
                      role="button"
                      aria-label="no thanks"
                      className="text-base font-semibold capitalize leading-4 text-gray-800 underline hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
                      onClick={() => setShowModal(false)}
                    >
                      No, Thanks
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </Fragment>
  );
};

export default TaskTable;
