import { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import Image from 'next/image';
import { InitialTaskBtyId, Options } from '@/constants/task';
import { useAuth } from '@/contexts/auth';
import { IFiles, ITaskByID, ITestCases, IComment } from '@/interface/task';
import {
  getTaskById,
  handleApproveReject,
  adminHandleApproveReject,
  deleteTaskById,
  createComment,
  deleteComment,
  editComment,
} from '@/services/task.services';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { toast } from 'react-hot-toast';
import Avatar from '/public/avatar-image.jpg';
import Zip from '/public/zip-icon.svg';

interface Props {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

const PreviewTask = ({ id, isOpen, onClose }: Props) => {
  const [taskDataById, setTaskDataById] = useState<ITaskByID>(InitialTaskBtyId);
  const [comments, setComments] = useState<IComment[]>([]);
  const [commentsId, setCommentsId] = useState<string>('');
  const [commentMessage, setCommentMessage] = useState<string>('');
  const [updateCommentMessage, setUpdateCommentMessage] = useState<string>('');
  const [actionState, setActionState] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { user, isAuditor, isAdmin } = useAuth();
  const router: NextRouter = useRouter();

  const audit: string = user.username;
  const reviewer: string = user.username;

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

    if (actionState) {
      fetchDataById();
      setActionState(false);
    }
  }, [actionState, id]);

  const routeHandler = () => {
    if (router.pathname == '/profile') {
      setTimeout(() => {
        window.location.href = '/profile';
      }, 1000);
    } else {
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000);
    }
  };

  const handleApprove = (id: string) => {
    try {
      handleApproveReject({
        id: id,
        data: { status: 'approved', draft: false },
      });
      toast.success('Approved Succesfully');
      routeHandler();
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
      toast.success('Rejected Succesfully');
      routeHandler();
    } catch (err) {
      return err;
    }
  };

  const handleAdminApprove = (id: string) => {
    try {
      adminHandleApproveReject({
        id: id,
        data: { draft: false },
      });
      toast.success('Deploy Succesfully');
      routeHandler();
    } catch (err) {
      return err;
    }
  };

  const handleAdminReject = (id: string) => {
    try {
      adminHandleApproveReject({
        id: id,
        data: { draft: true },
      });
      toast.success('Cancel Deploy Succesfully');
      routeHandler();
    } catch (err) {
      return err;
    }
  };

  const handleSubmitComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      setLoading(true);
      e.preventDefault();
      createComment(id, { message: commentMessage });
      setCommentMessage('');
      toast.success('Comment Successfully');
      setActionState(true);
      setLoading(false);
    } catch (err) {
      return err;
      setLoading(false);
    }
  };

  const handleDeleteComment = (comment_id: string, task_id: string) => {
    try {
      deleteComment(comment_id, task_id);
      toast.success('Comment deleted successfully');
      setActionState(true);
    } catch (err) {
      toast.error('Failed to delete comment');
    }
  };

  const handleEditComment = (comment_id: string, task_id: string) => {
    try {
      editComment(comment_id, task_id, { message: updateCommentMessage });
      toast.success('Comment updated successfully');
      setIsEdit(false);
      setActionState(true);
    } catch (err) {
      toast.error('Failed to update comment');
    }
  };

  const handleDelete = (id: string) => {
    try {
      deleteTaskById(id);
      toast.success('Delete Task Successfully');
      if (router.pathname == '/profile') {
        setTimeout(() => {
          window.location.href = '/profile';
        }, 1000);
      } else {
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);
      }
    } catch (err) {
      return err;
    }
  };

  const handleEditClick = (id: string) => {
    const comment = comments.find((val) => val.id === id);
    if (comment) {
      setUpdateCommentMessage(comment.message);
    }
    setIsEdit(!isEdit);
    setCommentsId(id);
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
                  <p>
                    Last updated :{' '}
                    {new Date(taskDataById.updatedAt).toLocaleString(
                      'en-TH',
                      Options,
                    )}
                  </p>
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
                <h4 className="text-navy-700 px-2 text-xl font-bold text-black">
                  {taskDataById.title}
                </h4>
                <p className="mt-2 px-2 text-base text-gray-600">
                  {taskDataById.description}
                </p>
              </div>
              <div className="grid w-full grid-cols-2 gap-4 px-2">
                <div className="shadow-3xl shadow-shadow-500 !bg-navy-700 flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-none">
                  <label className="text-sm text-gray-600">Author</label>
                  <p className="text-navy-700 text-base font-medium text-black">
                    {taskDataById.author?.username}
                  </p>
                </div>

                <div className="shadow-3xl shadow-shadow-500 !bg-navy-700 flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-none">
                  <p className="text-sm text-gray-600">Level</p>
                  <p className="text-navy-700 text-base font-medium text-black">
                    {taskDataById.level}
                  </p>
                </div>
              </div>
              <div className="shadow-3xl shadow-shadow-500 !bg-navy-700 flex flex-col rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-none">
                <p className="text-sm text-gray-600">Solution Code</p>
                <SyntaxHighlighter language="c" style={vs2015}>
                  {taskDataById.solution_code}
                </SyntaxHighlighter>
              </div>

              <div className="grid w-full grid-cols-2 gap-2 px-2 py-4">
                <div className="shadow-3xl shadow-shadow-500 !bg-navy-700 flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-none">
                  <p className="text-sm text-gray-600">Task Category</p>
                  {taskDataById.tags &&
                    taskDataById.tags.map((val: string, index: number) => (
                      <li
                        className="text-navy-700 text-base font-medium text-black"
                        key={index}
                      >
                        {val}
                      </li>
                    ))}
                </div>

                <div className="shadow-3xl shadow-shadow-500 !bg-navy-700 flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-none">
                  <p className="text-sm text-gray-600">Task Status</p>
                  <p className="text-navy-700 text-base font-medium text-black">
                    {taskDataById.status}
                  </p>
                </div>
              </div>

              <div>
                <div className="shadow-3xl shadow-shadow-500 !bg-navy-700 flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-none">
                  <p className="text-sm text-gray-600">Task Hints</p>
                  <p className="text-navy-700 text-base font-medium text-black">
                    {taskDataById.hint}
                  </p>
                </div>
              </div>

              <div>
                <div className="shadow-3xl shadow-shadow-500 !bg-navy-700 items-start justify-center space-x-3 rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-none">
                  <p className="text-sm text-gray-600">Task Files</p>
                  {taskDataById.files &&
                    taskDataById.files.map((files: IFiles) => (
                      <Link
                        href={files.url}
                        className="text-dark mt-4 inline-flex items-center justify-center rounded-md border border-transparent bg-slate-200 text-base font-medium shadow-sm hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        key={files.key}
                      >
                        {files.url.split('.').pop() === 'jpg' ||
                        files.url.split('.').pop() === 'png' ||
                        files.url.split('.').pop() === 'jpeg' ? (
                          <Image
                            src={files.url}
                            height={100}
                            width={100}
                            alt={files.key}
                            className="m-4 h-16 w-16 rounded-lg object-cover"
                          />
                        ) : (
                          <Image
                            src={Zip}
                            height={100}
                            width={100}
                            alt={files.key}
                            className=" m-4 h-16 w-16 rounded-lg object-cover"
                          />
                        )}
                      </Link>
                    ))}
                </div>
              </div>
              <div className="grid w-full grid-cols-3 gap-2 px-2 py-4">
                {taskDataById.testcases &&
                  taskDataById.testcases.map(
                    (val: ITestCases, index: number) => (
                      <Fragment key={index}>
                        <div className="shadow-3xl shadow-shadow-500 !bg-navy-700 flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-none">
                          <p className="text-sm text-gray-600">
                            Task Input {length + 1}
                          </p>
                          <textarea
                            value={val.input}
                            className="text-navy-700 text-base font-medium text-black focus:outline-none"
                            readOnly
                          ></textarea>
                        </div>
                        <div className="shadow-3xl shadow-shadow-500 !bg-navy-700 flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-none">
                          <p className="text-sm text-gray-600">
                            Task Output {length + 1}
                          </p>
                          <textarea
                            className="text-navy-700 text-base font-medium text-black focus:outline-none"
                            readOnly
                            value={val.output}
                          ></textarea>
                        </div>
                        <div className="shadow-3xl shadow-shadow-500 !bg-navy-700 flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-none">
                          <p className="text-sm text-gray-600">Published</p>
                          <textarea
                            className="text-navy-700 text-base font-medium text-black focus:outline-none"
                            readOnly
                            value={
                              val.published ? 'Published' : 'Not Published'
                            }
                          ></textarea>
                        </div>
                      </Fragment>
                    ),
                  )}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex justify-start">
                {isAdmin && (
                  <div>
                    {taskDataById.draft ? (
                      <button
                        className="m-5 rounded-xl border border-gray-200 bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:z-10 focus:outline-none focus:ring-4 focus:ring-green-300"
                        onClick={() => handleAdminApprove(id)}
                      >
                        Publish
                      </button>
                    ) : (
                      <button
                        className="m-5 rounded-xl border border-gray-200 bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:z-10 focus:outline-none focus:ring-4 focus:ring-red-300"
                        onClick={() => handleAdminReject(id)}
                      >
                        Draft
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                {((isAuditor && audit !== taskDataById.author?.username) ||
                  (isAdmin && audit !== taskDataById.author?.username)) && (
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
                )}
                {audit === taskDataById.author?.username && (
                  <button
                    className="m-5 rounded-xl border border-gray-200 bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-red-300"
                    onClick={() => handleDelete(id)}
                  >
                    Delete
                  </button>
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
                    onClick={handleSubmitComment}
                    disabled={!commentMessage}
                  >
                    {loading ? (
                      <div className="text-center">
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="mr-2 inline h-8 w-8 animate-spin fill-blue-600 text-gray-200"
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
                      'Post Comment'
                    )}
                  </button>
                </form>
                {comments &&
                  comments.map((val: IComment) => (
                    <div key={val.id}>
                      <article className="mb-6 rounded-lg bg-white p-6 text-base ">
                        <footer className="mb-2 flex items-center justify-between">
                          <div className="flex items-center">
                            <p className="mr-3 inline-flex items-center text-xl text-gray-900 ">
                              <Image
                                src={Avatar}
                                alt={'Avatar Image'}
                                width={1000}
                                className="mr-2 h-6 w-6 rounded-full"
                              />

                              {val.author?.username}
                            </p>
                            <p className="text-sm text-gray-600 ">
                              <time
                                title={new Date(val.updatedAt).toLocaleString()}
                              >
                                {new Date(val.updatedAt).toLocaleString(
                                  'en-TH',
                                  Options,
                                )}
                              </time>
                            </p>
                          </div>
                          {val.author?.username === reviewer && (
                            <div className="items-end justify-end space-x-3 rounded-lg bg-white p-2 text-center text-sm font-medium focus:outline-none focus:ring-4 ">
                              <button
                                type="button"
                                onClick={() => handleEditClick(val.id)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  className="h-6 w-6 text-yellow-600"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                  />
                                </svg>
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleDeleteComment(val.id, taskDataById._id)
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  className="h-6 w-6 text-red-600"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                              </button>
                            </div>
                          )}
                        </footer>
                        {isEdit && val.id == commentsId ? (
                          <div>
                            <textarea
                              className="w-full rounded-xl border-2 border-black px-5 py-2 pt-2 text-xl text-gray-700 focus:outline-none focus:ring-0"
                              placeholder="Write a comment..."
                              required
                              value={updateCommentMessage}
                              onChange={(
                                e: React.ChangeEvent<HTMLTextAreaElement>,
                              ) => {
                                setUpdateCommentMessage(e.target.value);
                              }}
                            ></textarea>
                            <div className="mt-3 flex items-end justify-end">
                              <button
                                type="button"
                                className=" inline-block rounded bg-blue-600 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                                onClick={() =>
                                  handleEditComment(val.id, taskDataById._id)
                                }
                              >
                                Updated Comment
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-xl text-gray-600">{val.message}</p>
                        )}
                      </article>
                      <hr />
                    </div>
                  ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PreviewTask;
