import { Fragment } from 'react';
import { getProfile, updateUser } from '@/services/user.services';
import { IUpdateUser } from '@/interface/user';
import { useAuth } from '@/contexts/auth';
import {
  updateProfileSchema,
  updateProfileSchemaType,
} from '@/schemas/update-profiile.schema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<updateProfileSchemaType>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      username,
      email,
      role,
    },
  });

  const { setUpdateUser } = useAuth();

  const onSubmit: SubmitHandler<updateProfileSchemaType> = async (data) => {
    const userData: IUpdateUser = {
      username: data.username,
      password: data.password,
    };

    if (data.password === '' && data.password === '') {
      userData.password = undefined;
    }

    await updateUser(id, userData);
    const updatedUser = await getProfile();
    setUpdateUser(updatedUser);
    handleCloseModal();
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
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
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
                    {...register('username')}
                  />
                  {errors.username && (
                    <span className="mt-2 block text-red-800">
                      {errors.username?.message}
                    </span>
                  )}
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
                    {...register('email')}
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
                    {...register('role')}
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
                    {...register('password')}
                    placeholder="Enter new password"
                  />
                  {errors.password && (
                    <span className="mt-2 block text-red-800">
                      {errors.password?.message}
                    </span>
                  )}
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
                    {...register('confirmPassword')}
                    placeholder="Confirm new password"
                  />
                  {errors.confirmPassword && (
                    <span className="mt-2 block text-red-800">
                      {errors.confirmPassword?.message}
                    </span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
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
