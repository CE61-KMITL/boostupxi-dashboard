import { IUserProfile } from '@/interface/user';

const ProfileCard = ({ _id, username, email, role, tasks }: IUserProfile) => {
  let taskCount: number = 0;
  let rejectCount: number = 0;
  let approveCount: number = 0;

  if (tasks != null) {
    taskCount = tasks.length;
    tasks.forEach((task) => {
      if (task.status === 'rejected') {
        rejectCount++;
      } else if (task.status === 'approved') {
        approveCount++;
      }
    });
  }

  return (
    <div className="flex flex-col justify-between  overflow-auto xl:flex-row">
      <div className="w-1/2">
        <div className="w-2/10 my-5">
          <div className="flex min-w-max flex-col md:items-start">
            <h1 className="text-dark-800 text-dark-200 text-6xl font-semibold text-red-600">
              {username}
            </h1>
            <p className="text-2xl text-gray-400">{_id}</p>
            <p className="text-3xl text-gray-400">{email}</p>
            <p className="text-3xl text-green-400">{role}</p>
          </div>
        </div>
      </div>

      <div className="flex w-1/2 flex-col justify-end xl:flex-row">
        <div className="h-25 w-30 xl:min-w-50 xl:h-50 mx-2 my-3 rounded-lg bg-gray-200 px-5 shadow-md xl:mx-2">
          <div className="p-4 text-center">
            <p className="text-lg font-bold">Total Tasks</p>
          </div>
          <div className=" flex items-center justify-center ">
            <div className="my-3 text-5xl font-bold text-gray-500">
              {taskCount}
            </div>
          </div>
        </div>
        <div className="h-25 min-w-25 xl:min-w-50 xl:h-50 mx-2 my-3 rounded-lg bg-gray-200 shadow-md xl:mx-2">
          <div className="p-4 text-center">
            <p className="text-lg font-bold">Approved Tasks</p>
          </div>
          <div className="flex items-center justify-center">
            <div className="my-3 text-5xl font-bold text-green-500">
              {approveCount}
            </div>
          </div>
        </div>
        <div className="h-25 min-w-25 xl:min-w-50 xl:h-50 mx-2 my-3 rounded-lg bg-gray-200 px-1 shadow-md xl:mx-2">
          <div className="p-4 text-center">
            <p className="text-lg font-bold">Rejected Tasks</p>
          </div>
          <div className=" flex items-center justify-center">
            <div className="my-3 text-5xl font-bold text-red-500">
              {rejectCount}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
