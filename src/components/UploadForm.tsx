import { ChangeEvent, useState, useRef, Fragment } from 'react';
import { NextPage } from 'next';
import { FormType } from '@/interface/task';

const UploadForm: NextPage = () => {
  // Constants
  let formInitial: FormType = {
    task_name: '',
    task_level: 1,
    task_tags: [],
    task_hint: '',
    task_desc: '',
    files: [],
    taskIO: [{ id: '1', input: '', output: '' }],
    author: '',
  };

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

  const [formData, setFormData] = useState<FormType>(formInitial);
  const inputRef = useRef<any>(null);

  const addTestCase = (e: any) => {
    try {
      e.preventDefault();
      setFormData({
        ...formData,
        taskIO: [
          ...formData.taskIO,
          { id: String(formData.taskIO.length + 1), input: '', output: '' },
        ],
      });
    } catch (err: Error | any) {
      return (
        <div className="alert alert-success shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Your purchase has been confirmed!</span>
          </div>
        </div>
      );
    }
  };

  const removeTestCase = (e: any, id: string) => {
    try {
      e.preventDefault();
      setFormData({
        ...formData,
        taskIO: formData.taskIO.filter((item: any) => item.id !== id),
      });
    } catch (err: Error | any) {
      return err;
    }
  };

  // const handleFileChange = (e: any) => {
  //   try {
  //     const newFiles = [...selectedFiles].concat(Array.from(e.target.files));
  //     setSelectedFiles(newFiles);
  //     console.log(newFiles);
  //     setFormData({ ...formData, files: newFiles });
  //     console.log(formData);
  //   } catch (err: Error | any) {
  //     console.log(err);
  //   }
  // };

  const handleRemoveFile = (index: number) => {
    try {
      const newFiles = [...formData.files];
      newFiles.splice(index, 1);
      setFormData({ ...formData, files: newFiles });
      if (formData.files.length === 1) {
        (document.getElementById('fileInput') as HTMLInputElement).value = '';
      }
    } catch (err: Error | any) {
      return err;
    }
  };

  const handleTagClick = (tag: string, event: any) => {
    event.preventDefault();
    if (formData.task_tags.includes(tag)) {
      setFormData({
        ...formData,
        task_tags: formData.task_tags.filter((item: string) => item !== tag),
      });
    } else {
      setFormData({ ...formData, task_tags: [...formData.task_tags, tag] });
    }
  };

  const submitTask = (e: any) => {
    try {
      e.preventDefault();
      setFormData({
        ...formData,
        task_name: '',
        task_level: 1,
        task_tags: [],
        task_hint: '',
        task_desc: '',
        files: [],
        taskIO: [{ id: '1', input: '', output: '' }],
        author: '',
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
      return formData;
    } catch (err: Error | any) {
      return err;
    }
  };

  return (
    <Fragment>
      <form>
        <h3 className="font-medium leading-tight text-3xl mt-0 mb-2 text-blue-600">
          Task Upload
        </h3>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 pr-2">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Task Name
            </label>
            <input
              className="appearance-none lock w-full bg-gray-200 text-gray-700 border  rounded py-2.5 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Task Name"
              value={formData.task_name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setFormData({ ...formData, task_name: e.target.value });
              }}
              required
            />
          </div>
          <div className="w-full md:w-1/2 mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Task Level
            </label>
            <select
              className="block  lock w-full bg-gray-200  border-gray-200 text-gray-700 py-2.5 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setFormData({
                  ...formData,
                  task_level: parseInt(e.target.value),
                });
              }}
              value={formData.task_level}
            >
              <option value={1}>Level 1</option>
              <option value={2}>Level 2</option>
              <option value={3}>Level 3</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-6 md:mb-0">
            Task Tags
          </label>
        </div>

        <div className="flex flex-wrap mb-6">
          {availableTags.map((tag) => (
            <button
              className={`
              relative mx-1 inline-flex items-center justify-center w-full px-3 py-0.5 mb-2 text-sm font-bold leading-6 text-white  border border-transparent rounded-full md:w-auto  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 
              ${
                formData.task_tags.includes(tag)
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

        <div className="flex flex-wrap mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-6 md:mb-0">
            Task Hint
          </label>
          <textarea
            className="block w-full text-sm py-3 px-4 pr-8 md:mb-0 text-gray-900 rounded-lg bg-gray-200 border border-gray-200 focus:text-black focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Task Hint"
            value={formData.task_hint}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setFormData({ ...formData, task_hint: e.target.value });
            }}
          />
        </div>

        <div className="flex flex-wrap mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-6 md:mb-0">
            Task Descprtion
          </label>
          <textarea
            key="task_desc"
            rows={10}
            className="block w-full text-sm py-3 px-4 pr-8 md:mb-0 text-gray-900 rounded-lg bg-gray-200 border border-gray-200 focus:text-black focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Task Description"
            value={formData.task_desc}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setFormData({ ...formData, task_desc: e.target.value });
            }}
          ></textarea>
        </div>

        <input
          type="file"
          multiple
          onChange={(event: any) => {
            let newFiles = [...formData.files].concat(
              Array.from(event.target.files),
            );
            setFormData({ ...formData, files: newFiles as [any] });
            event.preventDefault();
          }}
          ref={inputRef}
          id="fileInput"
          className="mb-6"
        />
        {formData.files.map((file: any, index: any) => (
          <div className="flex flex-wrap mb-6" key={index}>
            <p>{file.name}</p>
            <br />
            <button
              type="button"
              className="ml-4 inline-block px-5 py-1.5 bg-red-600 text-white font-sm text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
              onClick={() => handleRemoveFile(index)}
            >
              remove
            </button>
          </div>
        ))}

        <ul className="list-none">
          {formData.taskIO.map((value, index) => {
            return (
              <li className="flex flex-wrap mb-2" key={index}>
                <div className="w-full md:w-1/2 pr-4">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Test Case {index + 1} Input
                  </label>
                  <textarea
                    rows={5}
                    className="block w-full text-sm text-gray-900 rounded-lg bg-gray-200 border border-gray-200 py-3 px-4 pr-8  focus:text-black focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                      setFormData({
                        ...formData,
                        taskIO: formData.taskIO.map((item) => {
                          if (item.id === value.id) {
                            return { ...item, input: e.target.value };
                          }
                          return item;
                        }),
                      });
                    }}
                    placeholder=""
                    id={`testCaseInput${index}`}
                  ></textarea>
                </div>

                <div className="w-full md:w-1/2 pl-4">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Test Case {index + 1} output
                  </label>
                  <textarea
                    rows={5}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                      setFormData({
                        ...formData,
                        taskIO: formData.taskIO.map((item) => {
                          if (item.id === value.id) {
                            return { ...item, output: e.target.value };
                          }
                          return item;
                        }),
                      });
                    }}
                    className="block w-full text-sm text-gray-900 rounded-lg bg-gray-200 border border-gray-200 py-3 px-4 pr-8 focus:text-black focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    id={`testCaseOutput${index}`}
                  ></textarea>
                </div>
                {index != 0 ? (
                  <button
                    onClick={(e: any) => removeTestCase(e, value.id)}
                    className="ml-auto mt-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
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
        <div className="flex flex-wrap mb-6">
          <button
            onClick={addTestCase}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Add Test Case
          </button>
        </div>

        {(formData.task_name && formData.taskIO[0].output) !== '' ? (
          <div className="flex flex-col mb-6 tems-center">
            <button
              type="button"
              onClick={submitTask}
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center mr-2 mb-2"
            >
              Submit Task
            </button>
          </div>
        ) : (
          <div className="text-red-500 text-xl bold py-5">
            กรอกชื่อโจทย์กับเทสเคสเอ้าพุทด้วยจ้า
          </div>
        )}
      </form>
    </Fragment>
  );
};

export default UploadForm;
