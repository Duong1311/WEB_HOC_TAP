import { useParams } from "react-router-dom";
import Course from "./Course/Course";
import { useEffect, useState } from "react";
import { getAllCourseStudys } from "~/services/userServices";
import {
  Box,
  CircularProgress,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";

export default function UserCourseStudys() {
  const { id } = useParams();
  const [courseStudys, setCourseStudys] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const setCurPage = async (e, p) => {
    setPage(p);
    // console.log(p);
    await getCourseStudys(id, p, 5, "");
  };
  const getCourseStudys = async (id, page, limit, title) => {
    try {
      setIsLoading(true);
      const res = await getAllCourseStudys(id, page, limit, title);
      // console.log("data", res.data);
      setCourseStudys(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCourseStudys(id, 1, 5, "");
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
    <div className="flex justify-center items-center">
      <div className="w-5/6 my-5 p-3  ">
        <div className="text-2xl font-semibold mb-5">Khóa học của tôi</div>
        <div className="flex flex-col gap-2 min-h-screen">
          {courseStudys &&
            courseStudys?.courses?.map((data, i) => {
              return (
                <Course key={i} data={data} getCourseStudys={getCourseStudys} />
              );
            })}
        </div>

        {courseStudys?.totalPage > 1 && (
          <div className="w-full flex justify-center mt-3">
            <Stack spacing={2}>
              <Pagination
                count={courseStudys?.totalPage}
                page={parseInt(page, 10)}
                onChange={setCurPage}
                color="primary"
              />
            </Stack>
          </div>
        )}
      </div>
    </div>
  );
}
