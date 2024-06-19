import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getLessonContent, publicCourse } from "~/services/courseServices";
import draftToHtml from "draftjs-to-html";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UserLessonContent from "./UserLessonContent/UserLessonContent";
import UserQuestionList from "./UserQuestionList/UserQuestionList";
import { useSelector } from "react-redux";
import { addCourseToHistoryApi } from "~/services/userServices";
import PublicButton from "~/components/PublicButton/PublicButton";
import { toast } from "react-toastify";

export default function UserLessonDetail() {
  // const [nextId, setNextId] = useState("");
  const user = useSelector((state) => state.root.auth.login.currentUser);
  const userId = user?._id;
  const { id } = useParams();
  const [lesson, setLesson] = useState({});
  const [markdown, setMarkdown] = useState();
  const [displayEditor, setDisplayEditor] = useState(true);
  const navigate = useNavigate();

  const toggleDisplayEditor = () => {
    setDisplayEditor(true);
    setDisplayQuestion(false);
  };

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

      setMarkdown(draftToHtml(a));

      addCourseToHistory(userId, res?.data?.courseId?._id);
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

    navigate(`/userlessondetail/${nextLessonId}`);
    window.location.reload();
  };
  const handlePreviousLesson = () => {
    //find index of lesson in chapter
    const lessonArray = lesson?.chapterId?.lessonOrderIds;
    const index = lessonArray.indexOf(id);
    //get previous lesson id
    const previousLessonId = lessonArray[index - 1];

    navigate(`/userlessondetail/${previousLessonId}`);
    window.location.reload();
  };
  const checkButton = (lesson) => {
    const lessonArray = lesson?.chapterId?.lessonOrderIds;
    const index = lessonArray.indexOf(id);
    console.log("index", index);
    if (lessonArray.length === 1) {
      setDisplayNextButton(false);
      setDisplayPreButton(false);
    }
    if (index === 0) return setDisplayPreButton(false);
    if (index === lessonArray.length - 1) return setDisplayNextButton(false);
  };
  const addCourseToHistory = async (userId, courseId) => {
    try {
      const res = await addCourseToHistoryApi(userId, courseId);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePublic = async (courseId) => {
    try {
      // update public status
      let updatedLesson = lesson;
      if (updatedLesson && updatedLesson.courseId) {
        updatedLesson = {
          ...updatedLesson,
          courseId: {
            ...updatedLesson.courseId,
            public: !updatedLesson.courseId.public,
          },
        };
        setLesson(updatedLesson);
      }

      await publicCourse(courseId);
      toast.success("Thay đổi trạng thái thành công");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLessonContentApi(id);
  }, [id]);
  return (
    <div className="min-h-[960px] flex justify-center bg-white">
      <div className="w-10/12  ">
        {/* <div className="flex font-medium text-lg mt-10">
          <div className=" inline-block align-middle ">Khóa học</div>
          <AiOutlineRight className="self-center" />
          <div className="inline-block align-middle">Chương</div>
          <AiOutlineRight className="self-center" />
          <div className="inline-block align-middle">{lesson?.title}</div>
        </div> */}
        <nav aria-label="breadcrumb" className="my-8 bg-white px-2 py-2 ">
          <ol className="flex space-x-2">
            <li>
              <Link to={`/usercoursedetail/${lesson?.courseId?._id}`}>
                <div className="after:content-['/'] after:ml-2 text-xl text-black hover:text-blue-700">
                  {lesson?.courseId?.title}
                </div>
              </Link>
            </li>
            <li>
              <Link to={`/usercoursedetail/${lesson?.courseId?._id}`}>
                <div className="after:content-['/'] after:ml-2 text-xl text-black hover:text-blue-700">
                  {lesson?.chapterId?.title}
                </div>
              </Link>
            </li>
            <li className="text-blue-700 text-xl" aria-current="page">
              {lesson?.title}
            </li>
          </ol>
        </nav>
        <div className="font-semibold text-3xl my-4 ">{lesson?.title}</div>

        <div className="flex flex-row justify-between items-center pb-2 border-b">
          <div className="flex flex-row">
            <button
              onClick={toggleDisplayEditor}
              className=" max-w-[7rem] h-10 rounded-lg text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  px-4 font-sans text-xs font-bold uppercase hover:shadow-lg "
            >
              Nội dung
            </button>
            <button
              onClick={toggleDisplayQuestion}
              className=" ml-4 max-w-[7rem] h-10 rounded-lg   border border-black focus:ring-4 focus:outline-none   px-4 font-sans text-black text-xs font-bold uppercase hover:shadow-lg "
            >
              Câu hỏi
            </button>
          </div>
          <div className="flex flex-row items-center gap-2 ">
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
        </div>

        {displayEditor && <UserLessonContent markdown={markdown} />}
        {displayQuestion && <UserQuestionList />}
      </div>
      <PublicButton
        isPublic={lesson?.courseId?.public}
        courseId={lesson?.courseId?._id}
        handlePublic={handlePublic}
      />
    </div>
  );
}
