'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export let UploadForm = () => {
    
    //let testCase=['test case 1','test case 2'];
    const [testCase, settestCase] = useState(['1']);
    console.log(testCase);
    
    const addTestCase = () => {
        settestCase(testCase => [...testCase, (testCase.length+1).toString()]);
        console.log(testCase);
        console.log(testCase.length+1);
      };

    const remove = (i : string) => {
        console.log(i);
        const arr = testCase.filter((item) => item !== i);
        settestCase(arr);
    };
    return (
        <form className="mx-auto w-full max-w-full object-top overflow-auto">
            <h3 className="font-medium leading-tight text-3xl mt-0 mb-2 text-blue-600">Task Upload</h3>
            <div className="flex flex-wrap mb-6">
                <div className="w-full md:w-1/2 mb-6 pr-2">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Task Name
                    </label>
                    <input className="appearance-none lock w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text"/>
                    <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                </div>
                <div className="w-full md:w-1/2 mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Task Level
                    </label>
                    <select className="block  w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500" id="grid-state">
                    <option>Level 1</option>
                    <option>Level 2</option>
                    <option>Level 3</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-wrap mb-6">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-6 md:mb-0">Task Descprtion</label>
                <textarea key="task_desc" rows={10} className="block w-full text-sm py-3 px-4 pr-8 md:mb-0 text-gray-900 rounded-lg bg-gray-200 border border-gray-200 focus:text-black focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""></textarea>
            </div>

            <div className="flex flex-wrap mb-6">
                <input type="file" />
            </div>

            {testCase.map((value,index)=>{
                return (
                <div className="flex flex-wrap mb-6" key={'testCaseID'+ {value}}>
                    <div className = "w-full md:w-1/2 pr-4">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Test Case {value} Input</label>
                    <textarea key={"task_output" + (value)} rows={5} className="block w-full text-sm text-gray-900 rounded-lg bg-gray-200 border border-gray-200 py-3 px-4 pr-8  focus:text-black focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""></textarea>
                    </div>

                    <div className = "w-full md:w-1/2 pl-4">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Test Case  {value} output</label>
                        <textarea key={"task_output" + (value)} rows={5} className="block w-full text-sm text-gray-900 rounded-lg bg-gray-200 border border-gray-200 py-3 px-4 pr-8 focus:text-black focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""></textarea>
                    </div>
                    <button type="button" key={'Delbtn' + (value)} onClick={() => remove(value.toString())} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-sm rounded-lg text-sm px-3 py-2 mr-2 mb-2 mt-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ml-auto">
                        Delete {(value)}
                    </button>

                </div>
                );
            })}

            <div className = "flex flex-wrap mb-6">
                <button type="button"  onClick={addTestCase} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Add Test Case
                </button>
            </div>
            </form>
    

);
        
};

