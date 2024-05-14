/* eslint-disable react/prop-types */

import { Card as MuiCard } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { Link } from "react-router-dom";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Lesson({ lesson, chapter }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: lesson._id,
    data: { ...lesson },
  });

  const dndKitlessonStyles = {
    /**
     * touchAction: 'none', // Dành cho sensor default dạng PointerSensor
     * Nếu sử dụng CSS.Transform như docs sẽ lỗi kiểu stretch
     * https://github.com/clauderic/dnd-kit/issues/117
     */
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? "1px solid #2ecc71" : undefined,
  };

  return (
    <MuiCard
      ref={setNodeRef}
      style={dndKitlessonStyles}
      {...attributes}
      {...listeners}
      sx={{
        cursor: "pointer",
        boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
        overflow: "unset",
        // display: lesson?.FE_PlaceholderCard ? "none" : "block",
      }}
      className="hover:border-blue-500 border border-transparent rounded-md shadow-sm hover:shadow-lg transition duration-300 ease-in-out"
    >
      <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
        <Link to={`/CourseLesson/${chapter.title}/${lesson._id}`}>
          <Typography>{lesson?.title}</Typography>
        </Link>
      </CardContent>
    </MuiCard>
  );
}

export default Lesson;
