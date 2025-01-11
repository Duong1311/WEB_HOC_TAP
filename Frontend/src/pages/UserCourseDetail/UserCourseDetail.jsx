import ChapterList from "./ChapterList/ChapterList";
import FixedOnScroll from "./FixedOnScroll/FixedOnScroll ";
import { Rating } from "react-simple-star-rating";
import { useEffect, useState } from "react";
import {
  getCourseCreatedById,
  getRatingByCourseId,
  publicCourse,
} from "~/services/courseServices";
import { Link, useParams } from "react-router-dom";
import { mapOrder } from "~/utils/sorts";
import draftToHtml from "draftjs-to-html";
import HeaderCourse from "./FixedOnScroll/HeaderCourse";
import RatingCourse from "./RatingCourse/RatingCourse";
import WriteRating from "./WriteRating/WriteRating";
import PublicButton from "~/components/PublicButton/PublicButton";
import { toast } from "react-toastify";
import {
  Box,
  CircularProgress,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";

export default function UserCourseDetail() {
  const [orderedchapters, setOrderedchapters] = useState([]);
  const { id } = useParams();
  const [course, setCourse] = useState();
  const [markdown, setMarkdown] = useState();
  const [allRating, setAllRating] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const setCurPage = async (e, p) => {
    setPage(p);
    // console.log(p);
    await getRatingData(id, p, 4);
  };
  const fetchData = async (id) => {
    try {
      const res = await getCourseCreatedById(id);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getRatingData = async (id, page, limit) => {
    try {
      const res = await getRatingByCourseId(id, page, limit);
      // console.log("rating", res.data);
      setAllRating(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const addRating = () => {
    getRatingData(id, 1, 4);
  };
  const handlePublic = async (courseId) => {
    try {
      //update public status
      let courseUpdate = course;
      courseUpdate = {
        ...courseUpdate,
        public: !courseUpdate.public,
      };
      setCourse(courseUpdate);

      await publicCourse(courseId);
      toast.success("Cập nhật trạng thái thành công");
    } catch (error) {
      console.log(error);
    }
  };
  const [firstLessonId, setFirstLessonId] = useState();
  useEffect(() => {
    fetchData(id).then((course) => {
      setCourse(course);
      // console.log("course", course);
      let a = {
        entityMap: course?.entityMap ? course.entityMap : {},
        blocks: course?.blocks
          ? course.blocks
          : [
              {
                key: "637gr",
                text: "Thông tin về khóa học.",
                type: "unstyled",
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ],
      };

      setMarkdown(draftToHtml(a));

      const firstChapterId = course?.chapterOrderIds[0];
      //find first chapter
      const firstChapter = course?.chapters.find((chapter) => {
        return chapter._id === firstChapterId;
      });
      //get first lesson id
      const firstLessonId = firstChapter?.lessonOrderIds[0];
      // find first lesson
      const firstLesson = firstChapter?.lessons.find((lesson) => {
        return lesson._id === firstLessonId;
      });
      setFirstLessonId(firstLesson?._id);
      setOrderedchapters(
        mapOrder(course?.chapters, course?.chapterOrderIds, "_id")
      );
      setIsLoading(false);
    });

    getRatingData(id, page, 4);
  }, []);
  // console.log(orderedchapters);
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
    <div className="flex flex-col">
      <div className="relative ">
        <img
          className="object-cover h-[390px] w-full"
          src="https://www.w3schools.com/images/background_in_space.gif"
          alt=""
        />
        {/* Thong tin khoa hoc */}
        <div className=" w-full h-full absolute top-0 flex justify-center items-center ">
          <div className="w-10/12 flex flex-col gap-6  ">
            <div className="font-semibold text-4xl text-white max-w-[800px] truncate ">
              {course?.title}
            </div>
            <div className="flex flex-row gap-2 ">
              <Rating
                disableFillHover={true}
                initialValue={course?.totalRating}
                size={15}
                SVGstyle={{ display: "inline", verticalAlign: "text-top" }}
                allowFraction={true}
                readonly={true}
                className="float-left"
              />
              <div className=" text-yellow-500">
                {course?.totalRating?.toFixed(1) || 0}
              </div>
              <div className="text-white text-sm">
                ({course?.ratingCount || 0} ratings)
              </div>
              <div className="text-white text-sm">
                {course?.studyCount || 0} học sinh
              </div>
            </div>
            <div className="flex flex-row items-center">
              <div className="text-white text-sm">Giáo viên: </div>
              <Link to={`/gvdetail/${course?.Users[0]?._id}`}>
                <div className="text-blue-300 text-lg ml-2">
                  {course?.Users[0]?.username || "tác giả"}
                </div>
              </Link>
            </div>
            <div className="flex flex-row gap-2">
              <div className="text-white text-sm">Thời gian cập nhật:</div>

              <div className=" text-sm text-blue-300">
                {new Date(course?.updatedAt).toDateString()}
              </div>
            </div>
          </div>
        </div>
        {/* anh khoa hoc */}
        <FixedOnScroll firstLesson={firstLessonId} course={course} />
      </div>
      <div className="w-full flex justify-center ">
        <div className="w-10/12 flex flex-col my-7 ">
          <div className="w-full flex flex-row">
            <div className="w-2/3 mr-10 flex flex-col gap-9 bg-white p-3 rounded-md">
              <div className="flex w-full flex-col justify-between border border-black px-3 py-3">
                <div className="text-2xl font-bold mb-3">Mô tả khóa học</div>

                <div dangerouslySetInnerHTML={{ __html: markdown }} />
              </div>
              <div className="w-full ">
                <div className="text-2xl font-bold mb-3">Nội dung khóa học</div>
                <ChapterList chapters={orderedchapters} />
              </div>
              <div className="w-full">
                <div className="text-2xl font-bold mb-3">Đánh giá</div>
                <WriteRating addRating={addRating} />
                <div className="w-full flex flex-col gap-2">
                  {allRating &&
                    allRating?.rating?.map((rating) => (
                      <RatingCourse
                        key={rating._id}
                        data={rating}
                        getRatingData={getRatingData}
                      />
                    ))}
                </div>

                {allRating?.totalPages > 1 && (
                  <div className="w-full flex justify-center mt-3">
                    <Stack spacing={2}>
                      <Pagination
                        count={allRating?.totalPages}
                        page={parseInt(page, 10)}
                        onChange={setCurPage}
                        color="primary"
                      />
                    </Stack>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <HeaderCourse course={course} />
      <PublicButton
        courseId={course?._id}
        isPublic={course?.public}
        handlePublic={handlePublic}
      />
    </div>
  );
}
