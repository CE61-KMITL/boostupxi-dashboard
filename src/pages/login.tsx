import { Fragment, useState } from 'react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Image from 'next/image';
import { Stars } from '@/components';
import { useAuth } from '@/contexts/auth';
import { loginSchema, loginSchemaType } from '@/schemas/login.schema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

const LoginPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();

  const onSubmit: SubmitHandler<loginSchemaType> = async (data) => {
    try {
      setLoading(true);
      await login(data.email, data.password);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      return err;
    }
  };

  return (
    <Fragment>
      <Stars />
      <div className="relative flex min-h-screen flex-col items-center justify-center space-y-8 px-4">
        <div className="absolute bottom-0 mb-3 text-center text-sm font-medium text-white">
          <p>
            Made by{' '}
            <Link
              className="hover:text-green-300"
              target="_blank"
              rel="noopener noreferer"
              href="https://github.com/deviate-team"
            >
              Deviate Team
            </Link>{' '}
            x{' '}
            <Link
              className="hover:text-green-300"
              target="_blank"
              rel="noopener noreferer"
              href="https://github.com/CE61-KMITL"
            >
              CE61 @KMITL
            </Link>
            ❤️
          </p>

          <p>
            Approved By{' '}
            <Link
              className="hover:text-green-300"
              target="_blank"
              rel="noopener noreferer"
              href="https://github.com/ISAG-Lab"
            >
              ISAG LAB✅
            </Link>
          </p>
        </div>
        <div className="flex w-full max-w-5xl flex-row overflow-hidden rounded-2xl shadow">
          <div className="hidden flex-auto flex-col items-center space-y-10 bg-indigo-200 md:flex">
            <div className="mt-16 flex flex-row items-center pb-10">
              <Image
                src="/login.svg"
                alt="login-image"
                width={370}
                height={270}
              />
            </div>
          </div>
          <div className="flex flex-auto flex-col divide-y divide-gray-200 bg-white p-8">
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-bold text-gray-900">Login</h1>
              <p>Enter your information to login</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="-mx-3 flex">
                <div className="mb-5 w-full px-3">
                  <label className="px-1 text-xs font-semibold">Email</label>
                  <div className="flex">
                    <div className="pointer-events-none z-10 flex w-10 items-center justify-center pl-1 text-center" />
                    <input
                      type="email"
                      className="-ml-10 w-full rounded-lg border-2 border-gray-200 py-2 pl-10 pr-3 outline-none focus:border-indigo-500"
                      placeholder="johnsmith@example.com"
                      id="email"
                      {...register('email')}
                      required
                    />
                  </div>
                  {errors.email && (
                    <span className="mt-2 block text-red-800">
                      {errors.email?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="-mx-3 flex">
                <div className="mb-12 w-full px-3">
                  <label className="px-1 text-xs font-semibold">Password</label>
                  <div className="flex">
                    <div className="pointer-events-none z-10 flex w-10 items-center justify-center pl-1 text-center" />
                    <input
                      type="password"
                      className="-ml-10 w-full rounded-lg border-2 border-gray-200 py-2 pl-10 pr-3 outline-none focus:border-indigo-500"
                      placeholder="************"
                      id="password"
                      {...register('password')}
                      required
                    />
                  </div>
                  {errors.password && (
                    <span className="mt-2 block text-red-800">
                      {errors.password?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="-mx-3 flex">
                <div className="mb-5 w-full px-3">
                  <button
                    type="submit"
                    className="mx-auto block w-full rounded-lg bg-indigo-500 px-3 py-3 font-semibold text-white hover:bg-indigo-700 focus:bg-indigo-700"
                    disabled={isSubmitting}
                  >
                    {loading ? (
                      <div className="text-center">
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="mr-2 inline h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      'LOGIN NOW'
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const token = context.req.cookies.token;

  if (token) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
