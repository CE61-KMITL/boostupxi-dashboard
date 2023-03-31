import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import c from 'react-syntax-highlighter/dist/cjs/languages/prism/c';
import { vs2015 } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

export default function Test() {
  const [showModal, setShowModal] = useState(false);
  const codeString: any = `#include <stdio.h>
  int main()
  {
    printf("Hello World!");
    return 0;
  }`;

  return (
    <>
      <div
        // style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}
        className="container mx-auto mb-4 flex w-full items-center rounded-lg"
      >
        <SyntaxHighlighter language={c} style={vs2015}>
          {codeString}
        </SyntaxHighlighter>
      </div>

      <div>
        <button onClick={() => setShowModal(true)}>Modal</button>

        {showModal ? (
          <>
            <div
              className={`${
                showModal ? 'flex' : 'hidden'
              } fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70`}
              onClick={() => setShowModal(false)}
            >
              <div className="relative mx-20 mt-14 w-full">
                <div className="relative rounded-lg bg-white">
                  <div className="px-6 py-9 md:px-20 lg:px-28 xl:px-32">
                    <div className="mt-14 text-center">
                      <p className="text-base leading-4 text-gray-600">
                        Welcome to thecrib
                      </p>
                      <h1 className="mt-3 text-3xl font-semibold leading-7 text-gray-800 lg:text-4xl lg:leading-9">
                        ENJOY 10% OFF
                      </h1>
                      <p className="mt-6 text-base leading-4 text-gray-600">
                        Enter your Email to get 10% of discount
                      </p>
                    </div>

                    <div className="mt-8">
                      <input
                        placeholder="Email address"
                        type="email"
                        className="w-full border-b border-gray-400 py-4 text-base leading-4 text-gray-600 focus:outline-none"
                      />
                      <button
                        role="button"
                        aria-label="unlock ten percent off"
                        className="mt-4 w-full bg-gray-800 py-4 text-base font-medium uppercase leading-4 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
                      >
                        Unlock 10% Off
                      </button>
                    </div>

                    <div className="mt-8">
                      <input
                        placeholder="Email address"
                        type="email"
                        className="w-full border-b border-gray-400 py-4 text-base leading-4 text-gray-600 focus:outline-none"
                      />
                      <button
                        role="button"
                        aria-label="unlock ten percent off"
                        className="mt-4 w-full bg-gray-800 py-4 text-base font-medium uppercase leading-4 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
                      >
                        Unlock 10% Off
                      </button>
                    </div>

                    <div className="mt-8">
                      <input
                        placeholder="Email address"
                        type="email"
                        className="w-full border-b border-gray-400 py-4 text-base leading-4 text-gray-600 focus:outline-none"
                      />
                      <button
                        role="button"
                        aria-label="unlock ten percent off"
                        className="mt-4 w-full bg-gray-800 py-4 text-base font-medium uppercase leading-4 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
                      >
                        Unlock 10% Off
                      </button>
                    </div>

                    <div className="mt-8">
                      <input
                        placeholder="Email address"
                        type="email"
                        className="w-full border-b border-gray-400 py-4 text-base leading-4 text-gray-600 focus:outline-none"
                      />
                      <button
                        role="button"
                        aria-label="unlock ten percent off"
                        className="mt-4 w-full bg-gray-800 py-4 text-base font-medium uppercase leading-4 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
                      >
                        Unlock 10% Off
                      </button>
                    </div>

                    <div className="mt-8">
                      <input
                        placeholder="Email address"
                        type="email"
                        className="w-full border-b border-gray-400 py-4 text-base leading-4 text-gray-600 focus:outline-none"
                      />
                      <button
                        role="button"
                        aria-label="unlock ten percent off"
                        className="mt-4 w-full bg-gray-800 py-4 text-base font-medium uppercase leading-4 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
                      >
                        Unlock 10% Off
                      </button>
                    </div>

                    <div className="mt-8">
                      <input
                        placeholder="Email address"
                        type="email"
                        className="w-full border-b border-gray-400 py-4 text-base leading-4 text-gray-600 focus:outline-none"
                      />
                      <button
                        role="button"
                        aria-label="unlock ten percent off"
                        className="mt-4 w-full bg-gray-800 py-4 text-base font-medium uppercase leading-4 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
                      >
                        Unlock 10% Off
                      </button>
                    </div>

                    <div className="mt-8">
                      <input
                        placeholder="Email address"
                        type="email"
                        className="w-full border-b border-gray-400 py-4 text-base leading-4 text-gray-600 focus:outline-none"
                      />
                      <button
                        role="button"
                        aria-label="unlock ten percent off"
                        className="mt-4 w-full bg-gray-800 py-4 text-base font-medium uppercase leading-4 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
                      >
                        Unlock 10% Off
                      </button>
                    </div>

                    <div className="mt-8">
                      <input
                        placeholder="Email address"
                        type="email"
                        className="w-full border-b border-gray-400 py-4 text-base leading-4 text-gray-600 focus:outline-none"
                      />
                      <button
                        role="button"
                        aria-label="unlock ten percent off"
                        className="mt-4 w-full bg-gray-800 py-4 text-base font-medium uppercase leading-4 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
                      >
                        Unlock 10% Off
                      </button>
                    </div>

                    <div className="mt-8 text-center">
                      <button
                        role="button"
                        aria-label="no thanks"
                        className="text-base font-semibold capitalize leading-4 text-gray-800 underline hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
                        onClick={() => setShowModal(false)}
                      >
                        No, Thanks
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
