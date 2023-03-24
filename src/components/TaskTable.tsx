import { IFiles, ITask } from '@/interface/task';
import Link from 'next/link';
import { Fragment } from 'react';

const TaskTable = ({
  title,
  description,
  author,
  level,
  tags,
  hint,
  files,
  status,
}: ITask) => {
  return (
    <Fragment>
      <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
        <th
          scope="row"
          className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
        >
          {title}
        </th>
        <td className="px-6 py-4 sm:max-w-xs md:max-w-md lg:max-w-xl xl:max-w-2xl">
          {description}
        </td>
        <td className="px-6 py-4 sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
          {author}
        </td>
        <td className="px-6 py-4 sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
          {level}
        </td>
        <td className="px-6 py-4">
          {tags ? (
            tags.map((tag: string, index: number) => (
              <span
                className="mr-3 mb-3 inline-block rounded-lg bg-third-color px-2 py-1 text-xs font-bold text-gray-600"
                key={index}
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="text-sm leading-none text-gray-600">No tags</span>
          )}
        </td>
        <td className="px-6 py-4 sm:max-w-xs md:max-w-md lg:max-w-xl xl:max-w-2xl">
          {hint}
        </td>
        <td className="px-6 py-4">
          {files ? (
            files.map((file: IFiles, index: number) => (
              <div className="flex items-center" key={index}>
                <Link
                  className="ml-4 text-sm leading-none text-gray-600"
                  href={file.url}
                >
                  {file.url}
                </Link>
              </div>
            ))
          ) : (
            <span className="text-sm leading-none text-gray-600">No Files</span>
          )}
        </td>
        <td className="px-6 py-4 sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
          {status}
        </td>
        <td className="px-6 py-4">
          <button className="font-medium text-blue-600 hover:underline dark:text-blue-500">
            Edit
          </button>
          <button className="font-medium text-blue-600 hover:underline dark:text-blue-500">
            Preview
          </button>
        </td>
      </tr>
    </Fragment>
  );
};

export default TaskTable;
