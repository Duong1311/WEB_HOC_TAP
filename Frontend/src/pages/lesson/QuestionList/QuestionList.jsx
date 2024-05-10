/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Question from "./Question/Question";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getLessonQuestions } from "~/services/courseServices";
export default function QuestionList() {
  const { id } = useParams();
  const [questionsData, setQuestionsData] = useState([
    {
      _id: 1,
      title: "Câu hỏi 1",
      answers: ["Đáp án 1", "Đáp án 2", "Đáp án 3", "Đáp án 4"],
      correct: 1,
      explanation: "Gi",
    },

    {
      _id: 2,
      title: "Câu hỏi 2",
      answers: ["Đáp án 1", "Đáp án 2", "Đáp án 3", "Đáp án 4"],
      correct: 2,
      explanation: "Gi",
    },

    {
      _id: 3,
      title: "Câu hỏi 3",
      answers: ["Đáp án 1", "Đáp án 2", "Đáp án 3", "Đáp án 4"],
      correct: 3,
      explanation: "Gi",
    },
  ]);

  const getLessonQuestionApi = async (id) => {
    try {
      const res = await getLessonQuestions(id);
      console.log("questions", res.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleCreateLessonQuestions = () => {
    console.log("list questions");
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
  const addNewChoice = (questionId) => {
    const newQuestionsData = [...questionsData];

    //find question
    const question = newQuestionsData.find((q) => q._id === questionId);
    if (question) {
      question.answers.push("new choice");
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
  useEffect(() => {
    getLessonQuestionApi(id);
  }, []);
  return (
    <div>
      <div className="flex flex-row justify-between mb-3">
        <div></div>
        <button
          onClick={handleCreateLessonQuestions}
          className=" max-w-[5rem] h-10 rounded-lg text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  px-4 font-sans text-xs font-bold uppercase hover:shadow-lg "
        >
          Lưu
        </button>
      </div>
      <div>
        {questionsData.map((question) => (
          <Question
            key={question._id}
            question={question}
            addNewChoice={addNewChoice}
            deleteChoice={deleteChoice}
            deleteQuestion={deleteQuestion}
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
