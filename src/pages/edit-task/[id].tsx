import { useState, useEffect, ChangeEvent, useRef } from 'react';
import { useRouter } from 'next/router';
import { Loading } from '@/components';
import { getTaskById, UpdateTaskById } from '@/services/task.services';
import { ParsedUrlQuery } from 'querystring';
import { FormType, testcase } from '@/interface/upload';
import { toast } from 'react-hot-toast';
import { IFiles } from '@/interface/task';
import { uploadFiles, deleteFiles } from '@/services/file.servies';
import Layouts from '@/layouts/Layouts';

interface TaskPageQuery extends ParsedUrlQuery {
  id: string;
}

function Task() {
  const [taskDataById, setTaskDataById] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query as TaskPageQuery;
  const inputRef = useRef<any>(null);
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
  console.log(taskDataById);
  const availableTags: string[] = [
    'Algorithm',
    'AI',
    'ci',
    'Computer Engineering',
    'Reverse Engineer',
    'Fun',
    'CTF',
    'crypto',
    'Forensics',
    'Web',
    'Pwn',
    'Misc',
    'OSINT',
    'Stego',
  ];
  const addTestCase = (e: any) => {
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
    } catch (err: Error | any) {
      return err;
    }
  };
  const removeTestCase = (e: any, index: number) => {
    try {
      e.preventDefault();
      const newTestCases = [...taskDataById.testcases];

      newTestCases.splice(index, 1);
      console.log(newTestCases);
      setTaskDataById({
        ...taskDataById,
        testcases: newTestCases as testcase[],
      });
      console.log(taskDataById.testcases);
    } catch (err: Error | any) {
      return err;
    }
  };

  const handleRemoveFile = (file: IFiles) => {
    console.log(file);
    try {
      const newFiles = [...taskDataById.files];
      const index = newFiles.findIndex((file: IFiles) => file.key === file.key);

      newFiles.splice(index, 1);
      setTaskDataById({ ...taskDataById, files: newFiles });
      const data = deleteFiles(file);

      if (taskDataById.files.length === 1) {
        (document.getElementById('fileInput') as HTMLInputElement).value = '';
      }
    } catch (err: Error | any) {
      return err;
    }
  };

  const handleTagClick = (tag: string, event: any) => {
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

  const submitTask = (e: any) => {
    try {
      e.preventDefault();
      console.log(taskDataById);
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
      let fileInput = document.getElementById('fileInput') as HTMLInputElement;
      let testCaseInput = document.getElementById(
        'testCaseInput0',
      ) as HTMLInputElement;

      let testCaseOutput = document.getElementById(
        'testCaseOutput0',
      ) as HTMLInputElement;

      fileInput.value = '';
      testCaseInput.value = '';
      testCaseOutput.value = '';
    } catch (err: Error | any) {
      return err;
    }
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Layouts>
          <div className="flex min-h-screen items-center justify-center bg-main-color px-6 pt-20">
            <div className="container mx-auto max-w-screen-lg">
              <div className="mb-6 rounded bg-white p-4 px-4 shadow-lg md:p-8">
                <form className="w-full">
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
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
                        <option defaultValue={1}>Level 1</option>
                        <option value={2}>Level 2</option>
                        <option value={3}>Level 3</option>
                      </select>
                    </div>
                  </div>
                  <div className="-mx-3 mb-6 flex flex-wrap">
                    <div className="w-full px-3">
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                        Task Tags
                      </label>
                      {availableTags.map((tag) => (
                        <button
                          className={`
                       relative mx-1 mb-2 inline-flex w-auto items-center justify-center rounded-full border border-transparent px-3 py-0.5 text-sm font-bold leading-6 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2
                       ${
                         taskDataById.tags.includes(tag)
                           ? 'bg-indigo-600'
                           : 'bg-gray-600'
                       }`}
                          key={tag}
                          onClick={(event: any) => handleTagClick(tag, event)}
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
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
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
                        className="block w-full rounded border border-gray-200 text-sm shadow-sm file:mr-4 file:border-0 file:bg-slate-600 file:py-3 file:px-4 file:text-white"
                        multiple
                        onChange={async (event: any) => {
                          const fileData = new FormData();

                          for (let i = 0; i < event.target.files.length; i++) {
                            fileData.append('files', event.target.files[i]);
                          }

                          try {
                            const data = await uploadFiles(fileData as any);
                            const newFiles = [...taskDataById.files, ...data];
                            setTaskDataById({
                              ...taskDataById,
                              files: newFiles as any[],
                            });
                            //console.log(taskDataById);
                          } catch (error) {
                            console.error(error);
                          }
                        }}
                        ref={inputRef}
                      />
                      {taskDataById.files.map((file: any, index: any) => (
                        <div className="mb-6 flex flex-wrap" key={index}>
                          <p>{file.key}</p>
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
                    {taskDataById.testcases.map((value: any, index: any) => {
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
                                    (item: any, i: number) => {
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
                              <label className="float-right mx-3 inline-block">
                                Publish
                                <input
                                  className="float-right mt-1 inline-block"
                                  type="checkbox"
                                  id={`testCaseOutput${index}`}
                                  checked={value.published}
                                  onChange={() =>
                                    setTaskDataById({
                                      ...taskDataById,
                                      testcases: taskDataById.testcases.map(
                                        (item: any, i: number) => {
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
                                    (item: any, i: number) => {
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
                              onClick={(e: any) => removeTestCase(e, index)}
                              className="ml-auto mt-3 rounded-full bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700"
                            >
                              Remove Test Case
                            </button>
                          ) : (
                            ''
                          )}
                        </li>
                      );
                    })}
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