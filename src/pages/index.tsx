import { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router';
import { LoadingFile } from '@/components';
const HomePage: NextPage = () => {
  const router: NextRouter = useRouter();
  router.push('/login');
  return <LoadingFile />;
};

export default HomePage;
