import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Profile from "./Profile";
import "react-image-crop/dist/ReactCrop.css";
import { useEffect, useState } from "react";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  getAllCategory,
  courseDetail,
  getCourseDetail,
} from "~/services/courseServices";
import { useParams } from "react-router-dom";

export default function CourseDetail() {
  const { id } = useParams();

  const [editorState, setEditorState] = useState(null);
  const [dataUpdate, setDataUpdate] = useState("");
  const [courseCategory, setCourseCategory] = useState("");
  const [categories, setCategory] = useState([]);
  const [courseName, setCourseName] = useState("");
  const getCategories = async () => {
    try {
      const res = await getAllCategory();
      // console.log(res.data);
      setCategory(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleOnChange = (e) => {
    setEditorState(e);

    // setDataUpdate(draftToMarkdown(convertToRaw(e.getCurrentContent())));
    setDataUpdate(convertToRaw(e.getCurrentContent()));
  };
  const createCourseDetailApi = (id, data) => {
    try {
      const res = courseDetail(id, data);

      console.log("ddd", res);
    } catch (error) {
      console.log(error);
    }
  };

  const createCourseDetail = () => {
    createCourseDetailApi(id, { courseName, dataUpdate, courseCategory });
  };
  const getCourseDetailApi = async (id) => {
    try {
      const res = await getCourseDetail(id);
      console.log(res.data);
      setCourseName(res.data.title);
      setCourseCategory(res.data.categoryId._id);
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
      const contentState = convertFromRaw(a);
      const initialState = EditorState.createWithContent(contentState);
      // Set the initial state of the editor
      setEditorState(initialState);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
    getCourseDetailApi(id);
    // if (old.blocks) {
    //   const contentState = convertFromRaw(old);
    //   const initialState = EditorState.createWithContent(contentState);
    //   // Set the initial state of the editor
    //   setEditorState(initialState);
    // }
  }, [id]);

  // useEffect(() => {
  //   if (old.blocks) {
  //     const contentState = convertFromRaw(old);
  //     const initialState = EditorState.createWithContent(contentState);
  //     // Set the initial state of the editor
  //     setEditorState(initialState);
  //   }
  // }, [old]);
  return (
    <div className="flex flex-col bg-neutral-100">
      <div className="w-full flex justify-center ">
        <div className="w-9/12 flex flex-col mt-3 gap-5 bg-white px-3 py-3 rounded-lg shadow-lg">
          <div>
            <div className="text-2xl font-bold mb-3">Tên khóa học</div>

            <input
              className="w-full border-2 rounded-md p-2"
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Nhập tên khóa học"
            />
          </div>
          <div className="">
            <div className="text-2xl font-bold mb-3">Ảnh khóa học</div>

            <img
              className="w-auto object-cover h-[200px] rounded-md"
              src="https://soict.daotao.ai/asset-v1:SoICT+IT4210+2020-2+type@asset+block@banner-10.jpg"
              alt=""
            />
          </div>
          <div className="">
            <div className="text-2xl font-bold mb-3">Thể loại khóa học</div>
            <div>
              <FormControl className="w-full" size="medium">
                <Select
                  defaultValue=""
                  // value={categories.map((category) => category._id) || ""}
                  onChange={(event) => setCourseCategory(event.target.value)}
                  value={courseCategory}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  className="bg-white"
                >
                  <MenuItem value="">
                    <div>Hãy chọn một thể loại</div>
                  </MenuItem>

                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.categoryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="w-full flex flex-row">
            <div className="w-full">
              <div className="flex flex-row justify-between mb-3">
                <div className="text-2xl font-bold mb-3">Mô tả khóa học</div>
                <button
                  onClick={createCourseDetail}
                  className=" max-w-[5rem] h-10 rounded-lg text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  px-4 font-sans text-xs font-bold uppercase hover:shadow-lg "
                >
                  Lưu
                </button>
              </div>
              <div className="w-full border-2 rounded-md  ">
                <div className="p-3 bg-white ">
                  <Editor
                    editorState={editorState}
                    onEditorStateChange={handleOnChange}
                    placeholder="Viết mô tả khóa học của bạn ở đây..."
                    toolbar={{
                      options: [
                        "inline",
                        "blockType",
                        "fontSize",
                        "fontFamily",
                        "list",
                        "textAlign",
                        "colorPicker",
                        "link",
                        "emoji",
                        "remove",
                        "history",
                      ],
                      inline: { inDropdown: true },
                      list: { inDropdown: true },
                      textAlign: { inDropdown: true },
                      link: { inDropdown: true },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="z-50">
            <Profile />
          </div>
        </div>
      </div>
    </div>
  );
}
