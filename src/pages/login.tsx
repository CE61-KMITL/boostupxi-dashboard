//import { Navbar } from '../components/Navbar';

interface FormLogin {
  username: string;
  password: string;
}


const login = () => {
  const onSubmit = () => {
    console.log('LOGIN CLICK');
  };
  return (
<section className="h-full gradient-form bg-gray-200 md:h-screen">
  <div className="container py-12 px-6 h-full">
    <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
      <div className="xl:w-10/12">
        <div className="block bg-white shadow-lg rounded-lg">
          <div className="lg:flex lg:flex-wrap g-0">
            <div className="lg:w-6/12 px-4 md:px-0">
              <div className="md:p-12 md:mx-6">
                <div className="text-center">
                  <img
                    className="mx-auto w-48"
                    src="https://scontent.fbkk5-4.fna.fbcdn.net/v/t39.30808-6/289828221_1971831866344816_306099467808647774_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeH4drNPxJ2o8JcsTks_EFuH2Z4xT6BuL5XZnjFPoG4vlTgmpsz9CB0Wh2M5GKG7uYHPthtCq-RbIeTPWtqmraAb&_nc_ohc=DJ1h0MixdZMAX-iIzPH&_nc_ht=scontent.fbkk5-4.fna&oh=00_AfDSEHbI0GhpP95nOdjJOMGWb5aSwSl1emZnrdkoJUWOUQ&oe=63CC0D93"
                    alt="logo"
                  />
                  <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">CE BOOSTUP TASK UPLOAD</h4>
                </div>
                <form action="onSubmit">
                  <p className="mb-4">Please login to your account</p>
                  <div className="mb-4">
                    <input
                      type="text"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="exampleFormControlInput1"
                      placeholder="Username"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="exampleFormControlInput1"
                      placeholder="Password"
                    />
                  </div>
                  <div className="text-center pt-1 mb-12 pb-1">
                    <button
                      className="bg-black inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                      type="button"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                    >
                      Log in
                    </button>
                    <a className="text-gray-500" href="#!">Forgot password?</a>
                  </div>
                </form>
              </div>
            </div>
            <div
              className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none bg-black"
            >
              <div className="text-white px-4 py-6 md:p-12 md:mx-6">
                <h4 className="text-xl font-semibold mb-6">สูตรทำ ลาบหมู เมนูทำง่าย กับข้าวก็ได้ กับแกล้มก็ดี กินอร่อยทั้งครอบครัว!</h4>
                <p className="text-sm">
                ถ้าพูดถึงเมนูลาบรสชาติจัดจ้านสุดอร่อย หลายคนต้องนึกถึงเมนู ลาบหมู เราเลยขอนำสูตรอาหาร 
                วิธีทำ ลาบหมู สูตรอาหารทำง่าย กับแกล้มรสชาติดี ทำกินได้ทั้งครอบครัว สูตรนี้จัดเต็ม มาทั้งเนื้อหมู ตับหมู 
                และหนังหมู จะทำกินคู่กับข้าวสวย ข้าวเหนียวก็ได้ หรือจะทำเป็นกับแกล้มยามเย็นก็ดี แถมเป็นเมนูทำง่าย ทำไว 
                ใช้เวลาไม่นาน วัตถุดิบไม่แพง ควรค่าแก่การเก็บสูตรไว้ทำกินทั้งครอบครัว พร้อมแล้วตามไปทำ เมนูลาบหมู พร้อมกันเลย!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  );
};

export default login;