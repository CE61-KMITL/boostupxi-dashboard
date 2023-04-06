import { Fragment } from 'react';
import { Errors } from '@/components';

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
