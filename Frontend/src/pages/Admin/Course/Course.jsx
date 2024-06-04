/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function Course({ course, handlePublic }) {
  const handlePublicClick = () => {
    handlePublic(course._id);
  };

  return (
    <div
      key={course._id}
      className="mb-3 border flex flex-row justify-between items-center "
    >
      <div className="flex flex-row">
        <div>
          <img
            className="object-cover w-40 h-32"
            src="https://s.udemycdn.com/course/200_H/placeholder.jpg"
            alt=""
          />
        </div>
        <div className="ml-4 flex items-center">
          <div className="flex flex-col space-y-2">
            <p className="text-lg font-bold">{course.title}</p>
            {/* <p className="text-sm">Giáo viên: Tên giáo viên</p> */}
            <p className="text-sm">
              Danh mục: {course.categoryId?.categoryName}
            </p>
            <p className="text-sm">Số học viên: {course?.studyCount}</p>
          </div>
        </div>
      </div>
      <div className="">
        <Link to={`/usercoursedetail/${course._id}`}>
          <button className=" mr-4 rounded-lg text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 py-3 px-6 font-sans text-xs font-bold uppercase hover:shadow-lg ">
            Xem chi tiết
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
      </div>
    </div>
  );
}
