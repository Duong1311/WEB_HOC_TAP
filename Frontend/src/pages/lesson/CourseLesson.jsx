import { AiOutlineRight } from "react-icons/ai";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import draftToHtml from "draftjs-to-html";
// import draftToMarkdown from "draftjs-to-markdown";
import { useEffect, useState } from "react";
// import Markdown from "react-markdown";
// import rehypeRaw from "rehype-raw";
import { useParams } from "react-router-dom";

import { getLessonContent } from "~/services/courseServices";
import EditorLesson from "./Editor/EditorLesson";

export default function CourseLesson() {
  const { id } = useParams();
  const [lesson, setLesson] = useState({});
  const [old, setOld] = useState({});

  const getLessonContentApi = async (id) => {
    try {
      const res = await getLessonContent(id);
      setLesson(res.data);
      console.log(res.data);

      // Convert data to EditorState
      let a = {
        entityMap: res.data?.entityMap ? res.data.entityMap : {},
        blocks: res.data?.blocks
          ? res.data.blocks
          : [
              {
                key: "637gr",
                text: "Hãy nhập thông tin về bài học.",
                type: "unstyled",
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ],
      };
      setOld(a);
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log(old);

  useEffect(() => {
    getLessonContentApi(id);
  }, []);
  if (!lesson) return <div>Loading...</div>;
  return (
    <div className="min-h-[960px] flex justify-center">
      <div className="w-5/6">
        <div className="flex font-medium text-lg mt-10">
          <div className=" inline-block align-middle ">Khóa học</div>
          <AiOutlineRight className="self-center" />
          <div className="inline-block align-middle">Chương</div>
          <AiOutlineRight className="self-center" />
          <div className="inline-block align-middle">{lesson?.title}</div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="font-semibold text-2xl mt-4 ">{lesson?.title}</div>
          <div>
            <button
              // onClick={handleCreateLessonContent}
              className=" mr-4 rounded-lg text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  px-4 font-sans text-xs font-bold uppercase hover:shadow-lg "
            >
              Lưu
            </button>
          </div>
        </div>
        <EditorLesson old={old} />
      </div>
    </div>
  );
}
