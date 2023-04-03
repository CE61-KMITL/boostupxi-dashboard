import { ITask } from '@/interface/task';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import PreviewTask from './PreviewTask';

const TaskTable = ({
  index_number,
  _id,
  title,
  description,
  author,
  level,
  tags,
  status,
}: ITask) => {
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState('');

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Fragment>
      <tr className="border-b bg-white text-center hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
        <td className="border-r-2 border-gray-700 px-1 py-4 dark:text-white sm:max-w-xs md:max-w-md lg:max-w-xl xl:max-w-2xl">
          {index_number}
        </td>
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
        {status == 'approved' ? (
          <td className="px-6 py-4  sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
            <span className="inline-flex rounded-full px-2 text-base font-semibold leading-5  text-green-500">
              {status}
            </span>
          </td>
        ) : status == 'queue' ? (
          <td className="px-6 py-4 dark:text-white sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
            <span className="inline-flex rounded-full px-2 text-base font-semibold leading-5 text-yellow-500">
              {status}
            </span>
          </td>
        ) : (
          <td className="px-6 py-4  sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
            <span className="inline-flex rounded-full px-2 text-base font-semibold leading-5  text-red-500">
              {status}
            </span>
          </td>
        )}

        <td className="px-6 py-4">
          <button className="px-2 font-bold text-blue-600 hover:underline dark:text-blue-400">
            <Link href={`/edit-task/${_id}`}>Edit</Link>
          </button>
          <button
            className="font-bold text-blue-600 hover:underline dark:text-blue-500"
            onClick={() => (handleOpenModal(), setId(`${_id}`))}
          >
            Preview
          </button>
        </td>
      </tr>
      <div>
        {openModal && (
          <PreviewTask id={id} isOpen={openModal} onClose={handleCloseModal} />
        )}
      </div>
    </Fragment>
  );
};

export default TaskTable;
