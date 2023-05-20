import { NextPage } from 'next';
import { UploadForm } from '@/components';
import Layouts from '@/layouts/Layouts';

const UploadTaskPage: NextPage = () => {
  return (
    <Layouts>
      <UploadForm />
    </Layouts>
  );
};

export default UploadTaskPage;
