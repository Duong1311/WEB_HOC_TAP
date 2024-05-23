import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/apiRequest";
import { createAxios } from "../../utils/createInstance";
import { logOutSuccess } from "../../redux/authSlice";

export default function GvHeader() {
  const user = useSelector((state) => state.root.auth.login.currentUser);
  // console.log(user);
  const accessToken = user?.accessToken;
  // console.log(accessToken);
  const id = user?._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, logOutSuccess);
  const handleLogout = () => {
    console.log("logout");
    logOut(dispatch, id, navigate, accessToken, axiosJWT);
  };
  return (
    <div className="w-full z-10 h-[60px] flex justify-between items-center border fixed top-0 bg-white">
      <div className="flex space-x-8 justify-center items-center ml-8 font-medium ">
        <Link to="/gvhome">
          <div>Logo</div>
        </Link>
        <Link to="/gvhome">
          <div>Tạo khóa học</div>
        </Link>
      </div>
      <div className="flex space-x-8 mr-8 ">
        <p className="navbar-user">
          Hi, <span> {user?.username} </span>{" "}
        </p>
        <Link to="/" onClick={handleLogout}>
          {" "}
          Log out
        </Link>
      </div>
      {/* {user ? (
        <>
          <div className="flex space-x-8 mr-8">
            <p className="navbar-user">
              Hi, <span> {user.username} </span>{" "}
            </p>
            <Link to="/" onClick={handleLogout}>
              {" "}
              Log out
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="flex space-x-8 mr-8">
            <Link to="/login">
              <button className="middle none center mr-4 rounded-lg text-black bg-[#F8F7F4] py-3 px-6 font-sans text-xs font-bold uppercase shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-slate-400 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                Đăng nhập
              </button>
            </Link>
            <Link to="/register">
              <button className="middle none center mr-4 rounded-lg bg-black py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                Đăng ký
              </button>
            </Link>
          </div>
        </>
      )} */}
    </div>
  );
}
