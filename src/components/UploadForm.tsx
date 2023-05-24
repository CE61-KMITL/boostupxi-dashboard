import { ChangeEvent, useState, useRef, Fragment } from 'react';
import { LoadingFile } from '@/components';
import { InitialForm, AvariablesTags } from '@/constants/task';
import { IFiles } from '@/interface/task';
import { IForm, ITestCases } from '@/interface/upload';
import { createTask } from '@/services/task.services';
import { uploadFiles, deleteFiles } from '@/services/file.servies';
import { toast } from 'react-hot-toast';

const UploadForm = () => {
  const [formData, setFormData] = useState<IForm>(InitialForm);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const inputRef = useRef<null>(null);

  const addTestCase = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      setFormData({
        ...formData,
        testcases: [
          ...formData.testcases,
          { input: '', output: '', published: false },
        ],
      });
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
      const newTestCases = [...formData.testcases];
      newTestCases.splice(index, 1);
      setFormData({ ...formData, testcases: newTestCases as ITestCases[] });
    } catch (err) {
      return err;
    }
  };

  const handleRemoveFile = async (file: IFiles[]) => {
    try {
      const newFiles = [...formData.files];
      const index = newFiles.findIndex(
        (newFiles: IFiles) => newFiles.key === file[0].key,
      );

      newFiles.splice(index, 1);
      setFormData({ ...formData, files: newFiles });
      await deleteFiles(file);

      if (formData.files.length === 1) {
        (document.getElementById('fileInput') as HTMLInputElement).value = '';
      }
    } catch (err) {
      return err;
    }
  };

  const handleTagClick = (
    tag: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    if (formData.tags.includes(tag)) {
      setFormData({
        ...formData,
        tags: formData.tags.filter((item: string) => item !== tag),
      });
    } else {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
    }
  };

  const checkEnglishName = (name: string) => {
    const regex = /^[a-zA-Z0-9]+([ _-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;
    // const regex = /^[a-zA-Z0-9_]+$/;

    return regex.test(name);
  };

  const uploadFilesHandle = async (fileData: File[]) => {
    setIsUploading(true);
    try {
      const data = await uploadFiles(fileData);
      const newFiles = [...formData.files, ...data];
      setFormData({ ...formData, files: newFiles as IFiles[] });
      setIsUploading(false);
    } catch (error) {
      toast.error('Upload File Error \n Please upload image file or zip file');
    } finally {
      setIsUploading(false);
    }
  };
  const FormValidation = () => {
    if (formData.title === '') {
      toast.error('Please enter task name');
      return false;
    }
    if (formData.level === 0) {
      toast.error('Please enter task level');
      return false;
    }
    if (formData.tags.length === 0) {
      toast.error('Please enter task tags');
      return false;
    }
    if (formData.description === '') {
      toast.error('Please enter task description');
      return false;
    }
    if (formData.solution_code === '') {
      toast.error('Please enter task solution code');
      return false;
    }
    if (formData.testcases.length === 0) {
      toast.error('Please enter task testcases');
      return false;
    }
  };

  const submitTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (FormValidation() != false) {
      try {
        e.preventDefault();
        createTask(formData);
        toast.success('Create Task Success');

        setFormData({
          ...formData,
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
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);
      } catch (error) {
        toast.error('Create Task Error \n Please try again');
      }
    } else {
      return false;
    }
  };

  return (
    <Fragment>
      <div className="flex min-h-screen items-center justify-center  px-6 pt-20">
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
                    value={formData.title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setFormData({ ...formData, title: e.target.value });
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
                      setFormData({
                        ...formData,
                        level: parseInt(e.target.value),
                      });
                    }}
                    value={formData.level}
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
                  {AvariablesTags.map((tag) => (
                    <button
                      className={`
                       relative mx-1 mb-2 inline-flex w-auto items-center justify-center rounded-full border border-transparent px-3 py-0.5 text-sm font-bold leading-6 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2
                       ${
                         formData.tags.includes(tag)
                           ? 'bg-indigo-600'
                           : 'bg-gray-600'
                       }`}
                      key={tag}
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
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
                    value={formData.hint}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                      setFormData({ ...formData, hint: e.target.value });
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
                    value={formData.description}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                      setFormData({ ...formData, description: e.target.value });
                    }}
                    required
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
                        if (!checkEnglishName(event.target.files![i].name)) {
                          toast.error(
                            'File name is not in English.\n Please upload files with name in English',
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
                  {formData.files.map((file: IFiles, index: number) => (
                    <div className="my-5 flex flex-wrap" key={index}>
                      <p>
                        {file.key.split('~')[0] + '.' + file.key.split('.')[2]}
                      </p>
                      <br />
                      <button
                        type="button"
                        className="font-sm ml-4 inline-block rounded bg-red-600 px-5 py-1.5 text-xs uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg"
                        onClick={() => handleRemoveFile([file])}
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
                    value={formData.solution_code}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                      setFormData({
                        ...formData,
                        solution_code: e.target.value,
                      });
                    }}
                    required
                  ></textarea>
                </div>
              </div>

              <ul>
                {formData.testcases.map((value, index) => {
                  return (
                    <li className="-mx-3 mb-2 flex flex-wrap" key={index}>
                      <div className="mb-6 w-full px-3 md:w-1/2">
                        <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                          Test Case {index + 1} Input
                        </label>
                        <textarea
                          className="block w-full rounded border border-gray-300 bg-gray-50 p-2.5 pb-10 text-sm text-gray-900"
                          placeholder={`Test Case ${index + 1} Input`}
                          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                            setFormData({
                              ...formData,
                              testcases: formData.testcases.map((item, i) => {
                                if (i === index) {
                                  return { ...item, input: e.target.value };
                                }
                                return item;
                              }),
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
                                  setFormData({
                                    ...formData,
                                    testcases: formData.testcases.map(
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
                          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                            setFormData({
                              ...formData,
                              testcases: formData.testcases.map((item, i) => {
                                if (i === index) {
                                  return { ...item, output: e.target.value };
                                }
                                return item;
                              }),
                            });
                          }}
                          id={`testCaseOutput${index}`}
                          value={value.output}
                        ></textarea>
                      </div>

                      {formData.testcases.length > 1 ? (
                        <button
                          onClick={(e) => removeTestCase(e, index)}
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
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UploadForm;
