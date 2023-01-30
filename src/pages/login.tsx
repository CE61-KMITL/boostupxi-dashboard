import { Fragment } from 'react';
import { NextPage } from 'next';
import { LoginForm } from '../interface/task';
import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import Logo from '../../public/images/logo.png';

const LoginPage: NextPage = () => {
  let LoginInitial: LoginForm = {
    email: '',
    password: '',
  };
  const [loginData, setloginData] = useState(LoginInitial);

  const submitLogin = () => {
    console.log(loginData);
  };
  return (
    <Fragment>
      <div className="flex justify-center items-center bg-main-color grow min-h-screen">
        <div className="container py-12 px-6">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="xl:w-10/12">
              <div className="block bg-white shadow-lg rounded-lg">
                <div className="lg:flex lg:flex-wrap g-0">
                  <div className="lg:w-6/12 px-4 md:px-0">
                    <div className="md:p-12 md:mx-6">
                      <div className="text-center">
                        <Image
                          className="mx-auto w-48 md:pt-0 sm:pt-8 pt-10 rounded-full"
                          src={Logo}
                          alt="logo"
                          height={100}
                          width={100}
                        />
                        <h4 className="text-xl font-semibold my-5 pb-1">
                          CE BOOSTUP TASK UPLOAD
                        </h4>
                      </div>
                      <form action="onSubmit">
                        <p className="mb-4">Please login to your account</p>
                        <div className="mb-4">
                          <input
                            type="text"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="exampleFormControlInput1"
                            placeholder="Username"
                            value={loginData.email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              setloginData({
                                ...loginData,
                                email: e.target.value,
                              });
                              e.preventDefault();
                            }}
                          />
                        </div>
                        <div className="mb-4">
                          <input
                            type="password"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="exampleFormControlInput1"
                            placeholder="Password"
                            value={loginData.password}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              setloginData({
                                ...loginData,
                                password: e.target.value,
                              });
                              e.preventDefault();
                            }}
                          />
                        </div>
                        <div className="text-center pt-1 mb-12 pb-1">
                          <button
                            className="bg-fouth-color inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-main-color hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                            type="button"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            onClick={submitLogin}
                          >
                            Log in
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none bg-fouth-color">
                    <div className="text-white px-4 py-6 md:p-12 md:mx-6">
                      <h4 className="text-xl font-semibold mb-6">
                        สูตรทำ ลาบหมู เมนูทำง่าย กับข้าวก็ได้ กับแกล้มก็ดี
                        กินอร่อยทั้งครอบครัว!
                      </h4>
                      <p className="text-sm">
                        ถ้าพูดถึงเมนูลาบรสชาติจัดจ้านสุดอร่อย
                        หลายคนต้องนึกถึงเมนู ลาบหมู เราเลยขอนำสูตรอาหาร วิธีทำ
                        ลาบหมู สูตรอาหารทำง่าย กับแกล้มรสชาติดี
                        ทำกินได้ทั้งครอบครัว สูตรนี้จัดเต็ม มาทั้งเนื้อหมู
                        ตับหมู และหนังหมู จะทำกินคู่กับข้าวสวย ข้าวเหนียวก็ได้
                        หรือจะทำเป็นกับแกล้มยามเย็นก็ดี แถมเป็นเมนูทำง่าย ทำไว
                        ใช้เวลาไม่นาน วัตถุดิบไม่แพง
                        ควรค่าแก่การเก็บสูตรไว้ทำกินทั้งครอบครัว
                        พร้อมแล้วตามไปทำ เมนูลาบหมู พร้อมกันเลย!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginPage;
