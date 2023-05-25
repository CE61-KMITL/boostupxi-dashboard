import { Errors } from '@/components';
import { Fragment } from 'react';

export default function Custom404() {
  return (
    <Fragment>
      <Errors
        status={404}
        title="Page Not Found"
        description={`Oops! The page you're looking for cannot be found. Please check the URL or go back to the homepage.`}
      />
    </Fragment>
  );
}
