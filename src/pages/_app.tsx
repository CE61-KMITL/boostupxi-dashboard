import type { AppProps } from 'next/app';
import { Kanit } from 'next/font/google';
import Head from 'next/head';
import { Fragment } from 'react';
import { Toaster } from 'react-hot-toast';
import ProtectRoute, { AuthProvider } from '../contexts/auth';
import '../styles/globals.css';
import '../styles/star.css';

const kanit = Kanit({
  subsets: ['latin'],
  weight: '400',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <title>Dashboard ― CE Boostup XI</title>
        <link rel="icon" href="/new-logo.png" />
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
