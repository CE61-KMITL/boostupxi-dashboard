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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={kanit.className}>
      <Fragment>
        <Toaster
          toastOptions={{
            className: '',
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
  );
}
