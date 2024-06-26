import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/apiRequest";
import { createAxios } from "../../utils/createInstance";
import { logOutSuccess } from "../../redux/authSlice";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
// import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { getAllCategory } from "~/services/courseServices";
import { useEffect, useState } from "react";

export default function SearchHeader() {
  // const [categories, setCategory] = useState([]);
  const location = useLocation();
  const user = useSelector((state) => state.root.auth.login.currentUser);
  const accessToken = user?.accessToken;
  const id = user?._id;
  const isAdmin = user?.admin;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, logOutSuccess);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [searchParams, setSearchParams] = useSearchParams();
  const title = new URLSearchParams(location.search).get("search");
  if (!user) {
    navigate("/login");
  }
  const [message, setMessage] = useState(title || "");
  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // 👇 Get input value
      // setUpdated(message);
      console.log(message);
      setSearchParams({ search: message });
    }
  };
  // const getCategories = async () => {
  //   try {
  //     const res = await getAllCategory();
  //     console.log(res.data);
  //     setCategory(res.data);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);

    console.log("logout");
    logOut(dispatch, id, navigate, accessToken, axiosJWT);
  };
  useEffect(() => {
    // getCategories();
  }, []);
  return (
    <div className="w-full h-[60px] flex justify-center items-center fixed top-0 z-10 shadow-md bg-white ">
      <div className="w-full flex flex-row justify-between px-5">
        <div className="flex space-x-8 justify-center items-center text-sm ">
          <Link to="/">
            <img
              className="object-cover max-w-14 max-h-14"
              src="https://drive.google.com/thumbnail?id=1HRXvEoC1qJqBIsWVWgXcjFAeU-wIvxoJ"
              alt="Logo"
            />
          </Link>
          {/* <div className="relative hover-trigger h-full items-center flex justify-center">
            Thể loại
            <div className="absolute min-w-[200px] top-14 left-0 bg-white border border-grey-100 px-4 py-2 hover-target">
              {categories.map((category) => (
                // <Link to={`/category/${category._id}`} key={category._id}>
                <div key={category._id} className="hover:bg-gray-100 py-2">
                  {category.categoryName}
                </div>
                // {/* </Link> */}
          {/* ))}
            </div>
          </div>
          <style>
            {`
            .hover-trigger .hover-target {
              display: none;
            }

            .hover-trigger:hover .hover-target {
              display: block;
            }
          `}
          </style> */}{" "}
          <Link to="/userdoquestion">
            <div>Làm bài tập</div>
          </Link>
        </div>
        {/* Search */}
        <div className="relative items-center flex justify-center w-[400px] ">
          <div className="absolute inset-y-0 left-4 flex justify-center items-center">
            <svg
              width={25}
              height={25}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.7961 20.2041L17.3439 15.75C18.6788 14.0104 19.302 11.8282 19.0871 9.64606C18.8723 7.46389 17.8354 5.44515 16.1868 3.99936C14.5383 2.55356 12.4015 1.78898 10.21 1.8607C8.01841 1.93243 5.9362 2.83509 4.3857 4.38558C2.83521 5.93607 1.93255 8.01829 1.86083 10.2098C1.7891 12.4014 2.55369 14.5382 3.99948 16.1867C5.44527 17.8353 7.46401 18.8722 9.64618 19.087C11.8284 19.3019 14.0106 18.6787 15.7501 17.3437L20.2061 21.8006C20.3107 21.9053 20.4349 21.9883 20.5717 22.0449C20.7084 22.1015 20.8549 22.1307 21.0029 22.1307C21.1509 22.1307 21.2975 22.1015 21.4342 22.0449C21.5709 21.9883 21.6952 21.9053 21.7998 21.8006C21.9044 21.696 21.9875 21.5717 22.0441 21.435C22.1007 21.2983 22.1299 21.1517 22.1299 21.0037C22.1299 20.8557 22.1007 20.7092 22.0441 20.5725C21.9875 20.4357 21.9044 20.3115 21.7998 20.2069L21.7961 20.2041ZM4.12512 10.5C4.12512 9.23914 4.499 8.0066 5.1995 6.95823C5.89999 5.90987 6.89563 5.09277 8.06051 4.61026C9.22539 4.12775 10.5072 4.00151 11.7438 4.24749C12.9804 4.49347 14.1164 5.10063 15.0079 5.99219C15.8995 6.88375 16.5066 8.01966 16.7526 9.25629C16.9986 10.4929 16.8724 11.7747 16.3898 12.9396C15.9073 14.1045 15.0902 15.1001 14.0419 15.8006C12.9935 16.5011 11.761 16.875 10.5001 16.875C8.80989 16.8733 7.1894 16.201 5.99423 15.0059C4.79906 13.8107 4.12685 12.1902 4.12512 10.5Z"
                fill="black"
                fillOpacity={0.4}
              />
            </svg>
          </div>
          <input
            className="w-full placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-full text-black py-2 pl-12 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Search for anything..."
            type="text"
            name="search"
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        {user ? (
          <div className="flex justify-center items-center">
            <div
              className="flex items-center text-center mr-5"
              // sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
            >
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  {!user?.imageId ? (
                    <Avatar sx={{ width: 38, height: 38 }}>
                      {user?.username.charAt(0).toUpperCase()}
                    </Avatar>
                  ) : (
                    <img
                      className="object-cover max-w-10 max-h-10 rounded-full"
                      src={
                        "https://drive.google.com/thumbnail?id=" + user?.imageId
                      }
                      alt=""
                    />
                  )}
                </IconButton>
              </Tooltip>
              {/* <div>{user?.username}</div> */}
            </div>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              disableScrollLock={true}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {isAdmin ? (
                <Link to="/admin">
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Admin
                  </MenuItem>
                </Link>
              ) : (
                <div className="w-full h-full">
                  <Link to={`/userprofile/${id}`}>
                    <MenuItem onClick={handleClose}>
                      <Avatar /> Profile
                    </MenuItem>
                  </Link>
                  <Link to={`/usercoursestudys/${id}`}>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <PersonAdd fontSize="small" />
                      </ListItemIcon>
                      Khóa học của tôi
                    </MenuItem>
                  </Link>
                  <Link to="/gvhome">
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <PersonAdd fontSize="small" />
                      </ListItemIcon>
                      Giáo viên
                    </MenuItem>
                  </Link>
                </div>
              )}
              <Divider />

              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <div className="flex justify-center items-center">
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
          </div>
        )}
      </div>
    </div>
  );
}
