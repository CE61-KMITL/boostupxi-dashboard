import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { fileURLToPath } from "url";

import { FormType } from "../interface/task"


export let UploadForm = () => {
  let formInitial: FormType = {
    task_name: "",
    task_level: 1,
    task_tags: "",
    task_hint: "",
    task_desc: "",
    taskIO: [{ id: "1", input: "", output: "" }],
    author: "",
  };
  const [formData, setFormData] = useState(formInitial);

  const addTestCase = (e: any) => {
    setFormData({
      ...formData,
      taskIO: [
        ...formData.taskIO,
        { id: String(formData.taskIO.length + 1), input: "", output: "" },
      ],
    });

    e.preventDefault();
  };

  const removeTestCase = (e: any, id: string) => {
    setFormData({
      ...formData,
      taskIO: formData.taskIO.filter((item) => item.id !== id),
    });

    e.preventDefault();
  };

  const submitTask = () => {
    console.log(formData);
  };

  return (
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
              e.preventDefault();
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
              e.preventDefault();
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
        <textarea
          className="block w-full text-sm py-3 px-4 pr-8 md:mb-0 text-gray-900 rounded-lg bg-gray-200 border border-gray-200 focus:text-black focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Task Tags"
          value={formData.task_tags}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            e.preventDefault();
            setFormData({ ...formData, task_tags: e.target.value });
          }}
        />
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
            e.preventDefault();
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
            e.preventDefault();
            setFormData({ ...formData, task_desc: e.target.value });
          }}
        ></textarea>
      </div>

      <div className="flex flex-wrap mb-6">
        <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
          Upload file
        </label>
        <input
          className="block w-full text-md text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none   dark:placeholder-gray-400"
          id="multiple_files"
          type="file"
          multiple
        ></input>
      </div>
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
                    e.preventDefault();
                  }}
                  placeholder=""
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
                    e.preventDefault();
                  }}
                  className="block w-full text-sm text-gray-900 rounded-lg bg-gray-200 border border-gray-200 py-3 px-4 pr-8 focus:text-black focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                ></textarea>
              </div>
              <button
                onClick={(e: any) => removeTestCase(e, value.id)}
                className="ml-auto mt-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Remove Test Case
              </button>

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

      {(formData.task_name && formData.taskIO[0].output) !== "" ? (
        <div className="flex flex-col mb-6 tems-center">
          <button
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
  );
};






