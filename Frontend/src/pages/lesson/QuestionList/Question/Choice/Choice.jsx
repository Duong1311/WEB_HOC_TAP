/* eslint-disable react/prop-types */
import DeleteIcon from "@mui/icons-material/Delete";
export default function Choice({ choice, index, deleteChoice, questionId }) {
  const handleDeleteChoice = () => {
    deleteChoice(questionId, index);
  };
  return (
    <div className="w-full border mb-2 flex flex-row items-center">
      <input
        type="text"
        className="w-full px-4 py-3 text-gray-800    focus:outline-none"
        placeholder="search"
        defaultValue={choice}
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
