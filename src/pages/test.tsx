import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import c from 'react-syntax-highlighter/dist/cjs/languages/prism/c';
import { vs2015 } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

export default function Test() {
  const [showModal, setShowModal] = useState(false);
  const codeString: any = `#include <stdio.h>\n  \nint main()\n{\n    int integerType;\n    char charType;\n    float floatType;\n    double doubleType;\n  \n    // Calculate and Print\n    // the size of integer type\n    printf(\"Size of int is: %ld\n\",\n           sizeof(integerType));\n  \n    // Calculate and Print\n    // the size of charType\n    printf(\"Size of char is: %ld\n\",\n           sizeof(charType));\n  \n    // Calculate and Print\n    // the size of floatType\n    printf(\"Size of float is: %ld\n\",\n           sizeof(floatType));\n  \n    // Calculate and Print\n    // the size of doubleType\n    printf(\"Size of double is: %ld\n\",\n           sizeof(doubleType));\n  \n    return 0;\n}`;

  return (
    <>
      <div>
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
            >
              <div className="relative mx-20 mt-14 w-full xl:mx-40">
                <div className="relative rounded-lg bg-white">
                  <div>Hello</div>
                </div>
                <button onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
