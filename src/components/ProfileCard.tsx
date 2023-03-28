import { UserProfile } from '@/interface/user';

const ProfileCard = ({ _id, username, email, role, tasks }: UserProfile) => {
  return (
    <div className="mx-auto mt-8 max-w-3xl">
      <div className="overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="px-6 py-4">
          <div className="mb-2 text-xl font-bold">{username}</div>
          <p className="text-base text-gray-700">{_id}</p>
          <p className="text-base text-gray-700">{email}</p>
          <p className="text-base text-gray-700">{role}</p>
        </div>
        <div className="px-6 py-4">
          <h2 className="mb-4 text-lg font-semibold">Task List</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-2 px-3 text-left font-medium text-gray-500">
                  #
                </th>
                <th className="py-2 px-3 text-left font-medium text-gray-500">
                  Title
                </th>
                <th className="py-2 px-3 text-left font-medium text-gray-500">
                  Author
                </th>
                <th className="py-2 px-3 text-left font-medium text-gray-500">
                  Level
                </th>
                <th className="py-2 px-3 text-left font-medium text-gray-500">
                  Tags
                </th>
                <th className="py-2 px-3 text-left font-medium text-gray-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="py-2 px-3 text-gray-500">name</td>
                <td className="py-2 px-3">Direct Proof</td>
                <td className="py-2 px-3">Thanunchai Threepak</td>
                <td className="py-2 px-3">1</td>
                <td className="py-2 px-3">
                  Discrete Structure, Computer Engineer
                </td>
                <td className="py-2 px-3">
                  <span className="rounded-full bg-yellow-200 py-1 px-3 text-yellow-800">
                    Queue
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="py-2 px-3 text-gray-500">2</td>
                <td className="py-2 px-3">Finite State Machine</td>
                <td className="py-2 px-3">Thana Hongsuwan</td>
                <td className="py-2 px-3">2</td>
                <td className="py-2 px-3">Arduino, ITC</td>
                <td className="py-2 px-3">
                  <span className="rounded-full bg-green-200 py-1 px-3 text-green-800">
                    Approve
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* just for commit */}
      <pre>{tasks.map((task) => task.title)}</pre>
    </div>
  );
};

export default ProfileCard;
