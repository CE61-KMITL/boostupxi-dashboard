import { Navbar } from '../components/navbar';
import { UploadForm } from '../components/uploadForm';

const upload = () => {
    return (
        <>

        <section className="h-full min-h-screen  bg-orange-500">
        <Navbar/>
        <div className="container w-3/5 pt-5 px-6 mx-auto shadow-2xl bg-white">
            <div className="flex items-center ">
                <UploadForm />
            </div>    
        </div> 
        </section>
        </>
        );
    };
    
export default upload;