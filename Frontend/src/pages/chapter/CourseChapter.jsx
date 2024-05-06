import BoardContent from "./BoardContent/BoardContent";
// import { mockData } from "~/apis/mock-data";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCourseCreatedById } from "~/services/courseServices";

export default function CourseChapter() {
  const { id } = useParams();
  const [course, setCourse] = useState();
  const fetchData = async () => {
    try {
      const res = await getCourseCreatedById(id);
      setCourse(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex justify-center h-[1000px] my-10">
      <div>
        <div>
          <BoardContent course={course} />
        </div>
      </div>
    </div>
  );
}
