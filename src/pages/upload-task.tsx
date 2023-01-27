import Navbar from "@/components/Navbar";
import { UploadForm } from "../components/UploadForm";
import { Fragment } from "react";
import { NextPage } from "next";

const UploadTaskPage: NextPage = () => {
  return (
    <Fragment>
      <Navbar />
      <section className="min-h-screen bg-main-color ">
        <div className="bg-white px-6 max-w-6xl mx-auto pt-10">
            <UploadForm />
        </div>
      </section>
    </Fragment>
  );
};

export default UploadTaskPage;
