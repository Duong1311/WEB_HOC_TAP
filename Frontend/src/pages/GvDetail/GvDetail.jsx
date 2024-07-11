import {
  Box,
  CircularProgress,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchGv } from "~/services/courseServices";
import { getUserInfor } from "~/services/userServices";
import Course from "../Search/Course/Course";

export default function GvDetail() {
  const { id } = useParams();
  const [userDetaill, setUserDetaill] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const getUserData = async (id) => {
    try {
      const res = await getUserInfor(id);
      console.log(res.data);
      setUserDetaill(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const setCurPage = (e, p) => {
    setPage(p);
    fetchDataSearch(id, "", p);
    // console.log("page", p);
  };
  const fetchDataSearch = async (id, title, page) => {
    try {
      setIsLoading(true);
      const res = await searchGv(id, title, page);
      if (res.status === 200) {
        setCourses(res.data.courses);

        setTotalPage(res.data.totalPage);
        console.log(res.data);
      }
      // console.log(courses);
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getUserData(id);
    fetchDataSearch(id, "", page);
  }, [id]);
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          width: "100vw",
          height: "100vh",
        }}
      >
        <CircularProgress />
        <Typography>Đang tải...</Typography>
      </Box>
    );
  }
  return (
    <div className="flex justify-center bg-gray-100  min-h-screen w-full">
      <div className="w-4/6  ">
        <div className="w-full bg-white  my-5 rounded-sm shadow-md flex flex-col p-3  ">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col gap-2">
              <div className="text-xl font-semibold">Giảng viên</div>
              <div className="text-2xl font-serif">{userDetaill?.username}</div>
              <div className="text-xl font-serif">{userDetaill?.email}</div>

              {/* <div className="h-[100px]"></div> */}
            </div>
            <div>
              {userDetaill?.imageId ? (
                <img
                  className="object-cover w-52 h-52 rounded-full shadow-md"
                  src={
                    "https://drive.google.com/thumbnail?id=" +
                    userDetaill?.imageId
                  }
                  alt=""
                />
              ) : (
                <img
                  className="object-cover w-52 h-52 rounded-full shadow-md"
                  src={
                    "https://www.signivis.com/img/custom/avatars/member-avatar-01.png"
                  }
                  alt=""
                />
              )}
            </div>
          </div>
          <div>
            <div className="text-xl font-semibold">Giới thiệu về tôi</div>
            <div>{userDetaill?.description}</div>
          </div>
        </div>
        <div className="bg-white p-3 flex flex-col gap-2">
          <div className="text-xl font-semibold">Khóa học </div>
          {courses?.map((course) => {
            return <Course key={course._id} data={course} />;
          })}
          {totalPage > 1 && (
            <div className="w-full flex justify-center mt-3">
              <Stack spacing={2}>
                <Pagination
                  count={totalPage}
                  page={parseInt(page, 10)}
                  onChange={setCurPage}
                  color="primary"
                />
              </Stack>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
