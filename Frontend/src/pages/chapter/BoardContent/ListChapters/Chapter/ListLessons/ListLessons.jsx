/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Lesson from "./Lesson/Lesson";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

function ListLessons({ lessons, deleteLessonApi }) {
  return (
    <SortableContext
      items={lessons?.map((c) => c._id)}
      strategy={verticalListSortingStrategy}
    >
      <Box
        sx={{
          p: "0 5px", // padding
          m: "0 5px", // margin
          display: "flex",
          flexDirection: "column",
          gap: 1,
          overflowX: "hidden",
          overflowY: "auto",
          maxHeight: "200px",
          "&::-webkit-scrollbar-thumb": { backgroundColor: "#ced0da" },
          "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "#dfc2cf" },
        }}
      >
        {lessons?.map((lesson) => (
          <Lesson
            key={lesson._id}
            lesson={lesson}
            deleteLessonApi={deleteLessonApi}
          />
        ))}
      </Box>
    </SortableContext>
  );
}

export default ListLessons;
