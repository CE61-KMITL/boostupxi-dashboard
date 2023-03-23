import { Fragment } from 'react';
import Errors from '@/components/Errors';

export default function Custom404() {
  return (
    <Fragment>
      <Errors
        status={404}
        title="Page Not Found"
        description={`We're sorry, the page you requested could not found.Please go back to the homepage or contact us.`}
      />
    </Fragment>
  );
}
