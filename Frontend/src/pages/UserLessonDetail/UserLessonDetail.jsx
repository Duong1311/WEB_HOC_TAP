import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  getChapterData,
  getLessonContent,
  publicCourse,
} from "~/services/courseServices";
import draftToHtml from "draftjs-to-html";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UserLessonContent from "./UserLessonContent/UserLessonContent";
import UserQuestionList from "./UserQuestionList/UserQuestionList";
import { useSelector } from "react-redux";
import { addCourseToHistoryApi } from "~/services/userServices";
import PublicButton from "~/components/PublicButton/PublicButton";
import { toast } from "react-toastify";
import { Box, CircularProgress, Typography } from "@mui/material";
// import draftToMarkdown from "draftjs-to-markdown";

export default function UserLessonDetail() {
  // const [nextId, setNextId] = useState("");

  const user = useSelector((state) => state.root.auth.login.currentUser);
  const userId = user?._id;
  const { id } = useParams();
  const [lesson, setLesson] = useState({});
  const [markdown, setMarkdown] = useState();
  const [displayEditor, setDisplayEditor] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const toggleDisplayEditor = () => {
    setDisplayEditor(true);
    setDisplayQuestion(false);
  };

  const [displayQuestion, setDisplayQuestion] = useState(false);
  const [displayPreButton, setDisplayPreButton] = useState(true);
  const [displayNextButton, setDisplayNextButton] = useState(true);
  const [displayPreButtonChapter, setDisplayPreButtonChapter] = useState(false);
  const [displayNextButtonChapter, setDisplayNextButtonChapter] =
    useState(false);
  const toggleDisplayQuestion = () => {
    setDisplayQuestion(true);
    setDisplayEditor(false);
  };

  const getLessonContentApi = async (id) => {
    try {
      setIsLoading(true);
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
      // setMarkdown(draftToMarkdown(a));

      // const markdown1 = draftToMarkdown(a);
      // console.log("markdown1", markdown1);

      addCourseToHistory(userId, res?.data?.courseId?._id);
      setIsLoading(false);
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
    if (!nextLessonId) return;

    navigate(`/userlessondetail/${nextLessonId}`);
    window.location.reload();
  };
  const handlePreviousLesson = () => {
    //find index of lesson in chapter
    const lessonArray = lesson?.chapterId?.lessonOrderIds;
    const index = lessonArray.indexOf(id);
    //get previous lesson id
    const previousLessonId = lessonArray[index - 1];
    if (!previousLessonId) return;

    navigate(`/userlessondetail/${previousLessonId}`);
    window.location.reload();
  };
  const handleNextChapter = async () => {
    //get next chapter id
    const currentChapterId = lesson?.chapterId?._id;
    const chapterArray = lesson?.courseId?.chapterOrderIds;
    const index = chapterArray.indexOf(currentChapterId);
    const nextChapterId = chapterArray[index + 1];
    // return if it is the last chapter
    if (!nextChapterId) return;
    console.log("nextChapterId", nextChapterId);
    //get first lesson id of next chapter
    //get chapter data api
    const res = await getChapterData(nextChapterId);
    const lessonOrderIds = res?.data?.lessonOrderIds;

    const firstLessonId = lessonOrderIds[0];
    console.log("firstLessonId", firstLessonId);
    if (!firstLessonId) return;
    navigate(`/userlessondetail/${firstLessonId}`);
    window.location.reload();
  };
  const handlePreviousChapter = async () => {
    //get next chapter id
    const currentChapterId = lesson?.chapterId?._id;
    const chapterArray = lesson?.courseId?.chapterOrderIds;
    const index = chapterArray.indexOf(currentChapterId);
    const prevChapterId = chapterArray[index - 1];
    // return if it is the last chapter
    if (!prevChapterId) return;
    console.log("prevChapterId", prevChapterId);
    //get last lesson id of prev chapter
    //get chapter data api
    const res = await getChapterData(prevChapterId);
    const lessonOrderIds = res?.data?.lessonOrderIds;
    const lastLessonId = lessonOrderIds.pop();
    navigate(`/userlessondetail/${lastLessonId}`);
    window.location.reload();
  };
  const checkButton = (lesson) => {
    const lessonArray = lesson?.chapterId?.lessonOrderIds;
    const index = lessonArray.indexOf(id);
    console.log("index", index);
    if (index === 0) {
      setDisplayPreButton(false);
      setDisplayPreButtonChapter(true);
      return;
    }
    if (index === lessonArray.length - 1) {
      setDisplayNextButton(false);
      setDisplayNextButtonChapter(true);
      return;
    }
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
    if (!user) {
      navigate("/login");
      toast.error("Vui lòng đăng nhập để xem nội dung");
    }
    getLessonContentApi(id);
  }, [id]);
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          width: "100vw",
          height: "100vh",
        }}
      >
        <CircularProgress />
        <Typography>Đang tải...</Typography>
      </Box>
    );
  }
  return (
    <div className="min-h-[960px] flex justify-center bg-white mb-10">
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
                <div className=" after:ml-2 text-xl text-black hover:text-blue-700 max-w-[300px] truncate">
                  {lesson?.courseId?.title}
                </div>
              </Link>
            </li>
            <li>
              <Link to={`/usercoursedetail/${lesson?.courseId?._id}`}>
                <div className=" after:ml-2 text-xl text-black hover:text-blue-700 max-w-[300px] truncate">
                  / {lesson?.chapterId?.title}
                </div>
              </Link>
            </li>
            <li
              className="text-blue-700 text-xl cursor-pointer max-w-[300px] truncate"
              aria-current="page"
            >
              / {lesson?.title}
            </li>
          </ol>
        </nav>
        <div className="font-semibold text-3xl mt-4 mb-10 max-w-[1000px] truncate">
          {lesson?.title}
        </div>

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
            {displayPreButton && (
              <button
                onClick={handlePreviousLesson}
                className=" flex flex-row items-center max-w-[10rem] h-10 rounded-lg text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  px-4 font-sans text-xs font-bold uppercase hover:shadow-lg "
              >
                <ArrowBackIcon />
              </button>
            )}

            {displayPreButtonChapter && (
              <button
                onClick={handlePreviousChapter}
                className=" flex flex-row items-center max-w-[10rem] h-10 rounded-lg text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  px-4 font-sans text-xs font-bold uppercase hover:shadow-lg "
              >
                <ArrowBackIcon />
              </button>
            )}
            {displayNextButton && (
              <button
                onClick={handleNextLesson}
                className=" flex flex-row items-center max-w-[10rem] h-10 rounded-lg text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  px-4 font-sans text-xs font-bold uppercase hover:shadow-lg "
              >
                {/* <div>Chương tiếp</div> */}
                <ArrowForwardIcon className="" />
              </button>
            )}

            {displayNextButtonChapter && (
              <button
                onClick={handleNextChapter}
                className=" flex flex-row items-center max-w-[10rem] h-10 rounded-lg text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  px-4 font-sans text-xs font-bold uppercase hover:shadow-lg "
              >
                {/* <div>Chương tiếp</div> */}
                <ArrowForwardIcon className="" />
              </button>
            )}
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
