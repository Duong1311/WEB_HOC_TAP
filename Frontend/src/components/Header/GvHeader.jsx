import { Link, useNavigate } from "react-router-dom";
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

import Logout from "@mui/icons-material/Logout";
import { PersonAdd } from "@mui/icons-material";

export default function GvHeader() {
  const user = useSelector((state) => state.root.auth.login.currentUser);
  // console.log(user);
  const accessToken = user?.accessToken;
  // console.log(accessToken);
  const id = user?._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, logOutSuccess);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  if (!user) {
    navigate("/login");
  }
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
  return (
    <div className="w-full z-10 h-[60px] flex justify-between items-center border fixed top-0 bg-white">
      <div className="flex space-x-8 justify-center items-center ml-8 font-medium ">
        <Link to={"/gvhome"}>
          <div>
            <img
              className="object-cover max-w-14 max-h-14"
              src="https://drive.google.com/thumbnail?id=1HRXvEoC1qJqBIsWVWgXcjFAeU-wIvxoJ"
              alt="Logo"
            />
          </div>
        </Link>
        <Link to="/gvhome">
          <div>Tạo khóa học</div>
        </Link>
      </div>
      <div className="flex flex-row items-center">
        <Link to="/">
          <div>Học viên</div>
        </Link>
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
                  src={"https://drive.google.com/thumbnail?id=" + user?.imageId}
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
          <Link to={`/userprofile/${id}`}>
            <MenuItem onClick={handleClose}>
              <Avatar /> Thông tin cá nhân
            </MenuItem>
          </Link>
          <Link to={`/`}>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Học viên
            </MenuItem>
          </Link>

          <Divider />

          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Đăng xuất
          </MenuItem>
        </Menu>
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
