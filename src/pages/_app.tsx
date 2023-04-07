import { Kanit } from 'next/font/google';
import '../styles/globals.css';
import '../styles/star.css';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { Fragment } from 'react';
import { AuthProvider } from '../contexts/auth';
import ProtectRoute from '../contexts/auth';

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
            <Toaster
              toastOptions={{
                style: {
                  border: '1px solid #713200',
                  padding: '16px',
                  color: '#713200',
                },
              }}
            />
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
