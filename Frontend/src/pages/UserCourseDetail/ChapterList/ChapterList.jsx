/* eslint-disable react/prop-types */
import Chapter from "./Chapter/Chapter";
export default function ChapterList({ chapters }) {
  return (
    <div>
      {chapters.map((chapter) => (
        <Chapter key={chapter._id} chapter={chapter} />
      ))}
    </div>
  );
}
