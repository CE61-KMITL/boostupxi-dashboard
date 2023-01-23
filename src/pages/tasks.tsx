import TaskList from "@/constants/task";
import { TaskForm } from "@/interface/task";
import { TaskTable } from "@/components/TaskTable";
import { NextPage } from "next";
import Navbar from "@/components/Navbar";

const TasksPage: NextPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center bg-main-color grow min-h-screen">
        <div className="container py-12 px-6">
          <div className="block bg-white shadow-lg rounded-lg">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Task ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Task Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Author
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Last Edited
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="md:px-20 text-center px-9 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {TaskList &&
                    TaskList.map((val: TaskForm) => (
                      <TaskTable
                        key={val.id}
                        id={val.id}
                        taskName={val.taskName}
                        author={val.author}
                        lastEdited={val.lastEdited}
                        status={val.status}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TasksPage;
