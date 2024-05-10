import Choice from "./Choice/Choice";
import DeleteIcon from "@mui/icons-material/Delete";

/* eslint-disable react/prop-types */
export default function Question({
  question,
  addNewChoice,
  deleteChoice,
  deleteQuestion,
}) {
  const handleAddNewChoice = () => {
    addNewChoice(question._id);
  };
  const handleDeleteQuestion = () => {
    deleteQuestion(question._id);
  };
  return (
    <div className="border border-black rounded-sm min-h-[100px] mb-5 flex justify-center items-center">
      <div className=" flex flex-col w-full mx-3 my-3">
        {/* question title */}
        <div className="flex flex-row items-center">
          <div className="w-20">Câu hỏi </div>
          <div className=" w-full border flex justify-center items-center ">
            <input
              type="text"
              className="w-full px-4 py-3 text-gray-800    focus:outline-none"
              placeholder="search"
              defaultValue={question.title}
            />
          </div>
        </div>
        {/* question body */}
        <div className=" w-full flex flex-row items-center mt-4">
          <div className="w-20">Lựa chọn</div>
          {/* choice list */}
          <div className="w-full border px-4 py-3">
            {question.answers.map((choice, i) => (
              <Choice
                key={i}
                choice={choice}
                index={i}
                questionId={question._id}
                deleteChoice={deleteChoice}
              />
            ))}

            <div>
              <button
                onClick={handleAddNewChoice}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
              >
                Thêm lựa chọn
              </button>
            </div>
          </div>
        </div>

        {/* correct answer */}
        <div className="flex flex-row items-center mt-4">
          <div className="w-20">Đáp án</div>
          <div className="w-full border flex justify-center items-center ">
            <input
              type="text"
              className="w-full px-4 py-3 text-gray-800    focus:outline-none"
              placeholder="search"
              defaultValue={question.correct}
            />
          </div>
        </div>
        {/* giai thich */}
        <div className="flex flex-row items-center mt-4">
          <div className="w-20">Giải thích</div>
          <div className="w-full border flex justify-center items-center ">
            <input
              type="text"
              className="w-full px-4 py-3 text-gray-800    focus:outline-none"
              placeholder="Giai thich"
              defaultValue={question.explain}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <div>
            <button
              onClick={handleDeleteQuestion}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-3"
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
