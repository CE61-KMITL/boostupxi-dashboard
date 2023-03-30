import { IFiles, ITask, ITestCases } from '@/interface/task';
import Layouts from '@/layouts/Layouts';
import Link from 'next/link';

const PreviewTask = ({
  title,
  description,
  author,
  level,
  tags,
  files,
  hint,
  status,
  testcases,
  solution_code,
}: ITask) => {
  return (
    <Layouts>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="shadow-3xl shadow-shadow-500 dark:!bg-navy-800 relative mx-auto flex w-[700px] max-w-[95%] flex-col items-center rounded-[20px] bg-white bg-clip-border p-3 dark:text-white dark:!shadow-none">
          <div className="mt-2 mb-8 w-full">
            <h4 className="text-navy-700 px-2 text-xl font-bold dark:text-black">
              {title}
            </h4>
            <p className="mt-2 px-2 text-base text-gray-600">{description}</p>
          </div>
          <div className="grid w-full grid-cols-2 gap-4 px-2">
            <div className="shadow-3xl shadow-shadow-500 dark:!bg-navy-700 flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 dark:shadow-none">
              <label className="text-sm text-gray-600">Author</label>
              <p className="text-navy-700 text-base font-medium dark:text-black">
                {author.username}
              </p>
            </div>

            <div className="shadow-3xl shadow-shadow-500 dark:!bg-navy-700 flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 dark:shadow-none">
              <p className="text-sm text-gray-600">Level</p>
              <p className="text-navy-700 text-base font-medium dark:text-black">
                {level}
              </p>
            </div>

            <div className="shadow-3xl shadow-shadow-500 dark:!bg-navy-700 flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 dark:shadow-none">
              <p className="text-sm text-gray-600">Task Category</p>
              {tags &&
                tags.map((val: string, index: number) => (
                  <li
                    className="text-navy-700 text-base font-medium dark:text-black"
                    key={index}
                  >
                    {val}
                  </li>
                ))}
            </div>

            <div className="shadow-3xl shadow-shadow-500 dark:!bg-navy-700 flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 dark:shadow-none">
              <p className="text-sm text-gray-600">Task Files</p>
              {files &&
                files.map((val: IFiles) => (
                  <p
                    className="text-navy-700 text-base font-medium dark:text-black"
                    key={val.key}
                  >
                    <Link href={val.url}>{val.url}</Link>
                  </p>
                ))}
            </div>

            <div className="shadow-3xl shadow-shadow-500 dark:!bg-navy-700 flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 dark:shadow-none">
              <p className="text-sm text-gray-600">Task Hints</p>
              <p className="text-navy-700 text-base font-medium dark:text-black">
                {hint}
              </p>
            </div>

            <div className="shadow-3xl shadow-shadow-500 dark:!bg-navy-700 flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 dark:shadow-none">
              <p className="text-sm text-gray-600">Task Status</p>
              <p className="text-navy-700 text-base font-medium dark:text-black">
                {status}
              </p>
            </div>
          </div>
          <div className="grid w-full grid-cols-3 gap-2 px-2 py-4">
            {testcases &&
              testcases.map((val: ITestCases, length: number) => (
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
              ))}
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default PreviewTask;
