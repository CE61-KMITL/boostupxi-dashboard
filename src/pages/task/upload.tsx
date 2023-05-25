import { UploadForm } from '@/components';
import Layouts from '@/layouts/Layouts';
import { NextPage } from 'next';

const UploadTaskPage: NextPage = () => {
  return (
    <Layouts>
      <UploadForm />
    </Layouts>
  );
};

export default UploadTaskPage;
