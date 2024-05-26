import ChapterList from "./ChapterList/ChapterList";
import FixedOnScroll from "./FixedOnScroll/FixedOnScroll ";
import { Rating } from "react-simple-star-rating";
import { useEffect, useState } from "react";
import { getCourseCreatedById } from "~/services/courseServices";
import { useParams } from "react-router-dom";
import { mapOrder } from "~/utils/sorts";
import draftToHtml from "draftjs-to-html";
import HeaderCourse from "./FixedOnScroll/HeaderCourse";

export default function UserCourseDetail() {
  const [orderedchapters, setOrderedchapters] = useState([]);
  const { id } = useParams();
  const [course, setCourse] = useState();
  const [markdown, setMarkdown] = useState();
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
      setCourse(course);
      console.log(course);
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
      setOrderedchapters(
        mapOrder(course?.chapters, course?.chapterOrderIds, "_id")
      );
    });
  }, []);
  console.log(orderedchapters);

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
          <div className="w-10/12 flex flex-col gap-6 ">
            <div className="font-semibold text-4xl text-white ">
              {course?.title}
            </div>
            <div className="flex flex-row gap-2 ">
              <Rating
                disableFillHover={true}
                initialValue={0}
                size={15}
                SVGstyle={{ display: "inline", verticalAlign: "text-top" }}
                allowFraction={true}
                className="float-left"
              />
              <div className=" text-yellow-500">0</div>
              <div className="text-white text-sm">(100 ratings)</div>
              <div className="text-white text-sm">100 học sinh </div>
            </div>
            <div className="flex flex-row items-center">
              <div className="text-white text-sm">Giáo viên: </div>
              <div className="text-white text-lg ml-2">
                {course?.Users[0]?.username}
              </div>
            </div>
            <div className="text-white text-sm">Thời gian cập nhật</div>
          </div>
        </div>
        {/* anh khoa hoc */}
        <FixedOnScroll />
      </div>
      <div className="w-full flex justify-center ">
        <div className="w-10/12 flex flex-col mt-7">
          <div className="w-full flex flex-row">
            <div className="w-2/3 mr-10">
              <div className="flex w-full flex-col justify-between mb-3 border border-black px-3 py-3">
                <div className="text-2xl font-bold mb-3">Mô tả khóa học</div>

                <div dangerouslySetInnerHTML={{ __html: markdown }} />
              </div>
              <div className="w-full">
                <div className="text-2xl font-bold mb-3">Nội dung khóa học</div>
                <ChapterList chapters={orderedchapters} />
              </div>
              <div>
                <div className="text-2xl font-bold mb-3">Đánh giá</div>
                <div className="flex flex-col gap-2 border border-black px-3 py-3 ">
                  <div className="text-lg font-semibold">Tên nguoi dung</div>

                  <div className="flex flex-row gap-2">
                    <Rating
                      disableFillHover={true}
                      initialValue={1}
                      size={15}
                      SVGstyle={{
                        display: "inline",
                        verticalAlign: "text-top",
                      }}
                      allowFraction={true}
                      className="float-left"
                    />
                    <div className=" text-yellow-500">0</div>
                    {/* <div className="text-sm">(100 ratings)</div> */}
                  </div>
                  <div className="text-sm">Nội dung đánh giá</div>
                </div>
              </div>
            </div>
            <div className="w-1/3"></div>
          </div>
        </div>
      </div>
      <HeaderCourse course={course} />
    </div>
  );
}
