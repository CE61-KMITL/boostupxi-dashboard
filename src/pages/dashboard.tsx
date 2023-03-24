import { NextPage } from 'next';
import TaskList from '@/constants/task';
import { TaskForm } from '@/interface/task';
import TaskTable from '@/components/TaskTable';
import Layouts from '@/layouts/Layouts';

const TasksPage: NextPage = () => {
  return (
    <Layouts>
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
      <div className="container mx-auto mt-20 overflow-auto py-12 px-6">
        <table className="z-20 table w-full overflow-hidden rounded-lg  text-sm text-gray-500 shadow-lg dark:text-gray-400">
          <thead className="table-header-group h-10 bg-gray-50 text-center text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th>Task ID</th>
              <th>Task Name</th>
              <th>Author</th>
              <th>Levels</th>
              <th>Tags</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {TaskList &&
              TaskList.map((val: TaskForm, index: number) => (
                <TaskTable
                  key={index}
                  id={val.id}
                  title={val.title}
                  author={val.author}
                  level={val.level}
                  tags={val.tags}
                  status={val.status}
                />
              ))}
          </tbody>
        </table>
      </div>
    </Layouts>
  );
};

export default TasksPage;
