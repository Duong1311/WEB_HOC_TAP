import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setEmailData, setOtpData } from "~/redux/loginSlice";
import { sendEmailOtp } from "~/services/userServices";

export default function EmailInput() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.loginData.email);

  const handleChange = (e) => {
    dispatch(setEmailData(e.target.value));
  };
  const nagigateToOtp = async () => {
    if (email) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      console.log(OTP);
      dispatch(setOtpData(OTP));
      const res = await sendEmailOtp(email, OTP);
      if (res.data.error) {
        return toast.error(res.data.error);
      }
      navigate("/forgot-password/otp");
      return;
    }
    return toast.error("Hãy nhập email của bạn");
  };
  // return (
  //   <div className="w-full h-screen flex justify-center items-center bg-gray-100">
  //     <div className="bg-white p-3 rounded-sm shadow-lg w-[500px] h">
  //       <div>Email</div>
  //       <input
  //         className="w-full "
  //         type="email"
  //         required
  //         onChange={(e) => handleChange(e)}
  //       />
  //       <button className="" onClick={() => nagigateToOtp()}>
  //         <span>Next</span>
  //       </button>
  //     </div>

  //   </div>
  // );
  return (
    <div>
      <section className="bg-gray-50 w-screen dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Hãy nhập email của bạn
            </h2>
            <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  onChange={(e) => handleChange(e)}
                  placeholder="email"
                  type="email"
                  name="email"
                  className="bg-gray-50 border peer border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:border-blue-300 block w-full p-2.5 dark:bg-gray-700 dark:border-blue-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required="Hãy nhâp email của bạn"
                ></input>
                <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-xs">
                  Hãy nhập đúng định dạng email
                </p>
              </div>
            </div>
            <button
              onClick={() => nagigateToOtp()}
              className="w-full text-white mt-10 bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Gửi
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
