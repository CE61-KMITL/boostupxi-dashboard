import Navbar from "@/components/navbar";
import { UploadForm } from "../components/uploadForm";
import { Fragment } from "react";
import { NextPage } from "next";

const upload: NextPage = () => {
  return (
    <Fragment>
      <Navbar />
      <section className="h-ful md:h-screen bg-main-color">
        <div className="container w-3/5 pt-5 px-6 mx-auto shadow-2xl bg-white">
          <div className="flex h-screen items-center ">
            <UploadForm />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default upload;
