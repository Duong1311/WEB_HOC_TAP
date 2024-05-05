import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { getAllCategory } from "~/services/courseServices";

export default function CreateCourse() {
  const [categories, setCategory] = useState([]);
  const [courseCategory, setCourseCategory] = useState("");
  console.log(courseCategory);

  // const categories = ["Science", "Technology", "Engineering", "Mathematics"];
  const getCategories = async () => {
    try {
      const res = await getAllCategory();
      // console.log(res.data);
      setCategory(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="w-full flex flex-col items-center min-h-[90vh]">
      <div className="w-1/3 mt-20 ">
        <div className="w-full flex flex-col justify-center items-center  mb-7">
          <div className="font-medium text-2xl mb-4">Tên nội dung bài học</div>
          <div>
            Đừng lo nếu bạn không nghĩ ra được một tiêu đề hay ngay bây giờ.
          </div>
          <div>Bạn có thể thay đổi sau.</div>
        </div>
        <div className="">
          <TextField
            label={"Tên của bài học"}
            className="w-full"
            margin="none"
          />
        </div>
        <div className="w-full flex flex-col justify-center items-center my-7">
          <div className="font-medium text-2xl">
            Thể loại của kiến thức mà bạn sẽ chia sẻ?
          </div>
        </div>
        <div>
          <FormControl className="w-full" size="medium">
            <Select
              defaultValue=""
              // value={categories.map((category) => category._id) || ""}
              onChange={(event) => setCourseCategory(event.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              className="bg-white"
            >
              <MenuItem value="">
                <div>Hãy chọn một thể loại</div>
              </MenuItem>

              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.categoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="w-full flex justify-between mt-10">
          <Link to="/gvhome">
            <Button variant="contained" size="large">
              Quay lại
            </Button>
          </Link>
          <Button variant="contained" size="large">
            Tạo khóa học
          </Button>
        </div>
      </div>
    </div>
  );
}
