import { Kanit } from '@next/font/google';
import '../styles/globals.css';
import '../styles/star.css';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { Fragment } from 'react';
const kanit = Kanit({
  subsets: ['latin'],
  weight: '400',
});
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <style>
          @import
          url(&apos;https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css&apos;)
        </style>
        <title>CE Boostup Task</title>
      </Head>
      <main className={kanit.className}>
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
        <Component {...pageProps} />
      </main>
    </Fragment>
  );
}
