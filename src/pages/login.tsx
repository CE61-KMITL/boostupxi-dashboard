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
    return loginData;
  };
  return (
    <Fragment>
      <div className="flex min-h-screen grow items-center justify-center bg-main-color">
        <div className="container py-12 px-6">
          <div className="g-6 flex h-full flex-wrap items-center justify-center text-gray-800">
            <div className="xl:w-10/12">
              <div className="block rounded-lg bg-white shadow-lg">
                <div className="g-0 lg:flex lg:flex-wrap">
                  <div className="px-4 md:px-0 lg:w-6/12">
                    <div className="md:mx-6 md:p-12">
                      <div className="text-center">
                        <Image
                          className="mx-auto w-48 rounded-full pt-10 sm:pt-8 md:pt-0"
                          src={Logo}
                          alt="logo"
                          height={100}
                          width={100}
                        />
                        <h4 className="my-5 pb-1 text-xl font-semibold">
                          CE BOOSTUP TASK UPLOAD
                        </h4>
                      </div>
                      <form action="onSubmit">
                        <p className="mb-4">Please login to your account</p>
                        <div className="mb-4">
                          <input
                            type="text"
                            className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
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
                            className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
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
                        <div className="mb-12 pt-1 pb-1 text-center">
                          <button
                            className="mb-3 inline-block w-full rounded bg-fouth-color px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-main-color hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
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
                  <div className="flex items-center rounded-b-lg bg-fouth-color lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none">
                    <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                      <h4 className="mb-6 text-xl font-semibold">
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
