import { Fragment } from 'react';
import Login from './login';
import { NextPage } from 'next';
const HomePage: NextPage = () => {
  return (
    <Fragment>
      <Login />
    </Fragment>
  );
};

export default HomePage;
