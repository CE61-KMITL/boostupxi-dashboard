import { Fragment, useState } from 'react';
import Link from 'next/link';
import { PreviewTask } from '@/components';
import { useAuth } from '@/contexts/auth';
import { ITask } from '@/interface/task';

const TaskTable = ({
  index_number,
  _id,
  title,
  description,
  author,
  level,
  tags,
  draft,
  status,
  isProfile,
}: ITask & {
  isProfile: boolean;
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [id, setId] = useState<string>('');
  const { user } = useAuth();

  const handleOpenModal = (): void => {
    setOpenModal(true);
  };

  const handleCloseModal = (): void => {
    setOpenModal(false);
  };

  return (
    <Fragment>
      <tr className="border-b border-gray-500 bg-gray-800 text-center outline-none backdrop-blur-sm backdrop-filter hover:bg-gray-600">
        <td className="border-r-2 border-gray-300 px-1 py-4 text-white sm:max-w-xs md:max-w-md lg:max-w-xl xl:max-w-2xl">
          {index_number}
        </td>
        <th
          scope="row"
          className="whitespace-nowrap px-6 py-4 font-medium text-white"
        >
          {title}
        </th>
        <td className="px-6 py-4 text-left text-white sm:max-w-xs md:max-w-md lg:max-w-xl xl:max-w-2xl">
          {description.length > 200
            ? description.substring(0, 200) + '...'
            : description}
        </td>
        {!isProfile && (
          <td className="px-6 py-4 text-white sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
            {author.username}
          </td>
        )}
        <td className="px-6 py-4 text-white sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
          {level}
        </td>
        <td className="px-6 py-4">
          {tags ? (
            tags.map((tag: string, index: number) => (
              <span
                className="mr-3 mb-3 inline-block rounded-lg bg-indigo-400 px-2 py-1 text-xs font-medium text-gray-200 ring-2 ring-indigo-200"
                key={index}
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="text-sm leading-none text-white">No tags</span>
          )}
        </td>
        <td className="px-6 py-4 text-white sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
          {status == 'approved' ? (
            <span className="inline-flex rounded-full px-6 py-4 text-sm font-semibold uppercase leading-5 text-green-500 sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
              {status}
            </span>
          ) : status == 'queued' ? (
            <span className="inline-flex rounded-full px-6 py-4 text-sm font-semibold uppercase leading-5 text-yellow-500 sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
              {status}
            </span>
          ) : (
            <span className="inline-flex rounded-full px-6 py-4 text-sm font-semibold uppercase leading-5 text-red-500 sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
              {status}
            </span>
          )}
        </td>
        <td className="px-6 py-4 text-white sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
          {draft ? (
            <span className="inline-flex rounded-full px-6 py-4 text-sm font-semibold uppercase leading-5 text-yellow-500 sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
              Draft
            </span>
          ) : (
            <span className=" inline-flex rounded-full px-6 py-4 text-sm font-semibold uppercase leading-5 text-green-500 sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
              Published
            </span>
          )}
        </td>
        <td className="px-6 py-4">
          {user.username == author.username && (
            <button className="px-2 font-bold  text-blue-400 hover:underline">
              <Link href={`/task/edit/${_id}`}>Edit</Link>
            </button>
          )}
          <button
            className="font-bold text-blue-500 hover:underline"
            onClick={() => (handleOpenModal(), setId(`${_id}`))}
          >
            Preview
          </button>
        </td>
      </tr>
      <>
        {openModal && (
          <PreviewTask id={id} isOpen={openModal} onClose={handleCloseModal} />
        )}
      </>
    </Fragment>
  );
};

export default TaskTable;
