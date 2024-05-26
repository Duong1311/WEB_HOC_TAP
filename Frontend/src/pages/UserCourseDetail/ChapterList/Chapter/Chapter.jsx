/* eslint-disable react/prop-types */
import Lesson from "./Lesson/Lesson";
import { useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
export default function Chapter({ chapter }) {
  const [openLessons, setOpenLessons] = useState(false);

  return (
    <div>
      <div
        onClick={() => {
          setOpenLessons(!openLessons);
        }}
        className="flex flex-row justify-between transition cursor-pointer gap-2 border border-gray-300 px-3 py-3 bg-[#f7f9fa]"
      >
        <div className="text-lg font-semibold">{chapter?.title}</div>

        {openLessons ? (
          <AiOutlineUp className="self-center" />
        ) : (
          <AiOutlineDown className="self-center" />
        )}
      </div>
      {openLessons && <Lesson lessons={chapter?.lessons} />}
    </div>
  );
}
