import { useEffect, useState } from "react";
import { getAllcourses, publicCourse } from "~/services/courseServices";
import { useSelector } from "react-redux";
import Course from "./Course/Course";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.root.auth.login.currentUser);
  if (!user) {
    navigate("/login");
  }
  // const id = user?._id;
  // console.log(id);

  const [courses, setCourses] = useState([]);
  // const id = "66110bbe6da80b59f28b6689";

  const publicCourseApi = async (courseId) => {
    try {
      const res = await publicCourse(courseId);
      console.log(res.data);
      // getAllCourses(id);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlePublic = (courseId) => {
    console.log(courseId);
    //find course by id
    const newCourse = [...courses];
    const course = newCourse.find((course) => course._id === courseId);
    console.log(course);

    if (course) {
      course.public = !course.public;
    }
    setCourses(newCourse);
    publicCourseApi(courseId);
  };

  const getAllcoursesData = async () => {
    try {
      const res = await getAllcourses();
      console.log(res.data);
      setCourses(res.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getAllcoursesData();
  }, []);

  return (
    <div className=" min-h-[1000px] bg-white">
      <div className="flex justify-center items-center ">
        <div className="flex flex-col justify-between w-5/6 mt-10">
          <div className="flex flex-row justify-between mb-3">
            <div>
              <div className="max-w-xl mx-auto">
                <form className="flex items-center">
                  <label className="sr-only">Search</label>
                  <div className="relative w-full">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {courses &&
            courses?.map((course) => {
              return (
                <Course
                  key={course._id}
                  course={course}
                  handlePublic={handlePublic}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
