import { useState } from "react";
import { toast } from "react-toastify";
import { createLessonQuestionByOpenAi } from "~/services/courseServices";
import { v4 as uuidv4 } from "uuid";
import Question from "../UserLessonDetail/UserQuestionList/Question/Question";
import Warning from "./Warning/Warning";
import Guide from "./Guide/Guide";

export default function UserDoQuestion() {
  const [questionsData, setQuestionsData] = useState([]);
  const [questionAi, setQuestionAi] = useState("");
  const [number, setNumber] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showGuide, setShowGuide] = useState(true);

  const handleCreateLessonQuestionsByOpenAi = async () => {
    if (!questionAi.trim()) {
      return toast.error("Chủ đề không được để trống");
    }
    if (!number) {
      return toast.error("Số lượng câu hỏi không được để trống");
    }
    if (number > 15 || number < 1) {
      return toast.error("Số lượng câu hỏi phải từ 1 đến 15");
    }

    await getLessonQuestionApiByOpenAiApi({
      number: number,
      field: questionAi,
    });
  };
  const getLessonQuestionApiByOpenAiApi = async (data) => {
    try {
      const res = await createLessonQuestionByOpenAi(data);
      console.log("questions", res.data.result);
      // setQuestionsData(res.data);
      // const newQuestionsData = [...questionsData];
      const newQuestionsData = [];

      res.data.result.questions.forEach((question) => {
        question._id = uuidv4();
        newQuestionsData.push(question);
      });
      console.log("newQuestionsData", newQuestionsData);
      setQuestionsData(newQuestionsData);
      toast.success("Tạo câu hỏi thành công");
      setShowModal(true);
    } catch (error) {
      console.log("error", error);
      toast.error("Tạo câu hỏi thất bại");
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className="w-5/6 ">
        <div className="w-full rounded-lg bg-gray-50 px-3 py-3 my-10 border border-gray-100  shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
          <div className="flex flex-row justify-between">
            <h1 className="text-3xl mb-3 font-bold">Tạo câu hỏi bằng AI</h1>
            <div
              onClick={() => setShowGuide(true)}
              className="bg-blue-700 mb-3  text-white font-extrabold w-8 h-8 rounded-full flex justify-center items-center"
            >
              ?
            </div>
          </div>
          <div className="w-full flex flex-row items-center mb-3">
            <div className="min-w-[100px] font-bold text-xl">Chủ đề:</div>
            <input
              type="text"
              className="w-full px-4 py-2  text-gray-800 border rounded-lg  focus:outline-none"
              placeholder="Chủ đề câu hỏi"
              value={questionAi}
              // defaultValue={question.question}
              // onChange={handleQuestionDataChange}
              onChange={(e) => setQuestionAi(e.target.value)}
            />
          </div>
          <div className="flex flex-row items-center">
            <div className="min-w-[100px] font-bold text-xl">Số lượng:</div>

            <input
              type="number"
              className="w-full max-w-[100px] px-4 py-2 text-gray-800 border rounded-lg  focus:outline-none"
              placeholder="Số câu hỏi"
              value={number}
              min={1}
              max={15}
              // defaultValue={question.question}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <button
            onClick={handleCreateLessonQuestionsByOpenAi}
            className=" mt-3 max-w-[5rem] h-10 rounded-lg text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  px-4 font-sans text-xs font-bold uppercase hover:shadow-lg "
          >
            Tạo
          </button>
        </div>
        <div className="w-full flex flex-col items-center gap-2">
          {questionsData.map((question, index) => (
            <Question key={question._id} index={index} question={question} />
          ))}
        </div>
      </div>
      {showModal && <Warning setShowModal={setShowModal} />}

      {showGuide && <Guide setShowGuide={setShowGuide} />}
    </div>
  );
}
