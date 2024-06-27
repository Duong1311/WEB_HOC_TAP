import { useState } from "react";
import Answer from "./Answer/Answer";

/* eslint-disable react/prop-types */
export default function Question({ question, index }) {
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [hasClicked, setHasClicked] = useState(false);

  //   console.log("question", index);
  return (
    <div className="bg-gray-100 rounded-md p-5 w-full">
      <div className="flex flex-col gap-2">
        <div className="font-semibold text-xl">Câu hỏi {index + 1}:</div>
        <div>{question?.question}</div>
      </div>
      <div className="flex flex-col gap-1">
        {question?.answers.map((answer, index) => (
          <Answer
            key={index}
            answer={answer}
            index={index}
            isSelected={selectedAnswerIndex === index}
            onSelect={setSelectedAnswerIndex}
            // isCorrect={question?.correctAnswer === index}
            correct={question?.correct}
            explanation={question?.explanation}
            setHasClicked={setHasClicked}
            hasClicked={hasClicked}
          />
        ))}
      </div>
      <div className="mt-5">
        {hasClicked && (
          <div className="bg-neutral-200 rounded-md p-5 text-black">
            <div className="flex flex-row">
              <div className="font-semibold mr-2">Đáp án đúng:</div>
              <div>{question?.answers[question?.correct]}</div>
            </div>
            <div className="flex flex-row">
              <div className="font-semibold mr-2">Giải thích:</div>
              <div>{question?.explanation}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
