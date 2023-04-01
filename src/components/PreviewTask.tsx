import { useState, useEffect, Fragment } from 'react';
import { useAuth } from '@/contexts/auth';
import {
  getTaskById,
  handleApproveReject,
  deleteTaskById,
} from '@/services/task.services';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import Link from 'next/link';
import { IFiles, ITestCases } from '@/interface/task';
import { toast } from 'react-hot-toast';
import { NextRouter, useRouter } from 'next/router';

const PreviewTask = ({ id, isOpen, onClose }: any) => {
  const [taskDataById, setTaskDataById] = useState<any>({});
  const { user, isAuditor }: any = useAuth();
  const router: NextRouter = useRouter();
  const audit = user.username;

  useEffect(() => {
    const fetchDataById = async () => {
      try {
        const response = await getTaskById({ id });
        setTaskDataById(response);
      } catch (error) {
        return error;
      }
    };
    fetchDataById();
  }, [id]);

  const handleApprove = (id: string) => {
    try {
      handleApproveReject({
        id: id,
        data: { status: 'approve', draft: false },
      });
      toast.success('Already Approve');
      router.push('/profile');
    } catch (err) {
      return err;
    }
  };

  const handleReject = (id: string) => {
    try {
      handleApproveReject({
        id: id,
        data: { status: 'reject', draft: false },
      });
      toast.error('Aready Reject');
      router.push('/profile');
    } catch (err) {
      return err;
    }
  };

  const handleDelete = (id: string) => {
    try {
      deleteTaskById(id);
      toast.success('Delete Task Successfully');
      router.push('/profile');
    } catch (err: Error | any) {
      toast.error(err.message);
    }
  };

  return (
    <Fragment>
      <div
        className={`${
          isOpen ? 'flex' : 'hidden'
        } fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70`}
      >
        <div className="relative mx-20 mt-14 w-full xl:mx-40">
          <div className="relative rounded-lg bg-white">
            <div className="px-6 py-9 md:px-20 lg:px-28 xl:px-32">
              <div className="mt-2 mb-8 w-full">
                <h4 className="text-navy-700 px-2 text-xl font-bold dark:text-black">
                  {taskDataById.title}
                </h4>
                <p className="mt-2 px-2 text-base text-gray-600">
                  {taskDataById.description}
                </p>
              </div>
              <div className="grid w-full grid-cols-2 gap-4 px-2">
                <div className="shadow-3xl shadow-shadow-500 dark:!bg-navy-700 flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 dark:shadow-none">
                  <label className="text-sm text-gray-600">Author</label>
                  <p className="text-navy-700 text-base font-medium dark:text-black">
                    {taskDataById.author?.username}
                  </p>
                </div>

                <div className="shadow-3xl shadow-shadow-500 dark:!bg-navy-700 flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 dark:shadow-none">
                  <p className="text-sm text-gray-600">Level</p>
                  <p className="text-navy-700 text-base font-medium dark:text-black">
                    {taskDataById.level}
                  </p>
                </div>
              </div>
              <div className="shadow-3xl shadow-shadow-500 dark:!bg-navy-700 flex flex-col rounded-2xl bg-white bg-clip-border px-3 py-4 dark:shadow-none">
                <p className="text-sm text-gray-600">Solution Code</p>
                <SyntaxHighlighter language="c" style={vs2015}>
                  {taskDataById.solution_code}
                </SyntaxHighlighter>
              </div>

              <div className="grid w-full grid-cols-3 gap-2 px-2 py-4">
                <div className="shadow-3xl shadow-shadow-500 dark:!bg-navy-700 flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 dark:shadow-none">
                  <p className="text-sm text-gray-600">Task Category</p>
                  {taskDataById.tags &&
                    taskDataById.tags.map((val: string, index: number) => (
                      <li
                        className="text-navy-700 text-base font-medium dark:text-black"
                        key={index}
                      >
                        {val}
                      </li>
                    ))}
                </div>

                <div className="shadow-3xl shadow-shadow-500 dark:!bg-navy-700 flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 dark:shadow-none">
                  <p className="text-sm text-gray-600">Task Hints</p>
                  <p className="text-navy-700 text-base font-medium dark:text-black">
                    {taskDataById.hint}
                  </p>
                </div>

                <div className="shadow-3xl shadow-shadow-500 dark:!bg-navy-700 flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 dark:shadow-none">
                  <p className="text-sm text-gray-600">Task Status</p>
                  <p className="text-navy-700 text-base font-medium dark:text-black">
                    {taskDataById.status}
                  </p>
                </div>
              </div>

              <div>
                <div className="shadow-3xl shadow-shadow-500 dark:!bg-navy-700 flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 dark:shadow-none">
                  <p className="text-sm text-gray-600">Task Files</p>
                  {taskDataById.files &&
                    taskDataById.files.map((val: IFiles) => (
                      <p
                        className="text-navy-700 text-base font-medium dark:text-black"
                        key={val.key}
                      >
                        <Link href={val.url}>{val.url}</Link>
                      </p>
                    ))}
                </div>
              </div>
              <div className="grid w-full grid-cols-3 gap-2 px-2 py-4">
                {taskDataById.testcases &&
                  taskDataById.testcases.map(
                    (val: ITestCases, length: number) => (
                      <>
                        <div
                          className="shadow-3xl shadow-shadow-500 dark:!bg-navy-700 flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 dark:shadow-none"
                          key={length}
                        >
                          <p className="text-sm text-gray-600">
                            Task Input {length + 1}
                          </p>
                          <p className="text-navy-700 text-base font-medium dark:text-black">
                            {val.input}
                          </p>
                        </div>
                        <div
                          className="shadow-3xl shadow-shadow-500 dark:!bg-navy-700 flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 dark:shadow-none"
                          key={length}
                        >
                          <p className="text-sm text-gray-600">
                            Task Output {length + 1}
                          </p>
                          <p className="text-navy-700 text-base font-medium dark:text-black">
                            {val.output}
                          </p>
                        </div>
                        <div
                          className="shadow-3xl shadow-shadow-500 dark:!bg-navy-700 flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 dark:shadow-none"
                          key={length}
                        >
                          <p className="text-sm text-gray-600">Published</p>
                          <p className="text-navy-700 text-base font-medium dark:text-black">
                            {val.published ? 'Published' : 'Not Published'}
                          </p>
                        </div>
                      </>
                    ),
                  )}
              </div>
            </div>
            <div className="flex justify-between">
              <button
                className="m-5 rounded-xl border border-gray-200 bg-sky-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-800 focus:z-10 focus:outline-none focus:ring-4 focus:ring-sky-300 "
                onClick={onClose}
              >
                Close
              </button>
              {isAuditor ? (
                <div>
                  <button
                    className="m-5 rounded-xl border border-gray-200 bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:z-10 focus:outline-none focus:ring-4 focus:ring-green-300"
                    onClick={() => handleApprove(id)}
                  >
                    Approve
                  </button>
                  <button
                    className="m-5 rounded-xl border border-gray-200 bg-yellow-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-yellow-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-yellow-300"
                    onClick={() => handleReject(id)}
                  >
                    Reject
                  </button>
                  {audit === taskDataById.author?.username ? (
                    <button
                      className="m-5 rounded-xl border border-gray-200 bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-red-300"
                      onClick={() => handleDelete(id)}
                    >
                      Delete
                    </button>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PreviewTask;
