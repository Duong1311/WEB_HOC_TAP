/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chapter from "./Chapter/Chapter";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import {
  SortableContext,
  // horizontalListSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useParams } from "react-router-dom";

import { useState } from "react";

function ListChapters({
  chapters,
  addNewChapterApi,
  addNewLessonApi,
  deleteChapterApi,
  updateChapterTitleApi,
}) {
  const [openNewChapter, setOpenNewChapter] = useState(false);
  const [chapterTitle, setChapterTitle] = useState("");
  const { id } = useParams();

  const toggleNewChapter = () => setOpenNewChapter(!openNewChapter);

  const addNewChapter = () => {
    if (!chapterTitle) {
      toast.error("Chapter title is required");
      return;
    }
    // Call API to add new chapter
    const newChapter = {
      title: chapterTitle,
      courseId: id,
    };
    addNewChapterApi(newChapter);
    //reset data
    toggleNewChapter();
    setChapterTitle("");
  };

  /**
   * Thằng Sortable yêu cầu items là một mảng dạng ['id-1', 'id-2'] chứ không phải [{id: 'id-1'}, {id: 'id-2'}]
   * Nếu không đúng thì vẫn kéo thả được nhưng không có animation
   * https://github.com/clauderic/dnd-kit/issues/183#issuecomment-812569512
   */
  return (
    <SortableContext
      items={chapters?.map((c) => c._id)}
      strategy={verticalListSortingStrategy}
    >
      <Box
        sx={{
          bgcolor: "inherit",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          "&::-webkit-scrollbar-track": { m: 2 },
        }}
      >
        {chapters?.map((chapter) => (
          <Chapter
            key={chapter._id}
            chapter={chapter}
            addNewLessonApi={addNewLessonApi}
            deleteChapterApi={deleteChapterApi}
            updateChapterTitleApi={updateChapterTitleApi}
          />
        ))}

        {/* Box Add new chapter CTA */}
        {!openNewChapter ? (
          <Box
            sx={{
              width: "800px",
              mx: 2,
              borderRadius: "6px",
              height: "fit-content",
              bgcolor: "rgb(229, 231, 235)",
            }}
          >
            <Button
              startIcon={<NoteAddIcon />}
              sx={{
                color: "black",
                width: "100%",
                justifyContent: "flex-start",
                pl: 2.5,
                py: 1,
              }}
              onClick={toggleNewChapter}
            >
              Thêm chương mới
            </Button>
          </Box>
        ) : (
          <div className="w-[800px] bg-gray-200 p-2 rounded-md h-fit flex flex-col gap-1">
            <TextField
              label="Enter chapter title..."
              type="text"
              size="small"
              variant="outlined"
              autoFocus
              value={chapterTitle}
              onChange={(e) => setChapterTitle(e.target.value)}
              className="w-full bg-white"
            />
            <div className="flex items-center gap-1 w-full">
              <Button
                onClick={addNewChapter}
                variant="contained"
                color="success"
                size="small"
                sx={{
                  boxShadow: "none",
                  border: "0.5px solid",
                  borderColor: "rgb(25, 118, 210)",
                  bgcolor: "rgb(25, 118, 210)",
                }}
              >
                Thêm
              </Button>
              <CloseIcon
                fontSize="small"
                sx={{
                  color: "white",
                  cursor: "pointer",
                  "&:hover": { color: (theme) => theme.palette.warning.light },
                }}
                onClick={toggleNewChapter}
              />
            </div>
          </div>
        )}
      </Box>
    </SortableContext>
  );
}

export default ListChapters;
