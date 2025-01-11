/* eslint-disable react/prop-types */
import {
  Box,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { Rating } from "react-simple-star-rating";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { toast } from "react-toastify";
import { deleteRatingById } from "~/services/courseServices";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function RatingCourse({ data, getRatingData }) {
  const user = useSelector((state) => state.root.auth.login.currentUser);
  const { id } = useParams();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => setAnchorEl(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const deleteRating = async () => {
    // console.log("delete rating");
    handleClose();
    // console.log(data);
    const res = await deleteRatingById(data?._id);
    if (res.data.status === 404) {
      toast.error(res.data.message);
    }
    if (res.data.status === 200) {
      toast.success(res.data.message);
    }
    getRatingData(id, 1, 4);
  };
  return (
    <div className="w-full min-w-[208px] flex flex-col gap-2 border border-black px-3 py-3 ">
      <div className="flex flex-row justify-between items-center">
        <div className=" flex flex-row">
          {data?.userId?.imageId ? (
            <img
              src={
                "https://drive.google.com/thumbnail?id=" + data?.userId?.imageId
              }
              alt="Logo"
              className="w-14 h-14 rounded-full"
            />
          ) : (
            <div className="w-14 h-14  bg-yellow-500 rounded-full flex items-center justify-center font-bold text-white">
              LOGO
            </div>
          )}
          <div className="ml-3">
            <div className="text-lg font-semibold">
              {data?.userId?.username}
            </div>

            <div className="flex flex-row gap-2">
              <Rating
                disableFillHover={true}
                initialValue={data?.rating}
                size={15}
                SVGstyle={{
                  display: "inline",
                  verticalAlign: "text-top",
                }}
                allowFraction={true}
                className="float-left"
              />
              <div className=" text-yellow-500">{data?.rating}</div>
              {/* <div className="text-sm">(100 ratings)</div> */}
            </div>
          </div>
        </div>
        <div className=" ">
          {user && user._id === data?.userId?._id ? (
            <Box>
              <Tooltip title="More options">
                <MoreVertIcon
                  sx={{ color: "text.primary", cursor: "pointer" }}
                  id="basic-chapter-dropdown"
                  aria-controls={
                    open ? "basic-menu-chapter-dropdown" : undefined
                  }
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                />
              </Tooltip>
              <Menu
                id="basic-menu-chapter-dropdown"
                disableScrollLock={true}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-chapter-dropdown",
                }}
              >
                <MenuItem onClick={deleteRating}>
                  <ListItemIcon>
                    <DeleteForeverIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Xóa</ListItemText>
                  <Typography variant="body2" color="text.secondary">
                    ⌘X
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : null}
        </div>
      </div>
      <div className="text-sm">{data?.comment}</div>
    </div>
  );
}
