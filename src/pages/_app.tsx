import { Fragment } from 'react';
import type { AppProps } from 'next/app';
import { Kanit } from 'next/font/google';
import { AuthProvider } from '../contexts/auth';
import ProtectRoute from '../contexts/auth';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';
import '../styles/star.css';

const kanit = Kanit({
  subsets: ['latin'],
  weight: '400',
});
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <title>CE Boostup Task</title>
      </Head>
      <div className={kanit.className}>
        <main className="min-h-screen bg-gray-900">
          <Fragment>
            <Toaster />
          </Fragment>
          <AuthProvider>
            <ProtectRoute>
              <Component {...pageProps} />
            </ProtectRoute>
          </AuthProvider>
        </main>
      </div>
    </Fragment>
  );
}
