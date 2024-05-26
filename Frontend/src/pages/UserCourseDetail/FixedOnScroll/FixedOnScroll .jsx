import { useState, useEffect } from "react";
import { AiOutlineEdit } from "react-icons/ai";

const FixedOnScroll = () => {
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
          ? "fixed top-[80px] right-32 z-10"
          : "absolute top-[70px] right-32"
      } flex flex-col gap-2 items-center bg-white border border-gray-200  shadow-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:hover:text-gray-100 dark:focus:ring-gray-800 dark:focus:ring-4 dark:focus:outline-none dark:hover:shadow-lg dark:transition-all dark:duration-300 dark:ease-in-out dark:delay-75 hover:shadow-lg transition-all duration-300 ease-in-out delay-75`}
    >
      <img
        className="w-[400px] object-cover h-[200px] "
        src="https://soict.daotao.ai/asset-v1:SoICT+IT4210+2020-2+type@asset+block@banner-10.jpg"
        alt=""
      />
      <div className="w-3/4 flex flex-col gap-2 mb-5">
        <button className="w-full mt-3 h-12  text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  px-4 font-sans text-xs font-bold uppercase hover:shadow-lg">
          Bắt đầu học
        </button>
        <div className="w-full ">
          <div className="text-lg font-semibold">Khóa học gồm: </div>
          <div className="flex flex-row ">
            <AiOutlineEdit className="self-center" />
            <div className="text-sm">10 chương</div>
          </div>
          <div className="flex flex-row">
            <AiOutlineEdit className="self-center" />
            <div className="text-sm">20 bài</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixedOnScroll;
