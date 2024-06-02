import { useParams } from "react-router-dom";
import Course from "./Course/Course";
import { useEffect, useState } from "react";
import { getAllCourseStudys } from "~/services/userServices";

export default function UserCourseStudys() {
  const { id } = useParams();
  const [courseStudys, setCourseStudys] = useState([]);
  const getCourseStudys = async (id) => {
    try {
      const res = await getAllCourseStudys(id);
      console.log("datasdfsdf", res.data);
      setCourseStudys(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCourseStudys(id);
  }, [id]);
  return (
    <div className="flex justify-center items-center">
      <div className="w-5/6 my-5 p-3">
        <div className="text-2xl font-semibold mb-5">Khóa học của tôi</div>
        <div className="flex flex-col gap-2">
          {courseStudys &&
            courseStudys.map((data, i) => {
              return <Course key={i} data={data} />;
            })}
        </div>
      </div>
    </div>
  );
}
