import React, { Fragment } from 'react';

interface Props {
  handleCloseModal: () => void;
}

const BanModal = ({ handleCloseModal }: Props) => {
  return (
    <Fragment>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70">
        <div className="container mx-auto flex min-h-screen max-w-screen-lg items-center justify-center px-7">
          <div className="relative w-full max-w-3xl rounded-xl bg-white p-12">
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3"
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
            <div>
              <h1 className="mb-4 text-center text-lg font-bold text-gray-800">
                Banned Libraries and Functions
              </h1>
              <div className="flex justify-between space-x-8">
                <div className="w-1/2">
                  <h2 className="mb-2 text-lg font-semibold text-gray-800">
                    Banned Libraries
                  </h2>
                  <div className="rounded-xl  bg-neutral-700 p-4 text-sm text-gray-100">
                    <div>bits/stdc++.h</div>
                    <div>algorithm</div>
                    <div>map</div>
                    <div>queue</div>
                    <div>stack</div>
                    <div>set</div>
                    <div>list</div>
                    <div>bitset</div>
                    <div>utility</div>
                    <div>deque</div>
                    <div>forward_list</div>
                    <div>unordered_map</div>
                    <div>unordered_set</div>
                    <div>stdatomic</div>
                    <div>thread</div>
                    <div>fstream</div>
                    <div>atomic</div>
                    <div>mutex</div>
                    <div>unistd.h</div>
                    <div>signal.h</div>
                    <div>window.h</div>
                    <div>stdlib.h</div>
                    <div>shlobj.h</div>
                    <div>numeric</div>
                  </div>
                </div>
                <div className="w-1/2">
                  <h2 className="mb-2 text-lg font-semibold text-gray-800">
                    Banned Functions
                  </h2>
                  <div className="rounded-xl  bg-neutral-700 p-4 text-sm text-gray-100">
                    <div>system</div>
                    <div>sort</div>
                    <div>stable_sort</div>
                    <div>partial_sort</div>
                    <div>search</div>
                    <div>search_n</div>
                    <div>reverse</div>
                    <div>reverse_copy</div>
                    <div>max</div>
                    <div>min</div>
                    <div>next_permutation</div>
                    <div>swap</div>
                    <div>qsort</div>
                    <div>kill</div>
                    <div>atexit</div>
                    <div>fopen</div>
                    <div>fclose</div>
                    <div>fread</div>
                    <div>fwrite</div>
                    <div>fdopen</div>
                    <div>fprintf</div>
                    <div>fmax</div>
                    <div>fmin</div>
                    <div>execve</div>
                    <div>fexecve</div>
                    <div>execv</div>
                    <div>execle</div>
                    <div>execl</div>
                    <div>execvp</div>
                    <div>execlp</div>
                    <div>execvpe</div>
                    <div>popen</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BanModal;
