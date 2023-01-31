import { Kanit } from '@next/font/google';
import '../styles/globals.css';
import '../styles/star.css';
import type { AppProps } from 'next/app';

const kanit = Kanit({
  subsets: ['latin'],
  weight: '400',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={kanit.className}>
      <Component {...pageProps} />
    </main>
  );
}
