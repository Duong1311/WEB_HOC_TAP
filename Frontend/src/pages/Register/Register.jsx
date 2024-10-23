import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Mật khẩu không khớp");
      return;
    }
    const newUser = {
      username: username,
      email: email,
      password: password,
    };
    registerUser(newUser, dispatch, navigate);
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
                <div className="bg-white px-8 py-6 max-w-md">
                  <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
                    Đăng ký
                  </h1>
                  {/* <div className="mt-5">
                    <button className="w-full text-center py-2 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                      <img
                        src="https://www.svgrepo.com/show/355037/google.svg"
                        className="w-6 h-6"
                        alt=""
                      />
                      <span>Login with Google</span>
                    </button>
                  </div>
                  <div className="w-full flex items-center justify-between py-5">
                    <hr className="w-full bg-gray-400" />
                    <p className="text-base font-medium leading-4 px-2.5 text-gray-400">
                      OR
                    </p>
                    <hr className="w-full bg-gray-400  " />
                  </div> */}
                  <form onSubmit={handleRegister}>
                    <div className="mb-4">
                      <label
                        // for="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Tên đăng nhập
                      </label>
                      <input
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                        type="text"
                        id="username"
                        className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Tên đăng nhập"
                        required
                        maxLength={20}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        // for="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Email
                      </label>
                      <input
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        type="email"
                        id="email"
                        className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        // for="password"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Mật khẩu
                      </label>
                      <input
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        type="password"
                        id="password"
                        className="shadow-sm rounded-md w-[308px] px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Mật khẩu"
                        required
                        minLength={6}
                        maxLength={20}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        // for="password"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Xác nhận mật khẩu
                      </label>
                      <input
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                        }}
                        type="password"
                        id="password"
                        className="shadow-sm rounded-md w-[308px] px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Xác nhận mật khẩu"
                        required
                        minLength={6}
                        maxLength={20}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Tạo tài khoản
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
