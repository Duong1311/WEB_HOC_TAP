import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Course from "./Course/Course";
import { searchCourse } from "~/services/courseServices";

export default function Search() {
  const location = useLocation();
  const title = new URLSearchParams(location.search).get("search");
  const [courseSearch, setCourseSearch] = useState([]);

  useEffect(() => {
    const fetchDataSearch = async (title) => {
      try {
        const res = await searchCourse(title);
        if (res.status === 200) {
          setCourseSearch(res.data);
          console.log("res.data", res.data);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchDataSearch(title);
  }, [title]);

  return (
    <div className="flex justify-center items-center">
      <div className="w-5/6 my-5 p-3">
        <div className="text-2xl font-semibold mb-5">
          Kết quả tìm kiếm cho &quot; {title} &quot;
        </div>
        <div className="flex flex-col gap-2">
          {courseSearch &&
            courseSearch.map((data, i) => {
              return <Course key={i} data={data} />;
            })}{" "}
        </div>
      </div>
    </div>
  );
}
