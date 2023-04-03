import Image from 'next/image';
import Avatar from '/public/avatar-image.jpg';
import { CommentData } from '@/constants/task';
import { Fragment } from 'react';

const Comment = () => {
  return (
    <div>
      <section className="bg-white py-8 dark:bg-gray-900 lg:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white lg:text-2xl">
              Comment ({CommentData.length})
            </h2>
          </div>
          <form className="mb-6">
            <div className="mb-4 rounded-lg rounded-t-lg border border-gray-200 bg-white py-2 px-4 dark:border-gray-700 dark:bg-gray-800">
              <textarea
                className="w-full border-0 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className=" focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 inline-flex items-center rounded-lg bg-blue-700 py-2.5 px-4 text-center text-xs font-medium text-white focus:ring-4"
            >
              Post comment
            </button>
          </form>
          {CommentData &&
            CommentData.map((val: any) => (
              <Fragment key={val.id}>
                <article className="mb-6 rounded-lg bg-white p-6 text-base dark:bg-gray-900">
                  <footer className="mb-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <p className="mr-3 inline-flex items-center text-xl text-gray-900 dark:text-white">
                        <Image
                          src={Avatar}
                          alt={'Avatar Image'}
                          width={1000}
                          className="mr-2 h-6 w-6 rounded-full"
                        />
                        {val.auditor}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <time title="February 8th, 2022">{val.date}</time>
                      </p>
                    </div>
                  </footer>
                  <p className="text-xl text-gray-500 dark:text-gray-400">
                    {val.comment}
                  </p>
                </article>
                <hr />
              </Fragment>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Comment;
