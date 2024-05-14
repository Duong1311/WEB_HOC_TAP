/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Question from "./Question/Question";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  getLessonQuestions,
  createLessonQuestion,
  createLessonQuestionByOpenAi,
} from "~/services/courseServices";

export default function QuestionList() {
  const { id } = useParams();
  const [questionsData, setQuestionsData] = useState([]);
  // const question = useSelector((state) => state.lessonData.question);
  // console.log("question redux", question);
  const [questionAi, setQuestionAi] = useState("");
  const [number, setNumber] = useState(1);

  const getLessonQuestionApi = async (id) => {
    try {
      const res = await getLessonQuestions(id);
      setQuestionsData(res.data);
      console.log("questions", res.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const createLesssonQuestionApi = async (id, questionsData) => {
    try {
      const res = await createLessonQuestion(id, questionsData);
      console.log("questions", res.data);
      getLessonQuestionApi(id);
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleCreateLessonQuestions = () => {
    console.log("list questions", questionsData);
    createLesssonQuestionApi(id, questionsData);
  };
  const addNewQuestion = () => {
    console.log("add new question");
    const newQuestion = {
      _id: uuidv4(),
      title: "",
      answers: [],
      correct: 0,
      explanation: "",
    };
    const newQuestionsData = [...questionsData];
    newQuestionsData.push(newQuestion);
    setQuestionsData(newQuestionsData);
  };
  const addNewQuestionData = (questionId, data) => {
    const newQuestionsData = [...questionsData];
    const question = newQuestionsData.find((q) => q._id === questionId);
    if (question) {
      question.question = data;
    }
    setQuestionsData(newQuestionsData);
  };
  const addNewChoice = (questionId) => {
    const newQuestionsData = [...questionsData];

    //find question
    const question = newQuestionsData.find((q) => q._id === questionId);
    if (question) {
      question.answers.push("new choice");
    }
    setQuestionsData(newQuestionsData);
  };
  const addNewChoiceData = (questionId, index, data) => {
    const newQuestionsData = [...questionsData];
    const question = newQuestionsData.find((q) => q._id === questionId);
    if (question) {
      question.answers[index] = data;
    }
    setQuestionsData(newQuestionsData);
  };
  const deleteChoice = (questionId, index) => {
    console.log("delete choice", questionId, index);
    const newQuestionsData = [...questionsData];
    const question = newQuestionsData.find((q) => q._id === questionId);

    if (question) {
      //delete choice
      question.answers.splice(index, 1);
    }
    console.log(question.answers);
    setQuestionsData(newQuestionsData);
    console.log(questionsData);
  };
  const deleteQuestion = (questionId) => {
    console.log("delete question", questionId);
    const newQuestionsData = [...questionsData];
    const question = newQuestionsData.find((q) => q._id === questionId);
    if (question) {
      const index = newQuestionsData.indexOf(question);
      newQuestionsData.splice(index, 1);
    }
    setQuestionsData(newQuestionsData);
  };
  const addExplanation = (questionId, data) => {
    const newQuestionsData = [...questionsData];
    const question = newQuestionsData.find((q) => q._id === questionId);
    if (question) {
      question.explanation = data;
    }
    setQuestionsData(newQuestionsData);
  };
  const addCorrect = (questionId, data) => {
    const newQuestionsData = [...questionsData];
    const question = newQuestionsData.find((q) => q._id === questionId);
    if (question) {
      question.correct = data;
    }
    setQuestionsData(newQuestionsData);
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
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleCreateLessonQuestionsByOpenAi = () => {
    getLessonQuestionApiByOpenAiApi({
      number: number,
      field: questionAi,
    });
  };
  useEffect(() => {
    getLessonQuestionApi(id);
  }, []);
  return (
    <div>
      <div className="flex flex-col mb-3">
        <div className=" border px-3 py-3">
          <h1 className="text-2xl font-bold">Tạo câu hỏi</h1>
          <div className="w-full flex flex-row items-center">
            <div className="min-w-[100px] font-bold text-xl">Chủ đề:</div>
            <input
              type="text"
              className="w-full px-4 py-2 mb-3 text-gray-800 border rounded-lg  focus:outline-none"
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
        <div className="flex flex-row justify-between">
          <div></div>
          <button
            onClick={handleCreateLessonQuestions}
            className=" max-w-[5rem] h-10 rounded-lg text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  px-4 font-sans text-xs font-bold uppercase hover:shadow-lg "
          >
            Lưu
          </button>
        </div>
      </div>
      <div>
        {questionsData?.map((question) => (
          <Question
            key={question._id}
            question={question}
            addNewChoice={addNewChoice}
            deleteChoice={deleteChoice}
            deleteQuestion={deleteQuestion}
            addNewQuestionData={addNewQuestionData}
            addNewChoiceData={addNewChoiceData}
            addExplanation={addExplanation}
            addCorrect={addCorrect}
          />
        ))}
      </div>

      <div>
        <button
          onClick={addNewQuestion}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Thêm câu hỏi
        </button>
      </div>
    </div>
  );
}
