/* eslint-disable react/prop-types */
export default function UserLessonContent({ markdown }) {
  return (
    <div className="center mb-36">
      <style>
        {`.center img {
              display: block;
              margin-left: auto;
              margin-right: auto;
              max-width: 100%;
          }
          .center iframe {
              display: block;
              margin-left: auto;
              margin-right: auto;
              padding-top: 40px;
              padding-bottom: 40px;
              width: 100%;
              height: 700px;
          }
          `}
      </style>
      <div dangerouslySetInnerHTML={{ __html: markdown }} />
    </div>
  );
}
