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
import PersonAdd from "@mui/icons-material/PersonAdd";
// import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { getAllCategory } from "~/services/courseServices";
import { useEffect, useState } from "react";

export default function Header() {
  const [categories, setCategory] = useState([]);

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
  const getCategories = async () => {
    try {
      const res = await getAllCategory();
      console.log(res.data);
      setCategory(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
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
    getCategories();
  }, []);
  return (
    <div className="w-full h-[60px] flex justify-center items-center fixed top-0 z-10 shadow-md bg-white ">
      <div className="w-full flex flex-row justify-between px-5">
        <div className="flex space-x-8 justify-center items-center text-sm ">
          <Link to="/">
            <div>
              <img
                className="object-cover max-w-14 max-h-14"
                src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/444469790_438593725459566_6608098911307273135_n.jpg?stp=dst-jpg_p526x296&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=qvwBDTOIWEMQ7kNvgHmoJiQ&_nc_ht=scontent.fhan14-3.fna&oh=00_AYA9cb794t4FNrzwIgwwn4r6xL7aQb8NANE1c32MmBprog&oe=6659EAEE"
                alt="ádas"
              />
            </div>
          </Link>

          <div className="relative hover-trigger h-full items-center flex justify-center">
            Thể loại
            <div className="absolute min-w-[200px] top-14 left-0 bg-white border border-grey-100 px-4 py-2 hover-target">
              {categories.map((category) => (
                // <Link to={`/category/${category._id}`} key={category._id}>
                <div key={category._id} className="hover:bg-gray-100 py-2">
                  {category.categoryName}
                </div>
                // {/* </Link> */}
              ))}
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
          </style>

          <Link to="/gvhome">
            <div>Giáo viên</div>
          </Link>
        </div>

        {user ? (
          <>
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
                  <Avatar sx={{ width: 38, height: 38 }}>M</Avatar>
                </IconButton>
              </Tooltip>
              <div>{user?.username}</div>
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
              <Divider />

              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
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
        )}
      </div>
    </div>
  );
}
