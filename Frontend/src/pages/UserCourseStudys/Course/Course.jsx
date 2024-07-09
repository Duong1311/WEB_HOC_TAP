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
import { Link, useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useState } from "react";
import { deleteCourseHistory } from "~/services/userServices";
import { toast } from "react-toastify";

export default function Course({ data, getCourseStudys }) {
  console.log("data", data);
  const { id } = useParams();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => setAnchorEl(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const deleteCourse = async () => {
    console.log("delete course");
    handleClose();
    const res = await deleteCourseHistory(data?._id);
    if (res.data.status === 404) {
      toast.error(res.data.message);
    }
    if (res.data.status === 200) {
      toast.success(res.data.message);
    }
    getCourseStudys(id, 1, 5, "");
  };
  return (
    <div className="bg-white rounded-lg w-full  flex flex-row justify-between border border-gray-100 p-3 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
      <div className="flex flex-row">
        <div>
          <img
            className="w-72 h-40 object-cover rounded-lg"
            src={
              data?.courseId?.imageId
                ? "https://drive.google.com/thumbnail?id=" +
                  data?.courseId?.imageId
                : "https://soict.daotao.ai/asset-v1:SoICT+IT4210+2020-2+type@asset+block@banner-10.jpg"
            }
            alt=""
          />
        </div>
        <div className="flex flex-col justify-between ml-5 p-5">
          <div className="font-semibold text-2xl max-w-[700px] truncate ">
            {data?.courseId?.title || "Ten khoa hoc"}
          </div>
          {/* <div className="font-light">{data?.userId?.username || "tac gia"}</div> */}
          <div className="flex flex-row gap-2 ">
            <Rating
              disableFillHover={true}
              initialValue={data?.courseId?.totalRating || 0}
              size={20}
              SVGstyle={{ display: "inline" }}
              allowFraction={true}
              readonly={true}
              className="float-left"
            />
            <div className="text-yellow-600 mt-[3px]">
              {data?.courseId?.totalRating?.toFixed(1) || 0}
            </div>
          </div>
          <Link to={`/usercoursedetail/${data?.courseId?._id}`}>
            <button className="p-2.5 text-base font-medium text-white bg-blue-600 rounded-lg border border-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-600 dark:focus:ring-blue-800">
              Tiếp tục học
            </button>
          </Link>
        </div>
      </div>

      <div className=" ">
        <Box>
          <Tooltip title="More options">
            <MoreVertIcon
              sx={{ color: "text.primary", cursor: "pointer" }}
              id="basic-chapter-dropdown"
              aria-controls={open ? "basic-menu-chapter-dropdown" : undefined}
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
            <MenuItem onClick={deleteCourse}>
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
      </div>
    </div>
  );
}
