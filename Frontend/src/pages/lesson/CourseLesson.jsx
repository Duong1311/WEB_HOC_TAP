import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import draftToHtml from "draftjs-to-html";
// import draftToMarkdown from "draftjs-to-markdown";
import { useEffect, useState } from "react";
// import Markdown from "react-markdown";
// import rehypeRaw from "rehype-raw";
import { useParams } from "react-router-dom";

import { getLessonContent } from "~/services/courseServices";
import EditorLesson from "./Editor/EditorLesson";
import QuestionList from "./QuestionList/QuestionList";

export default function CourseLesson() {
  const { id } = useParams();
  const [lesson, setLesson] = useState({});
  const [old, setOld] = useState({});
  const [displayEditor, setDisplayEditor] = useState(true);
  const toggleDisplayEditor = () => {
    setDisplayEditor(true);
    setDisplayQuestion(false);
  };
  const [displayQuestion, setDisplayQuestion] = useState(false);
  const toggleDisplayQuestion = () => {
    setDisplayQuestion(true);
    setDisplayEditor(false);
  };

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

  useEffect(() => {
    getLessonContentApi(id);
  }, []);
  if (!lesson) return <div>Loading...</div>;
  return (
    <div className="min-h-[960px] flex justify-center">
      <div className="w-5/6">
        {/* <div className="flex font-medium text-lg mt-10">
          <div className=" inline-block align-middle ">Khóa học</div>
          <AiOutlineRight className="self-center" />
          <div className="inline-block align-middle">Chương</div>
          <AiOutlineRight className="self-center" />
          <div className="inline-block align-middle">{lesson?.title}</div>
        </div> */}
        <nav aria-label="breadcrumb" className="mt-10">
          <ol className="flex space-x-2">
            <li>
              <a
                href="#"
                className="after:content-['/'] after:ml-2 text-gray-600 hover:text-purple-700"
              >
                Bài
              </a>
            </li>
            <li>
              <a
                href="#"
                className="after:content-['/'] after:ml-2 text-gray-600 hover:text-purple-700"
              >
                Chương
              </a>
            </li>
            <li className="text-purple-700" aria-current="page">
              {lesson?.title}
            </li>
          </ol>
        </nav>
        <div className="flex flex-row justify-between">
          <div className="font-semibold text-2xl mt-4 ">{lesson?.title}</div>
        </div>
        <div className="flex flex-row justify-between mb-3">
          <div></div>
          <div>
            <button
              onClick={toggleDisplayEditor}
              className=" max-w-[7rem] h-10 rounded-lg text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  px-4 font-sans text-xs font-bold uppercase hover:shadow-lg "
            >
              Nội dung
            </button>
            <button
              onClick={toggleDisplayQuestion}
              className=" ml-4 max-w-[7rem] h-10 rounded-lg text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  px-4 font-sans text-xs font-bold uppercase hover:shadow-lg "
            >
              Câu hỏi
            </button>
          </div>
        </div>
        {displayEditor && <EditorLesson old={old} />}
        {displayQuestion && <QuestionList />}
      </div>
    </div>
  );
}
