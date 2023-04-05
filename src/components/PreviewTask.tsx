import { useState, useEffect, Fragment } from 'react';
import { useAuth } from '@/contexts/auth';
import {
  getTaskById,
  handleApproveReject,
  deleteTaskById,
  createComment,
} from '@/services/task.services';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import Link from 'next/link';
import { IFiles, ITaskByID, ITestCases } from '@/interface/task';
import { toast } from 'react-hot-toast';
import { NextRouter, useRouter } from 'next/router';
import { InitialTaskBtyId } from '@/constants/task';
import { Comment } from '@/components';
import { IComment } from '@/interface/task';

interface Props {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

const PreviewTask = ({ id, isOpen, onClose }: Props) => {
  const [taskDataById, setTaskDataById] = useState<ITaskByID>(InitialTaskBtyId);
  const [comments, setComments] = useState<IComment[]>([]);
  const [commentMessage, setCommentMessage] = useState<string>('');
  const { user, isAuditor } = useAuth();
  const router: NextRouter = useRouter();
  const audit: string = user.username;

  useEffect(() => {
    const fetchDataById = async () => {
      try {
        const response = await getTaskById({ id });
        setTaskDataById(response);
        setComments(response.comments);
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
        data: { status: 'approved', draft: false },
      });
      toast.success('Already Approve');
      if (router.pathname == '/profile') {
        window.location.href = '/profile';
      } else {
        window.location.href = '/dashboard';
      }
    } catch (err) {
      return err;
    }
  };

  const handleReject = (id: string) => {
    try {
      handleApproveReject({
        id: id,
        data: { status: 'rejected', draft: false },
      });
      toast.error('Already Reject');
      if (router.pathname == '/profile') {
        window.location.href = '/profile';
      } else {
        window.location.href = '/dashboard';
      }
    } catch (err) {
      return err;
    }
  };

  const submitComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      createComment(id, { message: commentMessage });
      setCommentMessage('');
      toast.success('Comment Successfully');
    } catch (err) {
      return err;
    }
  };

  const handleDelete = (id: string) => {
    try {
      deleteTaskById(id);
      toast.success('Delete Task Successfully');
      if (router.pathname == '/profile') {
        window.location.href = '/profile';
      } else {
        window.location.href = '/dashboard';
      }
    } catch (err) {
      return err;
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
              <div className="-mx-3 mb-5 flex justify-between border-b-2 border-gray-800 pb-2 text-base text-black">
                <div className="flex items-start justify-start space-x-10">
                  <p>Author : {taskDataById.author.username}</p>
                  <p>Last updated : {taskDataById.createdAt}</p>
                </div>
                <button
                  className="flex items-end justify-end text-black hover:text-gray-400 focus:outline-none"
                  onClick={onClose}
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
              </div>
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
                          <textarea
                            className="text-navy-700 pb-10 text-base font-medium focus:outline-none dark:text-black"
                            readOnly
                          >
                            {val.output}
                          </textarea>
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
            <section className="bg-white py-8 lg:py-16">
              <div className="mx-auto max-w-7xl px-4">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900  lg:text-2xl">
                    Comment ({comments.length})
                  </h2>
                </div>
                <form className="mb-6">
                  <div className="mb-4 rounded-lg rounded-t-lg border border-gray-200 bg-white py-2 px-4  ">
                    <textarea
                      className="w-full border-0 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0"
                      placeholder="Write a comment..."
                      required
                      value={commentMessage}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        setCommentMessage(e.target.value);
                      }}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className=" focus:ring-primary-200  hover:bg-primary-800 inline-flex items-center rounded-lg bg-blue-700 py-2.5 px-4 text-center text-base font-medium text-white focus:ring-4"
                    onClick={submitComment}
                  >
                    Post comment
                  </button>
                </form>
                {comments &&
                  comments.map((val: IComment) => (
                    <Comment
                      key={val.id}
                      taskId={taskDataById._id}
                      id={val.id}
                      message={val.message}
                      author={val.author}
                      createdAt={val.createdAt}
                      updatedAt={val.updatedAt}
                    />
                  ))}
              </div>
            </section>
            <div className="flex justify-end">
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
                </div>
              ) : null}
              {audit === taskDataById.author?.username ? (
                <button
                  className="m-5 rounded-xl border border-gray-200 bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-red-300"
                  onClick={() => handleDelete(id)}
                >
                  Delete
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PreviewTask;
