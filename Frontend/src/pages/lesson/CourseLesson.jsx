import { AiOutlineRight } from "react-icons/ai";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
// import draftToMarkdown from "draftjs-to-markdown";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useParams } from "react-router-dom";

import {
  createLessonContent,
  getLessonContent,
} from "~/services/courseServices";
import { toast } from "react-toastify";

export default function CourseLesson() {
  const { id } = useParams();
  const [lesson, setLesson] = useState({});

  const [editorState, setEditorState] = useState(null);

  const [dataUpdate, setDataUpdate] = useState("");

  const createLessonContentApi = async (id, data) => {
    try {
      const res = await createLessonContent(id, data);
      toast.success(res.data.message);
    } catch (error) {
      console.log("error", error);
    }
  };
  const getLessonContentApi = async (id) => {
    try {
      const res = await getLessonContent(id);
      setLesson(res.data);
      const old = {
        entityMap: res.data.entityMap ? res.data.entityMap : {},
        blocks: res.data.blocks,
      };
      // Convert data to EditorState
      const contentState = convertFromRaw(old);
      const initialState = EditorState.createWithContent(contentState);
      // Set the initial state of the editor
      setEditorState(initialState);
      console.log("res", res.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleCreateLessonContent = () => {
    createLessonContentApi(id, dataUpdate);
  };

  const handleOnChange = (e) => {
    setEditorState(e);

    // setDataUpdate(draftToMarkdown(convertToRaw(e.getCurrentContent())));
    setDataUpdate(convertToRaw(e.getCurrentContent()));
  };
  const embedVideoCallBack = (link) => {
    if (link.indexOf("youtube") >= 0) {
      link = link.replace("watch?v=", "embed/");
      link = link.replace("/watch/", "/embed/");
      link = link.replace("youtu.be/", "youtube.com/embed/");
    }
    return link;
  };
  useEffect(() => {
    getLessonContentApi(id);
  }, []);
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
          <button
            onClick={handleCreateLessonContent}
            className=" mr-4 rounded-lg text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  px-4 font-sans text-xs font-bold uppercase hover:shadow-lg "
          >
            Lưu thay đổi
          </button>
        </div>
        <div className="w-full flex flex-row mt-6 min-h-[100vh]">
          <div className="w-1/2 border-2 rounded-md mr-10 ">
            <div className="p-3  ">
              <Editor
                editorState={editorState}
                onEditorStateChange={handleOnChange}
                toolbar={{
                  embedded: {
                    embedCallback: embedVideoCallBack,
                  },
                }}
              />

              {/* <Editor
                // defaultContentState={contentState}
                initialContentState={contentState}
                onContentStateChange={setContentState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                placeholder="Write something!"
                toolbar={{
                  embedded: {
                    embedCallback: embedVideoCallBack,
                  },
                }}
              /> */}
            </div>
          </div>
          <div className="w-1/2 border-2 rounded-md">
            <div>demo</div>
            <Markdown rehypePlugins={[rehypeRaw]}>
              {draftToHtml(dataUpdate)}
            </Markdown>
          </div>
        </div>
      </div>
    </div>
  );
}
