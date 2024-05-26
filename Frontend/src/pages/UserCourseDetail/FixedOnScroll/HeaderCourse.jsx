/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";

export default function HeaderCourse({ course }) {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={`${
        isFixed
          ? "fixed w-full flex flex-col justify-center shadow-sm h-[60px] px-3 py-4 bg-black top-0 right-0 left-0 z-10"
          : "hidden"
      } `}
    >
      <div className="font-semibold text-xl text-white ">{course?.title}</div>
      <div className="flex flex-row gap-2 ">
        <Rating
          disableFillHover={true}
          initialValue={0}
          size={15}
          SVGstyle={{ display: "inline", verticalAlign: "text-top" }}
          allowFraction={true}
          className="float-left"
        />
        <div className=" text-yellow-500">0</div>
        <div className="text-white text-sm">(100 ratings)</div>
        <div className="text-white text-sm">100 học sinh </div>
      </div>
    </div>
  );
}
