import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { getProfile, updateUser } from '@/services/user.services';
import { toast } from 'react-hot-toast';
import { IUpdateUser } from '@/interface/user';
import { useAuth } from '@/contexts/auth';

interface Props {
  handleCloseModal: () => void;
  username: string;
  email: string;
  role: string;
  _id: string;
}

const UpdateProfile = ({
  username,
  email,
  role,
  _id: id,
  handleCloseModal,
}: Props) => {
  const [user, setUser] = useState({
    username: username,
    email: email,
    role: role,
    password: '',
    confirmPassword: '',
  });

  const { setUpdateUser } = useAuth();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user.password === user.confirmPassword) {
      const userData: IUpdateUser = {
        username: user.username,
        password: user.password,
      };

      if (user.password === '' && user.confirmPassword === '') {
        userData.password = undefined;
      }
      await updateUser(id, userData);
      const updatedUser = await getProfile();
      setUpdateUser(updatedUser);
      handleCloseModal();
    } else {
      toast.error('Password does not match.');
    }
  };

  return (
    <Fragment>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70">
        <div className="flex min-h-screen items-center justify-center">
          <div className="relative w-full max-w-3xl rounded-xl bg-white p-12">
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3"
            >
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <form className="w-full" onSubmit={onSubmit}>
              <div className="-mx-3 mb-6 flex flex-wrap">
                <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                  <label
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setUser({ ...user, username: e.target.value });
                    }}
                  />
                </div>
                <div className="w-full px-3 md:w-1/2">
                  <label
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                    type="email"
                    name="email"
                    value={user.email}
                    disabled
                  />
                </div>
              </div>
              <div className="-mx-3 mb-6 flex flex-wrap">
                <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                  <label
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    htmlFor="role"
                  >
                    Role
                  </label>
                  <input
                    className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                    type="text"
                    name="role"
                    value={user.role}
                    disabled
                  />
                </div>
              </div>

              <div className="-mx-3 mb-6 flex flex-wrap">
                <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                  <label
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    htmlFor="password"
                  >
                    New Password
                  </label>
                  <input
                    className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setUser({ ...user, password: e.target.value });
                    }}
                    placeholder="Enter new password"
                  />
                </div>
                <div className="w-full px-3 md:w-1/2">
                  <label
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    htmlFor="confirmPassword"
                  >
                    Confirm New Password
                  </label>
                  <input
                    className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                    type="password"
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setUser({ ...user, confirmPassword: e.target.value });
                    }}
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProfile;
