import { Link, useNavigate } from "react-router-dom";
import { loginUser, loginUserGoogle } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Không được để trống")
    .email("Email không hợp lệ"),
  password: yup
    .string()
    .required("Không được để trống")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(20, "Mật khẩu không được quá 20 ký tự"),
  // .matches(passwordRules, { message: "Please create a stronger password" }),
});

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(LoginSchema) });

  const onSubmit = (data) => {
    loginUser(data, dispatch, navigate);
  };
  const handleLoginGoogle = (credentialResponse) => {
    const newUser = {
      credential: credentialResponse.credential,
      client_id: credentialResponse.clientId,
      select_by: credentialResponse.select_by,
    };
    loginUserGoogle(newUser, dispatch, navigate);
  };
  return (
    <section className="h-screen">
      <div className="h-full px-6 py-24">
        <div className="flex h-full items-center justify-center lg:justify-between flex-row">
          {/* <!-- Left column container with background--> */}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-1/2 max-md:hidden">
            <img
              src="https://tailwindcomponents.com/svg/secure-login-animate.svg"
              className="w-full"
              alt="Phone image"
            />
          </div>

          {/* <!-- Right column container with form --> */}
          <div className="md:w-8/12 lg:ms-6 lg:w-1/2 w-full">
            <div className="w-full">
              <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
                <div className="w-full bg-white px-8 py-6 max-w-md">
                  <h1 className=" text-2xl font-bold text-center mb-4 dark:text-gray-200">
                    Chào mừng trở lại!
                  </h1>
                  <div className="mt-5 w-full flex justify-center">
                    <GoogleLogin
                      className="w-full"
                      onSuccess={(credentialResponse) => {
                        // console.log(credentialResponse);
                        handleLoginGoogle(credentialResponse);
                      }}
                      onError={() => {
                        console.log("Login Failed");
                      }}
                    />
                  </div>

                  <div className="w-full flex items-center justify-between py-5">
                    <hr className="w-full bg-gray-400" />
                    <p className="text-base font-medium leading-4 px-2.5 text-gray-400">
                      Hoặc
                    </p>
                    <hr className="w-full bg-gray-400  " />
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                      <label
                        // for="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Email
                      </label>
                      <input
                        // onChange={(e) => {
                        //   setUsername(e.target.value);
                        // }}

                        {...register("email")}
                        className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Email"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label
                        // for="password"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Mật khẩu
                      </label>
                      <input
                        // onChange={(e) => {
                        //   setPassword(e.target.value);
                        // }}
                        {...register("password")}
                        type="password"
                        className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Mật khẩu"
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm">
                          {errors.password.message}
                        </p>
                      )}
                      <Link to="/forgot-password">
                        <div
                          href="#"
                          className="w-[308px] mt-1 text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Quên mật khẩu?
                        </div>
                      </Link>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <Link to="/register">
                        <div
                          href="#"
                          className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Tạo tài khoản
                        </div>
                      </Link>
                    </div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Đăng nhập
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
