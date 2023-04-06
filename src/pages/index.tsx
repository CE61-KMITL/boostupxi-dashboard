import { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router';
const HomePage: NextPage = () => {
  const router: NextRouter = useRouter();
  router.push('/login');
  return (
    <main className="container mx-auto flex min-h-screen items-center justify-center"></main>
  );
};

export default HomePage;
