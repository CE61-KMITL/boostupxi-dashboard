import { UploadForm } from '@/components';
import { NextPage } from 'next';
import Layouts from '@/layouts/Layouts';

const UploadTaskPage: NextPage = () => {
  return (
    <Layouts>
      <UploadForm />
    </Layouts>
  );
};

export default UploadTaskPage;
