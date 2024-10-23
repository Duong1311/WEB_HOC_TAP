/* eslint-disable react/prop-types */
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

export default function Choice({
  choice,
  index,
  deleteChoice,
  questionId,
  addNewChoiceData,
}) {
  const [choiceDataState, setChoiceDataState] = useState(choice?.answer);

  const handleDeleteChoice = () => {
    deleteChoice(questionId, index);
  };
  const handleChoiseDataChange = (e) => {
    setChoiceDataState(e.target.value);
    addNewChoiceData(questionId, index, e.target.value);
  };
  return (
    <div className="w-full border mb-2 flex flex-row items-center">
      <input
        type="text"
        className="w-full px-4 py-3 text-gray-800    focus:outline-none"
        placeholder="Nội dung lựa chọn"
        // defaultValue={choice}
        value={choiceDataState}
        onChange={handleChoiseDataChange}
      />
      <div className="mr-3">
        <DeleteIcon
          onClick={handleDeleteChoice}
          sx={{
            color: "black",
            cursor: "pointer",
            "&:hover": {
              color: "red",
            },
          }}
        />
      </div>
    </div>
  );
}
