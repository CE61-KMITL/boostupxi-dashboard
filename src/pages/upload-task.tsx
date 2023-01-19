import { Navbar } from "../components/Navbar";
import { UploadForm } from "../components/UploadForm";
import BaseLayout from '../components/BaseLayout'

const UploadTaskPage = () => {
  return (
    <>
      <section className="min-h-screen  bg-orange-500">
        <Navbar />
        <BaseLayout>
          <div className="pt-4 bg-white px-6">
          <UploadForm />
          </div>
        </BaseLayout>
      </section>
    </>
  );
};

export default UploadTaskPage;
