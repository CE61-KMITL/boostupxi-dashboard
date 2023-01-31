import { TaskForm } from '@/interface/task';

export const TaskTable = ({
  index,
  id,
  title,
  author,
  level,
  tags,
  status,
}: TaskForm) => {
  const handleEdit = () => {
    return id;
  };

  const handleDelete = () => {
    return 'handle delete';
  };

  return (
    <tr
      className="border-b bg-white text-center dark:border-gray-700 dark:bg-gray-900"
      key={index}
    >
      <th
        scope="row"
        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
      >
        {id}
      </th>
      <td className="px-6 py-4">{title}</td>
      <td className="px-6 py-4">{author}</td>
      <td className="px-6 py-4">
        {level === 1 ? (
          <div className="rating">
            <input
              type="radio"
              name="rating-4"
              className="mask mask-star-2 bg-green-500"
              disabled
            />
          </div>
        ) : level === 2 ? (
          <div className="rating">
            <input
              type="radio"
              name="rating-4"
              className="mask mask-star-2 bg-yellow-500"
              disabled
            />
            <input
              type="radio"
              name="rating-4"
              className="mask mask-star-2 bg-yellow-500"
              disabled
            />
          </div>
        ) : (
          <div className="rating">
            <input
              type="radio"
              name="rating-4"
              className="mask mask-star-2 bg-red-500"
              disabled
            />
            <input
              type="radio"
              name="rating-4"
              className="mask mask-star-2 bg-red-500"
              disabled
            />
            <input
              type="radio"
              name="rating-4"
              className="mask mask-star-2 bg-red-500"
              disabled
            />
          </div>
        )}
      </td>
      {tags.map((tags: string) => (
        <td
          className="badge mx-1 my-1 border-l-indigo-600 bg-indigo-600 px-5 py-4"
          key={index}
        >
          {tags}
        </td>
      ))}

      <td
        className={
          status === 'approve'
            ? 'px-6 py-4 font-bold uppercase text-green-700'
            : status === 'queue'
            ? 'px-6 py-4 font-bold uppercase text-yellow-700'
            : 'px-6 py-4 font-bold uppercase text-red-700'
        }
      >
        {status}
      </td>
      <td className="flex flex-wrap justify-center px-6 ">
        <button
          className="mt-3 mr-1 rounded-lg bg-blue-500 px-6 py-1 text-white hover:bg-blue-900"
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          className="mt-3 rounded-lg bg-red-500 px-4 py-1 text-white hover:bg-red-900"
          onClick={handleDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
