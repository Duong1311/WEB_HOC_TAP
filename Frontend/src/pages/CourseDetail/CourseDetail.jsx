import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import Profile from "./Profile";
import "react-image-crop/dist/ReactCrop.css";
import { useEffect, useState, useRef } from "react";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  getAllCategory,
  courseDetail,
  getCourseDetail,
  courseImage,
} from "~/services/courseServices";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, CircularProgress, Typography } from "@mui/material";
import handlePastedText from "~/utils/pasteText";

export default function CourseDetail() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [editorState, setEditorState] = useState(null);
  const [dataUpdate, setDataUpdate] = useState("");
  const [courseCategory, setCourseCategory] = useState("");
  const [categories, setCategory] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [file, setFile] = useState(null);
  const avatarUrl = useRef(
    "https://soict.daotao.ai/asset-v1:SoICT+IT4210+2020-2+type@asset+block@banner-10.jpg"
  );
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file, id);
    console.log(formData);
    const res = await courseImage(formData);
    console.log(res);
  };
  // const courseImageApi = async (file) => {
  //   try {
  //     const res = await courseImage(file);
  //     console.log(res.data);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
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
  const createCourseDetailApi = async (id, data) => {
    try {
      const res = await courseDetail(id, data);
      console.log(res.data);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const createCourseDetail = async () => {
    // const formData = new FormData();
    // formData.append("file", file);
    // console.log(file);
    // const res = courseImage(file);
    // console.log(res.data);
    if (file !== null) {
      console.log("uploading");
      await handleUpload();
      setFile(null);
    }
    if (courseName === "") {
      toast.error("Tên khóa học không được để trống");
      return;
    }
    if (courseCategory === "") {
      toast.error("Thể loại khóa học không được để trống");
      return;
    }

    await createCourseDetailApi(id, { courseName, dataUpdate, courseCategory });
  };
  const getCourseDetailApi = async (id) => {
    try {
      const res = await getCourseDetail(id);
      // console.log(res.data);
      setCourseName(res.data.title);
      setCourseCategory(res.data.categoryId._id);
      avatarUrl.current =
        "https://drive.google.com/thumbnail?id=" + res.data.imageId;
      console.log(avatarUrl.current);
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
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
    getCourseDetailApi(id);
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
    <div className="flex flex-col bg-neutral-100 pb-10">
      <div className="w-full flex justify-center ">
        <div className="w-9/12 flex flex-col mt-3 gap-5 bg-white px-3 py-3 rounded-lg shadow-lg">
          <div>
            {/* <form action="/profile" method="post" encType="multipart/form-data">
              <input type="file" name="avatar" />
              <input type="submit" value="Upload" />
            </form> */}
            <div className="flex flex-row justify-between mb-3">
              <div className="text-2xl font-bold mb-3">Tên khóa học</div>
              <button
                onClick={createCourseDetail}
                className=" max-w-[5rem] h-10 rounded-lg text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  px-4 font-sans text-xs font-bold uppercase hover:shadow-lg "
              >
                Lưu
              </button>
            </div>
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
            <label className="block mb-3 border rounded-lg w-[400px] bg-white px-3 py-3">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  const maxSize = 1 * 1024 * 1024; // 1MB in bytes
                  if (e.target.files[0].size > maxSize) {
                    console.log("File size is too large");
                    toast.error("Kích thước file quá lớn hãy thử lại.");
                    return; // Stop execution if file is too large
                  }
                  avatarUrl.current = URL.createObjectURL(e.target?.files[0]);
                  handleUpload;
                }}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-white  hover:file:bg-gray-600"
              />
            </label>
            <img
              className=" object-cover h-[200px] w-[400px] border-2 rounded-md"
              src={avatarUrl.current}
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
              </div>
              <div className="w-full border-2 rounded-md  ">
                <div className="p-3 bg-white ">
                  <Editor
                    editorState={editorState}
                    onEditorStateChange={handleOnChange}
                    handlePastedText={handlePastedText}
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

          {/* <div className="z-50">
            <Profile />
          </div> */}
        </div>
      </div>
    </div>
  );
}
