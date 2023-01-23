import { TaskForm } from "@/interface/task";

export const TaskTable = ({
  id,
  taskName,
  author,
  lastEdited,
  status,
}: TaskForm) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {id}
      </th>
      <td className="px-6 py-4">{taskName}</td>
      <td className="px-6 py-4">{author}</td>
      <td className="px-6 py-4">{lastEdited}</td>
      <td
        className={
          status === "Approved"
            ? "px-6 py-4 text-green-700 font-bold"
            : status === "Queue"
            ? "px-6 py-4 text-yellow-700 font-bold"
            : "px-6 py-4 text-red-700 font-bold"
        }
      >
        {status}
      </td>
      <td className="flex flex-wrap justify-center px-6 ">
        <button className="bg-blue-500 px-6 py-1 mt-3 mr-1 rounded-lg text-white hover:bg-blue-900">
          Edit
        </button>
        <button className="bg-red-500 px-4 py-1 mt-3 rounded-lg text-white hover:bg-red-900">
          Delete
        </button>
      </td>
    </tr>
  );
};
