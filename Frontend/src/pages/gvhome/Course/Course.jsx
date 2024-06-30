/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteCourse } from "~/services/courseServices";

export default function Course({ course, handlePublic, deleteCourseUi }) {
  const handlePublicClick = () => {
    handlePublic(course._id);
  };
  const handleDeleteCourse = async () => {
    console.log("delete course", course._id);
    try {
      const res = await deleteCourse(course._id);
      deleteCourseUi(course._id);
      toast.success(res.data.message);
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log("course", course);
  return (
    <div
      key={course._id}
      className="mb-3 border flex flex-row justify-between items-center"
    >
      <div className="flex flex-row">
        <div>
          {!course?.imageId ? (
            <img
              className="object-cover min-w-60 max-w-60 max-h-40 min-h-40"
              src={"https://s.udemycdn.com/course/200_H/placeholder.jpg"}
              alt=""
            />
          ) : (
            <img
              className="object-cover min-w-60 max-w-60 max-h-40 min-h-40"
              src={"https://drive.google.com/thumbnail?id=" + course?.imageId}
              alt=""
            />
          )}
        </div>
        <div className="ml-4 flex items-center ">
          <div className="flex flex-col space-y-2">
            <p className="max-w-[20rem] text-lg font-bold truncate   ">
              {course.title}
            </p>
            {/* <p className="text-sm">Giáo viên: Tên giáo viên</p> */}
            <p className="text-sm">
              Danh mục: {course.categoryId?.categoryName}
            </p>
            <p className="text-sm">Số học viên: {course?.studyCount}</p>
          </div>
        </div>
      </div>
      <div className="max-w-[600px]">
        <Link to={`/CourseChapter/${course._id}`}>
          <button className=" mr-4 rounded-lg text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 py-3 px-6 font-sans text-xs font-bold uppercase hover:shadow-lg ">
            Chỉnh sửa nội dung
          </button>
        </Link>
        <Link to={`/coursedetail/${course._id}`}>
          <button className=" mr-4 rounded-lg text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 py-3 px-6 font-sans text-xs font-bold uppercase hover:shadow-lg ">
            Chỉnh sửa mô tả
          </button>
        </Link>
        {!course?.public ? (
          <button
            onClick={handlePublicClick}
            className=" mr-4 rounded-lg text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 py-3 px-6 font-sans text-xs font-bold uppercase hover:shadow-lg "
          >
            Xuất bản
          </button>
        ) : (
          <button
            onClick={handlePublicClick}
            className=" mr-4 rounded-lg text-white bg-blue-400 border border-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 py-3 px-6 font-sans text-xs font-bold uppercase hover:shadow-lg "
          >
            Hủy xuất bản
          </button>
        )}
        <button
          onClick={handleDeleteCourse}
          className=" mr-4 mt-1 rounded-lg text-white bg-red-500 border border-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-500 dark:focus:ring-red-600 py-3 px-6 font-sans text-xs font-bold uppercase hover:shadow-lg "
        >
          Xóa khóa học
        </button>
      </div>
    </div>
  );
}
