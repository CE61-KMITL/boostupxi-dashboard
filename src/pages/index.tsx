import { NextPage } from 'next';
import { useRouter } from 'next/router';
const HomePage: NextPage = () => {
  const router = useRouter();
  router.push('/login');
  return (
    <main className="container mx-auto flex min-h-screen items-center justify-center">
      <h1>THIS IS A FRONTEND FOR CE BOOSTUP XI. 📢</h1>
    </main>
  );
};

export default HomePage;
