import BoardContent from "./BoardContent/BoardContent";
// import { mockData } from "~/apis/mock-data";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getCourseCreatedById,
  updateMoveChapter,
  updateMoveLessonInOneChapter,
  updateChapter,
  deleteChapter,
} from "~/services/courseServices";
import { createChapter, createLesson } from "~/services/courseServices";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// import { mapOrder } from "~/utils/sorts";

// import { cloneDeep, isEmpty } from "lodash";
// import { generatePlaceholderlesson } from "~/utils/formatters";

export default function CourseChapter() {
  const { id } = useParams();
  const [course, setCourse] = useState();
  const fetchData = async (id) => {
    try {
      const res = await getCourseCreatedById(id);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData(id).then((course) => {
      // course.chapters = mapOrder(
      //   course?.chapters,
      //   course?.chapterOrderIds,
      //   "_id"
      // );
      // course.chapters.forEach((chapter) => {
      //   if (isEmpty(chapter.lessons)) {
      //     chapter.lessons = [generatePlaceholderlesson(chapter)];
      //     chapter.lessonOrderIds = [generatePlaceholderlesson(chapter)._id];
      //   } else {
      //     course.chapters = mapOrder(
      //       course.chapters,
      //       course.chapterOrderIds,
      //       "_id"
      //     );
      //   }
      // });
      setCourse(course);
    });
  }, []);
  const addNewChapterApi = async (data) => {
    try {
      const res = await createChapter(data);
      // console.log(res.data);

      const newCourse = { ...course };
      newCourse.chapters.push(res.data);
      newCourse.chapterOrderIds.push(res.data._id);
      setCourse(newCourse);
    } catch (error) {
      console.log(error);
    }
  };
  const addNewLessonApi = async (data) => {
    try {
      const res = await createLesson(data);
      // console.log(res.data);
      const newCourse = { ...course };
      const chapterUpdate = newCourse.chapters.find(
        (chapter) => chapter._id === res.data.chapterId
      );
      if (chapterUpdate) {
        chapterUpdate.lessons.push(res.data);
        chapterUpdate.lessonOrderIds.push(res.data._id);
      }
      setCourse(newCourse);
    } catch (error) {
      console.log(error);
    }
  };
  const updateMoveChapterApi = async (id, updateData) => {
    try {
      const res = await updateMoveChapter(id, updateData);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const updateMoveLessonInOneChapterApi = async (chapterId, updateData) => {
    try {
      const res = await updateMoveLessonInOneChapter(chapterId, updateData);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const moveChapter = (dndOrderedChapters) => {
    const dndOrderedChapterIds = dndOrderedChapters.map((c) => c._id);
    const newCourse = { ...course };
    newCourse.chapters = dndOrderedChapters;
    newCourse.chapterOrderIds = dndOrderedChapterIds;
    setCourse(newCourse);

    //api
    updateMoveChapterApi(id, { chapterOrderIds: dndOrderedChapterIds });
  };

  const moveLessonInOneChapter = (
    dndOrderedlessons,
    dndOrderedlessonsIds,
    chapterId
  ) => {
    const newCourse = { ...course };
    const chapterUpdate = newCourse.chapters.find(
      (chapter) => chapter._id === chapterId
    );
    if (chapterUpdate) {
      chapterUpdate.lessons = dndOrderedlessons;
      chapterUpdate.lessonOrderIds = dndOrderedlessonsIds;
    }
    setCourse(newCourse);

    updateMoveLessonInOneChapterApi(chapterId, {
      lessonOrderIds: dndOrderedlessonsIds,
    });
  };
  const updateChapterTitleApi = async (chapterId, updateData) => {
    try {
      const newCourse = { ...course };
      const chapterUpdate = newCourse.chapters.find(
        (chapter) => chapter._id === chapterId
      );
      chapterUpdate.title = updateData.title;
      setCourse(newCourse);
      const res = await updateChapter(chapterId, updateData);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteChapterApi = async (chapterId) => {
    try {
      const newCourse = { ...course };
      newCourse.chapters = newCourse.chapters.filter(
        (chapter) => chapter._id !== chapterId
      );
      newCourse.chapterOrderIds = newCourse.chapterOrderIds.filter(
        (id) => id !== chapterId
      );
      setCourse(newCourse);
      const res = await deleteChapter(chapterId);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  if (!course) {
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
        <Typography>Loading Board...</Typography>
      </Box>
    );
  }
  return (
    <div className="flex justify-center min-h-[1000px] my-10">
      <div>
        <div>
          <BoardContent
            course={course}
            addNewChapterApi={addNewChapterApi}
            addNewLessonApi={addNewLessonApi}
            moveChapter={moveChapter}
            moveLessonInOneChapter={moveLessonInOneChapter}
            deleteChapterApi={deleteChapterApi}
            updateChapterTitleApi={updateChapterTitleApi}
          />
        </div>
      </div>
    </div>
  );
}
