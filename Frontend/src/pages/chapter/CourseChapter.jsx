import BoardContent from "./BoardContent/BoardContent";
import { mockData } from "~/apis/mock-data";

export default function CourseChapter() {
  return (
    <div className="flex justify-center h-[1000px] my-10">
      <BoardContent board={mockData?.board} />
    </div>
  );
}
