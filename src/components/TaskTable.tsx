import { TaskForm } from '@/interface/task';

const TaskTable = ({ id, title, author, level, tags, status }: TaskForm) => {
  const handleEdit = () => {
    return id;
  };

  const handleDelete = () => {
    return 'handle delete';
  };
  return (
    <tr
      className="border-t bg-white text-center dark:border-gray-700 dark:bg-gray-900"
      key={id}
    >
      <td className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {id}
      </td>
      <td>{title}</td>
      <td>{author}</td>
      <td>
        {level === 1 ? (
          <span className="rating">
            <input
              type="radio"
              name="rating-4"
              className="mask mask-star-2 bg-green-500"
              disabled
            />
          </span>
        ) : level === 2 ? (
          <span className="rating">
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
          </span>
        ) : (
          <span className="rating">
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
          </span>
        )}
      </td>
      <td>
        {tags.map((tags: string, index) => (
          <span
            className="badge bg-indigo-800 px-4 py-3 text-gray-200 "
            key={index}
          >
            {tags}
          </span>
        ))}
      </td>

      <td
        className={
          status === 'approve'
            ? 'font-bold uppercase text-green-700'
            : status === 'queue'
            ? 'font-bold uppercase text-yellow-700'
            : 'font-bold uppercase text-red-700'
        }
      >
        {status}
      </td>
      <td className="flex flex-wrap justify-center space-x-1 py-4">
        <button
          className="w-18 my-1 rounded-lg bg-blue-500 px-6 py-1 text-white hover:bg-blue-900"
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          className="my-1 rounded-lg bg-red-500 px-4 py-1 text-white hover:bg-red-900"
          onClick={handleDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TaskTable;
