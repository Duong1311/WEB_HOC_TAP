/* eslint-disable react/prop-types */
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";

import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { createLessonContent } from "~/services/courseServices";
import { toast } from "react-toastify";
import handlePastedText from "../../../utils/pasteText";

export default function EditorLesson({ old }) {
  const { id } = useParams();

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
  const handleCreateLessonContent = () => {
    createLessonContentApi(id, dataUpdate);
  };
  const handleOnChange = (e) => {
    setEditorState(e);

    // setDataUpdate(draftToMarkdown(convertToRaw(e.getCurrentContent())));
    setDataUpdate(convertToRaw(e.getCurrentContent()));
  };
  const embedVideoCallBack = (link) => {
    console.log("link1", link);
    if (link.indexOf("youtube") >= 0) {
      link = link.replace("watch?v=", "embed/");
      link = link.replace("/watch/", "/embed/");
      link = link.replace("youtu.be/", "youtube.com/embed/");
    }
    console.log("link", link);
    return link;
  };

  useEffect(() => {
    if (old.blocks) {
      const contentState = convertFromRaw(old);
      const initialState = EditorState.createWithContent(contentState);
      // Set the initial state of the editor
      setEditorState(initialState);
    }
  }, [old]);

  return (
    <div className="w-full flex flex-col mt-6 min-h-[100vh]">
      <div className="flex flex-row justify-between mb-3">
        <div></div>
        <button
          onClick={handleCreateLessonContent}
          className=" max-w-[5rem] h-10 rounded-lg text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  px-4 font-sans text-xs font-bold uppercase hover:shadow-lg "
        >
          Lưu
        </button>
      </div>
      <div className="w-full border-2 rounded-md  ">
        <div className="p-3  ">
          <Editor
            editorState={editorState}
            onEditorStateChange={handleOnChange}
            handlePastedText={handlePastedText}
            toolbar={{
              embedded: {
                embedCallback: embedVideoCallBack,
              },
            }}
          />
        </div>
      </div>
      {/* <div className="w-1/2 border-2 rounded-md">
            <div>demo</div>
            <Markdown rehypePlugins={[rehypeRaw]}>
              {draftToHtml(dataUpdate)}
            </Markdown>
          </div> */}
    </div>
  );
}
