import { UploadForm } from '@/components';
import { NextPage } from 'next';
import Layouts from '@/layouts/Layouts';

const UploadTaskPage: NextPage = () => {
  return (
    <Layouts>
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
      <UploadForm />
    </Layouts>
  );
};

export default UploadTaskPage;
