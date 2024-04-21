import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
    };
    loginUser(newUser, dispatch, navigate);
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
                    Welcome Back!
                  </h1>
                  <div className="mt-5">
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
                  </div>
                  <form onSubmit={handleLogin}>
                    <div className="mb-4">
                      <label
                        // for="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        User Name
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
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        // for="password"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Password
                      </label>
                      <input
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        type="password"
                        id="password"
                        className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your password"
                        required
                      />
                      <Link to="/forgot-password">
                        <div
                          href="#"
                          className="w-[308px] text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Forgot Password?
                        </div>
                      </Link>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="remember"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none"
                          // checked
                        />
                        <label
                          // for="remember"
                          className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                        >
                          Remember me
                        </label>
                      </div>
                      <Link to="/register">
                        <div
                          href="#"
                          className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Create Account
                        </div>
                      </Link>
                    </div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Login
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
