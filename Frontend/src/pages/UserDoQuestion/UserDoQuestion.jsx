import { useState } from "react";
import { toast } from "react-toastify";
import { createLessonQuestionByOpenAi } from "~/services/courseServices";
import { v4 as uuidv4 } from "uuid";
import Question from "../UserLessonDetail/UserQuestionList/Question/Question";
import Warning from "./Warning/Warning";

export default function UserDoQuestion() {
  const [questionsData, setQuestionsData] = useState([]);
  const [questionAi, setQuestionAi] = useState("");
  const [number, setNumber] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const handleCreateLessonQuestionsByOpenAi = () => {
    if (!questionAi && number) {
      return toast.error("Vui lòng nhập chủ đề và số lượng câu hỏi");
    }
    getLessonQuestionApiByOpenAiApi({
      number: number,
      field: questionAi,
    });
  };
  const getLessonQuestionApiByOpenAiApi = async (data) => {
    try {
      const res = await createLessonQuestionByOpenAi(data);
      console.log("questions", res.data.result);
      // setQuestionsData(res.data);
      const newQuestionsData = [...questionsData];
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
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className="w-5/6 ">
        <div className="w-full rounded-lg bg-white px-3 py-3 my-10">
          <h1 className="text-3xl mb-3 font-bold">Tạo câu hỏi</h1>
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
              className="w-full max-w-[60px] px-4 py-2 text-gray-800 border rounded-lg  focus:outline-none"
              placeholder="Số câu hỏi"
              value={number}
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
    </div>
  );
}
