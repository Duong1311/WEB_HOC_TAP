import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLessonQuestions } from "~/services/courseServices";
import Question from "./Question/Question";

export default function UserQuestionList() {
  const { id } = useParams();
  const [questionsData, setQuestionsData] = useState([]);
  const getLessonQuestionApi = async (id) => {
    try {
      const res = await getLessonQuestions(id);
      setQuestionsData(res.data);
      console.log("questions", res.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  // const handleSubmit = () => {
  //   console.log("submit");
  // };
  useEffect(() => {
    getLessonQuestionApi(id);
  }, [id]);
  return (
    <div className="w-full flex flex-col items-center gap-2">
      {questionsData.map((question, index) => (
        <Question key={question._id} index={index} question={question} />
      ))}
      {questionsData && (
        <div className="mt-10">Không có câu hỏi cho bài này</div>
      )}
    </div>
  );
}
