import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getLessonContent, updateLessonTitle } from "~/services/courseServices";
import EditorLesson from "./Editor/EditorLesson";
import QuestionList from "./QuestionList/QuestionList";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function CourseLesson() {
  // const [nextId, setNextId] = useState("");
  const { id } = useParams();
  const [lesson, setLesson] = useState({});
  const [old, setOld] = useState({});
  const [displayEditor, setDisplayEditor] = useState(true);
  const [toggle, setToggle] = useState(true);
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const toggleDisplayEditor = () => {
    setDisplayEditor(true);
    setDisplayQuestion(false);
  };

  const toggleInput = () => {
    setToggle(!toggle);
  };
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleChangeLesson = async () => {
    setToggle(!toggle);
    const res = await updateLessonTitle(id, { title: text });
    console.log("res", res);
  };
  console.log("text", text);
  const [displayQuestion, setDisplayQuestion] = useState(false);
  const [displayPreButton, setDisplayPreButton] = useState(true);
  const [displayNextButton, setDisplayNextButton] = useState(true);
  const toggleDisplayQuestion = () => {
    setDisplayQuestion(true);
    setDisplayEditor(false);
  };

  const getLessonContentApi = async (id) => {
    try {
      const res = await getLessonContent(id);
      console.log("getLessonContent", res.data);
      setLesson(res.data);
      checkButton(res.data);
      setText(res.data.title);

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

  const handleNextLesson = () => {
    //find index of lesson in chapter
    const lessonArray = lesson?.chapterId?.lessonOrderIds;
    if (!lessonArray) return;
    const index = lessonArray.indexOf(id);

    //get next lesson id
    const nextLessonId = lessonArray[index + 1];

    navigate(`/CourseLesson/${nextLessonId}`);
    window.location.reload();
  };
  const handlePreviousLesson = () => {
    //find index of lesson in chapter
    const lessonArray = lesson?.chapterId?.lessonOrderIds;
    const index = lessonArray.indexOf(id);
    //get previous lesson id
    const previousLessonId = lessonArray[index - 1];

    navigate(`/CourseLesson/${previousLessonId}`);
    window.location.reload();
  };
  const checkButton = (lesson) => {
    const lessonArray = lesson?.chapterId?.lessonOrderIds;
    const index = lessonArray.indexOf(id);
    console.log("index", index);
    if (index === 0) return setDisplayPreButton(false);
    if (index === lessonArray.length - 1) return setDisplayNextButton(false);
  };

  useEffect(() => {
    getLessonContentApi(id);
  }, []);

  if (!lesson) return <div>Loading...</div>;
  return (
    <div className="min-h-[960px] flex justify-center">
      <div className="w-4/6  ">
        {/* <div className="flex font-medium text-lg mt-10">
          <div className=" inline-block align-middle ">Khóa học</div>
          <AiOutlineRight className="self-center" />
          <div className="inline-block align-middle">Chương</div>
          <AiOutlineRight className="self-center" />
          <div className="inline-block align-middle">{lesson?.title}</div>
        </div> */}
        <nav aria-label="breadcrumb" className="mt-10 bg-white px-2 py-2 ">
          <ol className="flex space-x-2">
            <li>
              <Link to="/gvhome">
                <div className="after:content-['/'] after:ml-2 text-gray-600 hover:text-blue-700">
                  {lesson?.courseId?.title}
                </div>
              </Link>
            </li>
            <li>
              <Link to={`/CourseChapter/${lesson?.courseId?._id}`}>
                <div className="after:content-['/'] after:ml-2 text-gray-600 hover:text-blue-700">
                  {lesson?.chapterId?.title}
                </div>
              </Link>
            </li>
            <li className="text-blue-700" aria-current="page">
              {lesson?.title}
            </li>
          </ol>
        </nav>

        <div className="flex flex-row justify-between items-center my-3">
          <div>
            {displayPreButton && (
              <button
                onClick={handlePreviousLesson}
                className=" flex flex-row items-center max-w-[10rem] h-10 rounded-lg text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  px-4 font-sans text-xs font-bold uppercase hover:shadow-lg "
              >
                <ArrowBackIcon />
              </button>
            )}
          </div>
          {toggle ? (
            <div
              onDoubleClick={toggleInput}
              className="font-semibold text-2xl mt-4 "
            >
              {lesson?.title}
            </div>
          ) : (
            <div className="flex flex-row w-full p-3 items-center">
              <input
                autoFocus
                type="text"
                className="w-full mx-3 px-4 py-3 text-gray-800 font-semibold text-2xl bg-slate-100 rounded-md   focus:outline-none"
                value={text}
                onChange={handleChange}
                // on={console.log("onBeforeInput")}
              />
              <button
                onClick={handleChangeLesson}
                className=" ml-4 max-w-[7rem] h-10 rounded-lg text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  px-4 font-sans text-xs font-bold uppercase hover:shadow-lg "
              >
                Lưu
              </button>
            </div>
          )}

          <div>
            {displayNextButton && (
              <button
                onClick={handleNextLesson}
                className=" flex flex-row items-center max-w-[10rem] h-10 rounded-lg text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  px-4 font-sans text-xs font-bold uppercase hover:shadow-lg "
              >
                {/* <div>Chương tiếp</div> */}
                <ArrowForwardIcon className="" />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-row justify-between mb-3 ">
          <div></div>
          <div className="flex flex-row">
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
