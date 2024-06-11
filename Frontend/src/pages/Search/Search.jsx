import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Course from "./Course/Course";
import { getAllCategory, searchCourse } from "~/services/courseServices";
import {
  Box,
  CircularProgress,
  FormControl,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { set } from "lodash";

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const title = new URLSearchParams(location.search).get("search");
  const queryParams = new URLSearchParams(location.search);

  //--------------------State--------------------
  const [courseSearch, setCourseSearch] = useState([]);
  const [categories, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    queryParams.get("filter") || ""
  );
  const [sortType, setSortType] = useState([
    { sort: "studyCount", name: "Số lượng người học" },
    { sort: "totalRating", name: "Đánh giá cao nhất" },
  ]);
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(queryParams.get("page") || 1);
  const [totalPage, setTotalPage] = useState(1);
  const setCurPage = (e, p) => {
    setPage(p);
    queryParams.set("page", p);
    navigate({ search: queryParams.toString() });
    // console.log("page", p);
  };
  const getCategories = async () => {
    try {
      setIsLoading(true);
      const res = await getAllCategory();
      // console.log(res.data);
      setCategory(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleRadioChange = (event) => {
    setSelectedCategory(event.target.value);
    queryParams.set("filter", event.target.value);
    navigate({ search: queryParams.toString() });
    // console.log("categoryId", event.target.value);
  };
  const handleReset = () => {
    // queryParams.delete("filter");

    setSelectedCategory("");
  };
  const handleSortChange = (event) => {
    setSort(event.target.value);
    queryParams.set("sort", event.target.value);
    // console.log("sort", event.target.value);
  };
  const fetchDataSearch = async (
    title,
    selectedCategory,
    sort,
    page,
    limit
  ) => {
    try {
      setIsLoading(true);
      const res = await searchCourse(
        title,
        selectedCategory,
        sort,
        page,
        limit
      );
      if (res.status === 200) {
        setCourseSearch(res.data.courses);
        setTotalPage(res.data.totalPage);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchDataSearch(title, selectedCategory, sort, page, 5);
    getCategories();
  }, [title, selectedCategory, sort, page]);

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
        <Typography>Loading Board...</Typography>
      </Box>
    );
  }
  return (
    <div className="flex justify-center items-center">
      <div className="w-5/6 my-5 p-3">
        {title && (
          <div className=" w-full text-3xl font-semibold mb-5">
            Kết quả tìm kiếm cho &quot; {title} &quot;
          </div>
        )}
        <div className="w-full flex flex-row">
          <div className="w-[400px] h-auto bg-white rounded-sm p-4 mr-5">
            {/* <div className=" w-full flex flex-row justify-between">
              <div className=" text-2xl font-semibold ">Sắp xếp theo</div>
              <div
                className=" text-blue-600 hover:text-blue-800 mt-1"
                onClick={handleReset}
              >
                Xóa bộ lọc
              </div>
            </div>
            <div className="my-5">
              <FormControl
                // disableScrollLock={true}
                className="w-full"
                size="medium"
              >
                <Select
                  MenuProps={{
                    disableScrollLock: true,
                  }}
                  defaultValue=""
                  onChange={handleSortChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  className="bg-white"
                >
                  <MenuItem value="">
                    <div>Liên quan nhất</div>
                  </MenuItem>

                  {sortType.map((sort) => (
                    <MenuItem key={sort.sort} value={sort.sort}>
                      {sort.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div> */}
            <div className=" w-full flex flex-row justify-between">
              <div className=" text-2xl font-semibold ">Thể loại</div>
              <div
                className=" text-blue-600 hover:text-blue-800 mt-1"
                onClick={handleReset}
              >
                Xóa bộ lọc
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-2">
              {categories &&
                categories.map((category, i) => {
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-5 bg-gray-50 p-3 "
                    >
                      <input
                        type="radio"
                        name="category"
                        value={category._id}
                        checked={selectedCategory === category._id}
                        onChange={handleRadioChange}
                        className="w-4 h-4"
                      />
                      <div className=" font-medium">
                        {category.categoryName}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            {courseSearch &&
              courseSearch.map((data, i) => {
                return <Course key={i} data={data} />;
              })}
          </div>
        </div>
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
      </div>
    </div>
  );
}
