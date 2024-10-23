import {
  Box,
  CircularProgress,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { getAllCategory, searchCourse } from "~/services/courseServices";

export default function Home() {
  const [message, setMessage] = useState("");
  const [courses, setCourses] = useState([]);
  const [categories, setCategory] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // 👇 Get input value
      // setUpdated(message);
      console.log(message);
      navigate(`/course/search/?search=${message}`);
    }
  };
  const getCategories = async () => {
    try {
      const res = await getAllCategory();
      console.log(res.data);
      setCategory(res.data.slice(0, 10));
    } catch (error) {
      console.log(error.message);
    }
  };

  // const getAllcoursesData = async () => {
  //   try {
  //     const res = await getAllcourses();
  //     console.log(res.data);
  //     setCourses(res.data);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };
  const fetchDataSearch = async (
    title,
    selectedCategory,
    sort,
    page,
    limit
  ) => {
    try {
      const res = await searchCourse(
        title,
        selectedCategory,
        sort,
        page,
        limit
      );
      console.log(res.data);
      setTotalPage(res.data.totalPage);
      setCourses(res.data.courses);
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };
  const setCurPage = async (e, p) => {
    setPage(p);
    console.log(p);
    await fetchDataSearch("", "", "", p, 12);

    // await getCourseStudys(id, p, 5, "");
  };

  useEffect(() => {
    fetchDataSearch("", "", "", page, 12);

    // getAllcoursesData();
    getCategories();
  }, []);

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
    <div className=" w-full flex flex-col  items-center ">
      <div className="relative w-full">
        <div className=" h-[200px] lg:h-[460px] w-full bg-gradient-to-r from-cyan-700 via-blue-500 to-indigo-600"></div>
        <div className="absolute mx-auto my-auto top-11 left-0 right-0 text-center  text-white">
          <div className="flex flex-col space-y-10 justify-center items-center">
            <div className="hidden lg:inline">
              {categories &&
                categories?.map((categorie) => {
                  return (
                    <Link
                      key={categorie?._id}
                      to={`/course/search/?search=&filter=${categorie?._id}`}
                    >
                      <button className=" ml-4 rounded-full text-black bg-[#F8F7F4] py-3 px-6 font-sans text-xs font-bold uppercase shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-slate-400 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                        {categorie?.categoryName}
                      </button>
                    </Link>
                  );
                })}
            </div>
            <div className="text-6xl font-bold hidden lg:inline">
              Học tập là Sức Mạnh
            </div>
            <div className="hidden lg:inline">
              Chào mừng bạn đến với nền tảng học tập trực tuyến, nơi mà sự hiếu
              kỳ được thúc đẩy và tri thức được khám phá.<br></br> Hãy bắt đầu
              hành trình và mở ra cánh cửa giới hạn!
            </div>
            <div className="flex justify-center items-center w-full">
              <div className="relative w-1/2 lg:w-1/3  flex justify-center">
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
                  className="placeholder:italic placeholder:text-slate-400 block bg-white w-full h-[3.5rem] border border-slate-300 rounded-full text-black py-2 pl-12 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Tìm kiếm bằng tên khóa học..."
                  type="text"
                  name="search"
                  value={message}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center w-full ">
        <div className="w-5/6">
          <div className="w-full flex justify-between mt-7">
            <div className="w-auto  font-semibold text-2xl">
              Tất cả khóa học
            </div>
            <div className="hidden w-auto font-semibold text-sm text-gray-500 pt-2">
              xem thêm {">>"}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-7">
            {courses &&
              courses?.map((data) => {
                return (
                  <div
                    className="flex flex-col justify-center border border-gray-100 bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
                    key={data._id}
                  >
                    <Link to={`/usercoursedetail/${data?._id}`}>
                      <div className="overflow-hidden">
                        <img
                          className="object-cover w-full h-[161px] rounded-lg  hover:scale-125 transition duration-300 ease-in-out"
                          src={
                            data?.imageId
                              ? "https://drive.google.com/thumbnail?id=" +
                                data?.imageId
                              : "https://soict.daotao.ai/asset-v1:SoICT+IT4210+2020-2+type@asset+block@banner-10.jpg"
                          }
                          alt="anh khoa hoc"
                        />
                      </div>
                      <div className="font-semibold max-w-[250px] truncate">
                        {data?.title}
                      </div>
                      <div className="font-light">
                        {data?.userId?.username || "tac gia"}
                      </div>
                      <div className="flex flex-row gap-2 ">
                        <Rating
                          disableFillHover={true}
                          initialValue={data?.totalRating || 0}
                          size={20}
                          SVGstyle={{ display: "inline" }}
                          allowFraction={true}
                          className="float-left"
                        />
                        <div className="text-yellow-600 mt-[1px]">
                          {data?.totalRating.toFixed(1) || 5}
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
          {totalPage > 1 && (
            <div className="w-full flex justify-center my-3">
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
