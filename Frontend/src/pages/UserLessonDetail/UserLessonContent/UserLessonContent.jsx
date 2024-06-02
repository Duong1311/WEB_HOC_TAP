/* eslint-disable react/prop-types */
export default function UserLessonContent({ markdown }) {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: markdown }} />
    </div>
  );
}
