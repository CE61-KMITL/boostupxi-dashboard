import { Fragment } from 'react';
import Link from 'next/link';
import { IError } from '@/interface/error';

const Errors = ({ status, title, description }: IError) => {
  return (
    <Fragment>
      <div className="error-bg 22 flex min-h-screen items-center justify-center bg-indigo-500 bg-cover bg-fixed bg-bottom">
        <div className="container">
          <div className="row">
            <div className="col-sm-8 offset-sm-2 -mt-52 text-center text-gray-50">
              <div className="relative ">
                <h1 className="tracking-tighter-less text-shadow relative font-sans text-9xl font-bold">
                  <span>{status}</span>
                </h1>
                <span className="absolute top-0 -ml-12 font-semibold text-gray-300">
                  Oops!
                </span>
              </div>
              <h5 className="-mr-10 -mt-3 font-semibold text-gray-300">
                {title}
              </h5>
              <p className="mt-2 mb-6 text-gray-100">{description}</p>
              <Link
                className="rounded-full  bg-green-400 px-5 py-3 text-sm font-medium tracking-wider text-gray-50 shadow-sm hover:shadow-lg"
                href="/"
              >
                Go back to login page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Errors;
