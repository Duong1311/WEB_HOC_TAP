import { AiOutlineRight } from "react-icons/ai";

export default function CourseLesson() {
  return (
    <div className="min-h-[960px] flex justify-center">
      <div className="w-5/6">
        <div className="flex font-medium text-lg mt-10">
          <div className=" inline-block align-middle ">Khóa học</div>
          <AiOutlineRight className="self-center" />
          <div className="inline-block align-middle">Chương</div>
          <AiOutlineRight className="self-center" />
          <div className="inline-block align-middle">Bài</div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
