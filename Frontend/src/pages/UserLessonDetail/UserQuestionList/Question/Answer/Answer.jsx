/* eslint-disable react/prop-types */

import { useState } from "react";

export default function Answer({
  answer,
  index,
  // isSelected,
  // onSelect,
  correct,
  // explanation,
  setHasClicked,
  hasClicked,
}) {
  // const [showExplanation, setShowExplanation] = useState(false);
  const [selected, setSelected] = useState(null);
  const [stype, setStype] = useState("");
  const handleItemClick = () => {
    // console.log("Clicked item index:", index, typeof index);
    // console.log("Correct answer:", correct, typeof correct);
    if (hasClicked) return;
    setSelected(index);
    // onSelect(index);
    setStype(
      correct == index
        ? "bg-green-200 border  border-black rounded-sm p-2 cursor-pointer"
        : "bg-red-200 border  border-black rounded-sm p-2 cursor-pointer"
    );
    setHasClicked(true);
    // console.log("hasClicked", hasClicked);
  };

  return (
    <div
      // className={
      //   selected === index
      //     ? stype
      //     : `${
      //         isSelected ? "bg-blue-200" : "bg-white"
      //       } hover:bg-blue-200 border  border-black rounded-sm p-2 cursor-pointer`
      // }
      className={
        selected === index
          ? stype
          : `bg-white hover:bg-blue-200 border  border-black rounded-sm p-2 cursor-pointer`
      }
      onClick={handleItemClick}
    >
      {answer}
    </div>
  );
}
