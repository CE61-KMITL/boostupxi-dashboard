import { UserProfile } from '@/interface/user';

import { ITask } from '@/interface/task';

const ProfileCard = ({ _id, username, email, role, tasks }: UserProfile) => {
  let taskCount = 0;
  let rejectCount = 0;
  let approveCount = 0;
  console.log('Task in profile');
  console.log(tasks);
  // for (let i = 0; i < tasks.length; i++) {
  //   taskCount++;

  //   if (tasks[i].status === "reject") {
  //     rejectCount++;
  //   } else if (tasks[i].status === "approve") {
  //     approveCount++;
  //   }
  // }

  console.log('Total tasks:', taskCount);
  console.log('Rejected tasks:', rejectCount);
  console.log('Approved tasks:', approveCount);
  return (
    <div className="flex flex-row justify-between">
      <div className="w-1/2">
        <div className="w-2/10 mx-5 my-5">
          <div className="flex min-w-max flex-col md:items-start">
            <h1 className="text-dark-800 dark:text-dark-200 text-6xl font-semibold text-red-600">
              {username}
            </h1>
            <p className="text-3xl text-gray-500 dark:text-gray-400">{email}</p>
            <p className="text-3xl text-green-500 dark:text-green-400">
              {role}
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-1/2 justify-end">
        <div className="h-25 w-30 xl:min-w-50 xl:h-50 mx-2 my-3 rounded-lg bg-gray-200 px-5 shadow-md xl:mx-2">
          <div className="p-4 text-center">
            <p className="text-lg font-bold">Total Tasks</p>
          </div>
          <div className=" flex items-center justify-center ">
            <div className="my-3 text-5xl font-bold text-green-500">324</div>
          </div>
        </div>
        <div className="h-25 min-w-25 xl:min-w-50 xl:h-50 mx-2 my-3 rounded-lg bg-gray-200 shadow-md xl:mx-2">
          <div className="p-4 text-center">
            <p className="text-lg font-bold">Approved Tasks</p>
          </div>
          <div className="flex items-center justify-center">
            <div className="my-3 text-5xl font-bold text-green-500">
              {rejectCount}
            </div>
          </div>
        </div>
        <div className="h-25 min-w-25 xl:min-w-50 xl:h-50 mx-2 my-3 rounded-lg bg-gray-200 px-1 shadow-md xl:mx-2">
          <div className="p-4 text-center">
            <p className="text-lg font-bold">Rejected Tasks</p>
          </div>
          <div className=" flex items-center justify-center">
            <div className="my-3 text-5xl font-bold text-red-500">1</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
