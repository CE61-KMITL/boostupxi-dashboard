import { ChangeEvent, useState, useRef, Fragment } from 'react';
import { NextPage } from 'next';
import { FormType } from '@/interface/upload';
import { toast } from 'react-hot-toast';

const UploadForm: NextPage = () => {
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
      toast.success('Add Test Case');
    } catch (err: Error | any) {
      return err;
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
      toast.success('Create Task Success');
    } catch (err: Error | any) {
      return err;
    }
  };

  return (
    <Fragment>
      <form>
        <h3 className="mt-0 mb-2 text-3xl font-medium leading-tight text-blue-600">
          Task Upload
        </h3>
        <div className="flex flex-wrap">
          <div className="w-full pr-2 md:w-1/2">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
              Task Name
            </label>
            <input
              className="lock mb-3 w-full appearance-none rounded border  bg-gray-200 py-2.5 px-4 leading-tight text-gray-700 focus:bg-white focus:outline-none"
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
          <div className="mb-6 w-full md:w-1/2">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
              Task Level
            </label>
            <select
              className="lock  block w-full rounded  border-gray-200 bg-gray-200 py-2.5 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:outline-none"
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

        <div className="mb-6 flex flex-wrap">
          <label className="mb-6 block text-xs font-bold uppercase tracking-wide text-gray-700 md:mb-0">
            Task Tags
          </label>
        </div>

        <div className="mb-6 flex flex-wrap">
          {availableTags.map((tag) => (
            <button
              className={`
              relative mx-1 mb-2 inline-flex w-full items-center justify-center rounded-full border border-transparent px-3 py-0.5 text-sm  font-bold leading-6 text-white focus:outline-none  focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 md:w-auto 
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

        <div className="mb-6 flex flex-wrap">
          <label className="mb-6 block text-xs font-bold uppercase tracking-wide text-gray-700 md:mb-0">
            Task Hint
          </label>
          <textarea
            className="block w-full rounded-lg border border-gray-200 bg-gray-200 py-3 px-4 pr-8 text-sm text-gray-900 focus:border-blue-500 focus:text-black focus:ring-blue-500 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 md:mb-0"
            placeholder="Task Hint"
            value={formData.task_hint}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setFormData({ ...formData, task_hint: e.target.value });
            }}
          />
        </div>

        <div className="mb-6 flex flex-wrap">
          <label className="mb-6 block text-xs font-bold uppercase tracking-wide text-gray-700 md:mb-0">
            Task Descprtion
          </label>
          <textarea
            key="task_desc"
            rows={10}
            className="block w-full rounded-lg border border-gray-200 bg-gray-200 py-3 px-4 pr-8 text-sm text-gray-900 focus:border-blue-500 focus:text-black focus:ring-blue-500 dark:placeholder-gray-400 dark:focus:border-blue-500  dark:focus:ring-blue-500 md:mb-0"
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
          <div className="mb-6 flex flex-wrap" key={index}>
            <p>{file.name}</p>
            <br />
            <button
              type="button"
              className="font-sm ml-4 inline-block rounded bg-red-600 px-5 py-1.5 text-xs uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg"
              onClick={() => handleRemoveFile(index)}
            >
              remove
            </button>
          </div>
        ))}

        <ul className="list-none">
          {formData.taskIO.map((value, index) => {
            return (
              <li className="mb-2 flex flex-wrap" key={index}>
                <div className="w-full pr-4 md:w-1/2">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                    Test Case {index + 1} Input
                  </label>
                  <textarea
                    rows={5}
                    className="block w-full rounded-lg border border-gray-200 bg-gray-200 py-3 px-4 pr-8 text-sm text-gray-900  focus:border-blue-500 focus:text-black focus:ring-blue-500 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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

                <div className="w-full pl-4 md:w-1/2">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
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
                    className="block w-full rounded-lg border border-gray-200 bg-gray-200 py-3 px-4 pr-8 text-sm text-gray-900 focus:border-blue-500 focus:text-black focus:ring-blue-500 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder=""
                    id={`testCaseOutput${index}`}
                  ></textarea>
                </div>
                {index != 0 ? (
                  <button
                    onClick={(e: any) => removeTestCase(e, value.id)}
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

        {(formData.task_name && formData.taskIO[0].output) !== '' ? (
          <div className="tems-center mb-6 flex flex-col">
            <button
              type="button"
              onClick={submitTask}
              className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-5 py-2.5 text-center text-xl font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
            >
              Submit Task
            </button>
          </div>
        ) : (
          <div className="bold py-5 text-xl text-red-500">
            กรอกชื่อโจทย์กับเทสเคสเอ้าพุทด้วยจ้า
          </div>
        )}
      </form>
    </Fragment>
  );
};

export default UploadForm;
