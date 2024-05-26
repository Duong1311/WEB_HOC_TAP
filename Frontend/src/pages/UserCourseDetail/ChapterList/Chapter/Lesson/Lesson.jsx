/* eslint-disable react/prop-types */
export default function Lesson({ lessons }) {
  return (
    <div className="flex flex-col gap-2 border-x border-b border-gray-300 px-3 py-3">
      {lessons.map((lesson) => (
        <div key={lesson._id} className="flex flex-row gap-2">
          <div className="text-lg font-medium">{lesson.title}</div>
        </div>
      ))}
    </div>
  );
}
