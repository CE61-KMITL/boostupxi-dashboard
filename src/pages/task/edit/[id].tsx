import { useState, useEffect, ChangeEvent, useRef } from 'react';
import { useRouter, NextRouter } from 'next/router';
import { LoadingFile } from '@/components';
import { AvariablesTags, Options, InitialTaskBtyId } from '@/constants/task';
import { ITestCases } from '@/interface/upload';
import { IFiles, ITaskByID } from '@/interface/task';
import Layouts from '@/layouts/Layouts';
import { getTaskById, UpdateTaskById } from '@/services/task.services';
import { uploadFiles, deleteFiles } from '@/services/file.servies';
import { ParsedUrlQuery } from 'querystring';
import { toast } from 'react-hot-toast';

interface TaskPageQuery extends ParsedUrlQuery {
  id: string;
}

function Task() {
  const [taskDataById, setTaskDataById] = useState<ITaskByID>(InitialTaskBtyId);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router: NextRouter = useRouter();
  const { id } = router.query as TaskPageQuery;
  const inputRef = useRef<null>(null);
  const [removeAfterUpdate, setremoveAfterUpdate] = useState<IFiles[]>([]);

  useEffect(() => {
    const fetchDataById = async () => {
      try {
        const response = await getTaskById({ id });
        setTaskDataById(response);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchDataById();
  }, [id]);
  const FormValidation = () => {
    if (taskDataById.title === '') {
      toast.error('Please enter task name');
      return false;
    }
    if (taskDataById.level === 0) {
      toast.error('Please enter task level');
      return false;
    }
    if (taskDataById.tags.length === 0) {
      toast.error('Please enter task tags');
      return false;
    }
    if (taskDataById.description === '') {
      toast.error('Please enter task description');
      return false;
    }
    if (taskDataById.solution_code === '') {
      toast.error('Please enter task solution code');
      return false;
    }
    if (taskDataById.testcases.length === 0) {
      toast.error('Please enter task testcases');
      return false;
    }
  };
  const uploadFilesHandle = async (fileData: File[]) => {
    setIsUploading(true);
    try {
      const data = await uploadFiles(fileData);
      const newFiles = [...taskDataById.files, ...data];
      setTaskDataById({ ...taskDataById, files: newFiles as IFiles[] });
      setIsUploading(false);
    } catch (error) {
      toast.error('Upload File Error \n Please upload image file or zip file');
    } finally {
      setIsUploading(false);
    }
  };
  const addTestCase = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      setTaskDataById({
        ...taskDataById,
        testcases: [
          ...taskDataById.testcases,
          { input: '', output: '', published: false },
        ],
      });
      toast.success('Add Test Case');
    } catch (err) {
      return err;
    }
  };
  const removeTestCase = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    try {
      e.preventDefault();
      const newTestCases = [...taskDataById.testcases];
      newTestCases.splice(index, 1);
      setTaskDataById({
        ...taskDataById,
        testcases: newTestCases as ITestCases[],
      });
    } catch (err) {
      return err;
    }
  };

  const handleRemoveFile = (file: IFiles) => {
    try {
      const newFiles = [...taskDataById.files];
      const index = newFiles.findIndex(
        (newFiles: IFiles) => newFiles.key === file.key,
      );

      newFiles.splice(index, 1);
      setTaskDataById({ ...taskDataById, files: newFiles });
      //const data = deleteFiles(file);
      setremoveAfterUpdate([...removeAfterUpdate, file]);
      if (taskDataById.files.length === 1) {
        (document.getElementById('fileInput') as HTMLInputElement).value = '';
      }
    } catch (err) {
      return err;
    }
  };
  const RemoveFileAfterUpdate = async () => {
    try {
      await deleteFiles(removeAfterUpdate);
    } catch (err) {}
  };

  const handleTagClick = (
    tag: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    if (taskDataById.tags.includes(tag)) {
      setTaskDataById({
        ...taskDataById,
        tags: taskDataById.tags.filter((item: string) => item !== tag),
      });
    } else {
      setTaskDataById({ ...taskDataById, tags: [...taskDataById.tags, tag] });
    }
  };
  const checkFileName = (name: string) => {
    const regex = /^boostup_[a-zA-Z0-9_]+\.(png|jpeg|jpg|zip)$/;
    return regex.test(name);
  };

  const submitTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (FormValidation() != false) {
      try {
        e.preventDefault();
        RemoveFileAfterUpdate();
        UpdateTaskById(taskDataById, id);
        toast.success('Update Task Success');
        setTaskDataById({
          ...taskDataById,
          title: '',
          level: 1,
          tags: [],
          hint: '',
          description: '',
          files: [],
          testcases: [{ input: '', output: '', published: false }],
          solution_code: '',
        });
        let fileInput = document.getElementById(
          'fileInput',
        ) as HTMLInputElement;
        let testCaseInput = document.getElementById(
          'testCaseInput0',
        ) as HTMLInputElement;

        let testCaseOutput = document.getElementById(
          'testCaseOutput0',
        ) as HTMLInputElement;

        fileInput.value = '';
        testCaseInput.value = '';
        testCaseOutput.value = '';
        router.push('/dashboard');
      } catch (err) {
        return err;
      }
    }
  };
  return (
    <>
      {isLoading ? (
        <LoadingFile />
      ) : (
        <Layouts>
          <div className="flex min-h-screen items-center justify-center overflow-y-auto px-6 pt-20">
            <div className="container mx-auto max-w-screen-lg">
              <div className="mb-6 rounded bg-white p-4 px-4 shadow-lg md:p-8">
                <form className="w-full">
                  <div className="-mx-3 mb-5 flex justify-between border-b-2 border-gray-800 pb-2">
                    <p className="flex items-start justify-start">
                      Author : {taskDataById.author.username}
                    </p>
                    <p className="flex items-end justify-end">
                      Last updated :{' '}
                      {new Date(taskDataById.updatedAt).toLocaleString(
                        'en-us',
                        Options,
                      )}
                    </p>
                  </div>

                  <div className="-mx-3 mb-6 flex flex-wrap">
                    <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                        Task Name
                      </label>
                      <input
                        type="text"
                        name="title"
                        className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                        placeholder="Task Name"
                        value={taskDataById.title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setTaskDataById({
                            ...taskDataById,
                            title: e.target.value,
                          });
                        }}
                        required
                      />
                    </div>

                    <div className="w-full px-3 md:w-1/2">
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                        Task Level
                      </label>
                      <select
                        className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                          setTaskDataById({
                            ...taskDataById,
                            level: parseInt(e.target.value),
                          });
                        }}
                        value={taskDataById.level}
                        required
                      >
                        <option value={1}>Level 1</option>
                        <option value={2}>Level 2</option>
                        <option value={3}>Level 3</option>
                        <option value={4}>Level 4</option>
                        <option value={5}>Level 5</option>
                      </select>
                    </div>
                  </div>
                  <div className="-mx-3 mb-6 flex flex-wrap">
                    <div className="w-full px-3">
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                        Task Tags
                      </label>
                      {AvariablesTags.map((tag: string) => (
                        <button
                          className={`
                       relative mx-1 mb-2 inline-flex w-auto items-center justify-center rounded-full border border-transparent px-3 py-0.5 text-sm font-bold leading-6 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2
                       ${
                         taskDataById.tags.includes(tag)
                           ? 'bg-indigo-600'
                           : 'bg-gray-600'
                       }`}
                          key={tag}
                          onClick={(
                            event: React.MouseEvent<HTMLButtonElement>,
                          ) => handleTagClick(tag, event)}
                          style={{ cursor: 'pointer' }}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="-mx-3 mb-6 flex flex-wrap">
                    <div className="w-full px-3">
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                        Task Hints
                      </label>
                      <textarea
                        className="block w-full rounded border border-gray-300 bg-gray-50 p-2.5 pb-10 text-sm text-gray-900"
                        placeholder="Task Hint"
                        value={taskDataById.hint}
                        onChange={(
                          e: React.ChangeEvent<HTMLTextAreaElement>,
                        ) => {
                          setTaskDataById({
                            ...taskDataById,
                            hint: e.target.value,
                          });
                        }}
                      ></textarea>
                    </div>
                  </div>

                  <div className="-mx-3 mb-6 flex flex-wrap">
                    <div className="w-full px-3">
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                        Task Description
                      </label>
                      <textarea
                        className="block w-full rounded border border-gray-300 bg-gray-50 p-2.5 pb-24 text-sm text-gray-900"
                        placeholder="Task Description"
                        value={taskDataById.description}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                          setTaskDataById({
                            ...taskDataById,
                            description: e.target.value,
                          });
                        }}
                      ></textarea>
                    </div>
                  </div>

                  <div className="-mx-3 mb-6 flex flex-wrap">
                    <div className="w-full px-3">
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                        Task Files
                      </label>
                      <input
                        type="file"
                        name="fileInput"
                        id="fileInput"
                        accept=".jpg,.png,.zip,.jpeg"
                        className="block w-full rounded border border-gray-200 text-sm shadow-sm file:mr-4 file:border-0 file:bg-slate-600 file:py-3 file:px-4 file:text-white"
                        multiple
                        onChange={async (
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                          const fileData = new FormData();
                          for (let i = 0; i < event.target.files!.length; i++) {
                            fileData.append(
                              'files',
                              event.target.files![i] as File,
                            );

                            if (event.target.files![i].size > 1024 * 1024 * 5) {
                              toast.error('File size is too large.');
                              return;
                            }
                            if (event.target.files![i].name.length > 50) {
                              toast.error(
                                'File name is too long. Please upload files with name less than 50 characters',
                              );
                              return;
                            }
                            if (!checkFileName(event.target.files![i].name)) {
                              toast.error(
                                'File name is not recognized. Please upload files follow this format',
                              );
                              return;
                            }
                          }
                          if (fileData.getAll('files').length > 0) {
                            uploadFilesHandle(fileData as unknown as File[]);
                          }
                        }}
                        ref={inputRef}
                      />
                      {isUploading && <LoadingFile />}
                      {taskDataById.files.map((file: IFiles, index: number) => (
                        <div className="my-5 flex flex-wrap" key={index}>
                          <p>
                            {file.key.split('~')[0] +
                              '.' +
                              file.key.split('.')[2]}
                          </p>
                          <br />
                          <button
                            type="button"
                            className="font-sm ml-4 inline-block rounded bg-red-600 px-5 py-1.5 text-xs uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg"
                            onClick={() => handleRemoveFile(file)}
                          >
                            remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="-mx-3 mb-2 flex flex-wrap">
                    <div className="w-full px-3">
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                        Solution Code
                      </label>
                      <textarea
                        className="block w-full rounded border border-gray-300 bg-gray-50 p-2.5 pb-24 text-sm text-gray-900"
                        placeholder="Solution Code"
                        value={taskDataById.solution_code}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                          setTaskDataById({
                            ...taskDataById,
                            solution_code: e.target.value,
                          });
                        }}
                      ></textarea>
                    </div>
                  </div>

                  <ul>
                    {taskDataById.testcases.map(
                      (value: ITestCases, index: number) => {
                        return (
                          <li className="-mx-3 mb-2 flex flex-wrap" key={index}>
                            <div className="mb-6 w-full px-3 md:w-1/2">
                              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                                Test Case {index + 1} Input
                              </label>
                              <textarea
                                className="block w-full rounded border border-gray-300 bg-gray-50 p-2.5 pb-10 text-sm text-gray-900"
                                placeholder={`Test Case ${index + 1} Input`}
                                onChange={(
                                  e: ChangeEvent<HTMLTextAreaElement>,
                                ) => {
                                  setTaskDataById({
                                    ...taskDataById,
                                    testcases: taskDataById.testcases.map(
                                      (item: ITestCases, i: number) => {
                                        if (i === index) {
                                          return {
                                            ...item,
                                            input: e.target.value,
                                          };
                                        }
                                        return item;
                                      },
                                    ),
                                  });
                                }}
                                id={`testCaseInput${index}`}
                                value={value.input}
                              ></textarea>
                            </div>

                            <div className="mb-6 w-full px-3 md:w-1/2">
                              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                                Test Case {index + 1} Output
                                <div className="float-right inline-block">
                                  <label className="mx-3 mt-2 inline-block">
                                    Publish
                                    <input
                                      className="float-left mx-1 inline-block px-2"
                                      type="checkbox"
                                      id={`testCaseOutput${index}`}
                                      checked={value.published}
                                      onChange={() =>
                                        setTaskDataById({
                                          ...taskDataById,
                                          testcases: taskDataById.testcases.map(
                                            (item, i) => {
                                              if (i === index) {
                                                return {
                                                  ...item,
                                                  published: !item.published,
                                                };
                                              }
                                              return item;
                                            },
                                          ),
                                        })
                                      }
                                    />
                                  </label>
                                </div>
                              </label>

                              <textarea
                                className="block w-full rounded border border-gray-300 bg-gray-50 p-2.5 pb-10 text-sm text-gray-900"
                                placeholder={`Test Case ${index + 1} Output`}
                                onChange={(
                                  e: ChangeEvent<HTMLTextAreaElement>,
                                ) => {
                                  setTaskDataById({
                                    ...taskDataById,
                                    testcases: taskDataById.testcases.map(
                                      (item: ITestCases, i: number) => {
                                        if (i === index) {
                                          return {
                                            ...item,
                                            output: e.target.value,
                                          };
                                        }
                                        return item;
                                      },
                                    ),
                                  });
                                }}
                                id={`testCaseOutput${index}`}
                                value={value.output}
                              ></textarea>
                            </div>

                            {index != 0 ? (
                              <button
                                onClick={(
                                  e: React.MouseEvent<HTMLButtonElement>,
                                ) => removeTestCase(e, index)}
                                className="ml-auto mt-3 rounded-full bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700"
                              >
                                Remove Test Case
                              </button>
                            ) : (
                              ''
                            )}
                          </li>
                        );
                      },
                    )}
                  </ul>
                  <div className="mb-6 flex flex-wrap">
                    <button
                      onClick={addTestCase}
                      className="rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                    >
                      Add Test Case
                    </button>
                  </div>
                </form>

                <div className="mb-3 text-center text-sm font-medium text-black">
                  <p>
                    ** หมายเหตุ: ชื่อไฟล์จะต้องเป็น Format
                    boostup_[filename].[jpeg or jpg or png or zip]
                    นี้เท่านั้นนะครับ และชื่อไฟล์ต้องเป็น
                    <span className="font-bold text-red-500">
                      ภาษาอังกฤษเท่านั้น
                    </span>{' '}
                    **{' '}
                  </p>
                  <p>Example</p>
                  <p>boostup_example1.jpg ✅</p>
                  <p>myfilehello.png ❌</p>
                </div>

                <div className="text-right md:col-span-5">
                  <div className="inline-flex items-end">
                    <button
                      className="rounded bg-main-color py-2 px-4 font-bold text-white hover:bg-second-color hover:text-main-color"
                      type="button"
                      onClick={submitTask}
                    >
                      Update Task
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layouts>
      )}
    </>
  );
}

export default Task;
