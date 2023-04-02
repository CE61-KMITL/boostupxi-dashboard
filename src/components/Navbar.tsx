import Link from 'next/link';
import { useState, Fragment } from 'react';
import { useAuth } from '../contexts/auth';

const Navbar = () => {
  const [navbar, setNavbar] = useState<boolean>(false);
  const { logout, user }: any = useAuth();

  return (
    <Fragment>
      <nav
        className="fixed top-0 z-30 w-full bg-black shadow"
        style={{
          backdropFilter: 'saturate(180%) blur(20px)',
          backgroundColor: 'rgba(29,29,31,.72)',
        }}
      >
        <div className="container mx-auto justify-between py-2 px-4 md:flex md:items-center md:py-0 md:px-8">
          <div>
            <div className="flex items-center justify-between md:block md:py-5">
              <Link href="/">
                <h2 className="text-2x text-white">
                  CE Boostup Task Management
                </h2>
              </Link>
              <div className="md:hidden">
                <button
                  className="rounded-md p-2 text-white outline-none focus:border focus:border-white"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`z-50 mt-8 flex-1 justify-center md:mt-0 md:block md:pb-0 ${
                navbar ? 'block' : 'hidden'
              }`}
            >
              <ul className="items-center justify-center space-y-8 text-center md:flex md:space-x-6 md:space-y-0">
                <li className="text-white hover:text-second-color">
                  <Link href="/upload-task" onClick={() => setNavbar(false)}>
                    <button className="w-full rounded-xl bg-green-600 py-1 px-3 md:hover:animate-[shake_1s]">
                      Create
                    </button>
                  </Link>
                </li>
                <li className="text-white hover:text-second-color">
                  <Link href="/dashboard" onClick={() => setNavbar(false)}>
                    Dashboard
                  </Link>
                </li>
                <li className="cursor-pointer text-white hover:text-second-color">
                  <Link href="/profile" onClick={() => setNavbar(false)}>
                    User : {user.username}
                  </Link>
                </li>
                <li className="flex justify-center text-white hover:text-second-color">
                  <button
                    onClick={() => {
                      setNavbar(false);
                      logout();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                      style={{
                        transform: 'scaleX(-1)',
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
