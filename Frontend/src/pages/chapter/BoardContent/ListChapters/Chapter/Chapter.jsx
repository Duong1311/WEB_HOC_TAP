/* eslint-disable react/prop-types */
import DragHandleIcon from "@mui/icons-material/DragHandle";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddCardIcon from "@mui/icons-material/AddCard";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ContentCut from "@mui/icons-material/ContentCut";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ListLesson from "./ListLessons/ListLessons";
import { mapOrder } from "~/utils/sorts";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { useConfirm } from "material-ui-confirm";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useParams } from "react-router-dom";

function Chapter({
  chapter,
  addNewLessonApi,
  deleteChapterApi,
  updateChapterTitleApi,
  deleteLessonApi,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: chapter._id,
    data: { ...chapter },
  });

  const dndKitchapterStyles = {
    /**
     * touchAction: 'none', // Dành cho sensor default dạng PointerSensor
     * Nếu sử dụng CSS.Transform như docs sẽ lỗi kiểu stretch
     * https://github.com/clauderic/dnd-kit/issues/117
     */
    transform: CSS.Translate.toString(transform),
    transition,
    // Chiều cao phải luôn max 100% vì nếu không sẽ lỗi nếu không có chapter ngắn qua một cái chapter dài thì phải kéo ở khu vực giữa giữa rất khó chịu (demo ở video 32). Lưu ý lúc này phải kết hợp với {...listeners} nằm ở Box chứ không phải ở div ngoài cùng để tránh trường hợp kéo vào vùng xanh.
    // height: "100%",
    opacity: isDragging ? 0.5 : undefined,
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const orderedlessons = mapOrder(
    chapter?.lessons,
    chapter?.lessonOrderIds,
    "_id"
  );
  const { id } = useParams();

  const [openNewLesson, setOpenNewLesson] = useState(false);
  const [lessonTitle, setLessonTitle] = useState("");
  const [updateChapterNameButton, setUpdateChapterNameButton] = useState(false);
  const [chapterName, setChapterName] = useState("");
  const [showListLesson, setShowListLesson] = useState(false);

  const confirm = useConfirm();

  const handleShowListLesson = () => {
    setShowListLesson(!showListLesson);
  };
  const toggleNewLesson = () => {
    setOpenNewLesson(!openNewLesson);
  };
  const toggleUpdateChapter = () => {
    setUpdateChapterNameButton(!updateChapterNameButton);
  };
  const updateChapterTitle = () => {
    if (!chapterName) {
      toast.error("Tên chapter không được để trống");
      return;
    }
    if (chapterName === chapter.title) {
      toast.error("Hãy nhập tên khác với tên cũ");
      return;
    }

    // Call API to update chapter
    updateChapterTitleApi(chapter._id, { title: chapterName });

    toggleUpdateChapter();
    setChapterName("");
  };
  const deleteChapter = () => {
    confirm({
      title: "Xóa chương",
      description: "Hành động này sẽ xóa chương của bạn",
    })
      .then(() => {
        deleteChapterApi(chapter._id);
      })
      .catch(() => {});
  };

  const addNewLesson = () => {
    if (!lessonTitle) {
      toast.error("Lesson title is required");
      return;
    }

    // Call API to add new lesson

    addNewLessonApi({
      title: lessonTitle,
      chapterId: chapter._id,
      courseId: id,
    });
    toggleNewLesson();
    setLessonTitle("");
  };

  // Phải bọc div ở đây vì vấn đề chiều cao của chapter khi kéo thả sẽ có bug kiểu kiểu flickering (video 32)
  return (
    <div ref={setNodeRef} style={dndKitchapterStyles} {...attributes}>
      <div
        {...listeners}
        // sx={{
        //   width: "800px",
        //   bgcolor: "#ebecf0",
        //   borderRadius: "6px",
        //   height: "fit-content",
        // }}
        className="w-full bg-gray-200 rounded-md mb-2 "
      >
        {/* Box chapter Header */}
        <div
          // sx={{
          //   p: 2,
          //   display: "flex",
          //   alignIems: "center",
          //   justifyContent: "space-between",
          // }}
          className="w-full bg-gray-200 p-2 rounded-md h-fit flex items-center justify-between"
        >
          {!updateChapterNameButton ? (
            <div className="flex justify-between w-full ml-1">
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                {chapter?.title}
              </Typography>
              <Box>
                <Tooltip title="More options">
                  <MoreVertIcon
                    sx={{ color: "text.primary", cursor: "pointer" }}
                    id="basic-chapter-dropdown"
                    aria-controls={
                      open ? "basic-menu-chapter-dropdown" : undefined
                    }
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  />
                </Tooltip>
                <Menu
                  id="basic-menu-chapter-dropdown"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-chapter-dropdown",
                  }}
                >
                  <MenuItem onClick={deleteChapter}>
                    <ListItemIcon>
                      <DeleteForeverIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                    <Typography variant="body2" color="text.secondary">
                      ⌘X
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={toggleUpdateChapter}>
                    <ListItemIcon>
                      <ContentCut fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Update</ListItemText>
                    <Typography variant="body2" color="text.secondary">
                      ⌘X
                    </Typography>
                  </MenuItem>
                </Menu>
                <ExpandMoreIcon onClick={handleShowListLesson} />
              </Box>
            </div>
          ) : (
            <div className="flex flex-row w-full items-center mt-1">
              <TextField
                label={chapter?.title}
                type="text"
                size="small"
                variant="outlined"
                autoFocus
                onChange={(e) => setChapterName(e.target.value)}
                className="w-full bg-white"
              />
              <div className="flex items-center gap-1 ml-2">
                <Button
                  onClick={updateChapterTitle}
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
                  Update
                </Button>
                <div>
                  <CloseIcon
                    fontSize="small"
                    sx={{
                      color: "white",
                      cursor: "pointer",
                      "&:hover": {
                        color: (theme) => theme.palette.warning.light,
                      },
                    }}
                    onClick={toggleUpdateChapter}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* List lessons */}
        {showListLesson && (
          <ListLesson
            lessons={orderedlessons}
            deleteLessonApi={deleteLessonApi}
          />
        )}

        {/* Box chapter Footer */}
        <div className="w-full bg-gray-200 p-2 rounded-md h-fit flex items-center justify-between">
          {!openNewLesson ? (
            <>
              <Button onClick={toggleNewLesson} startIcon={<AddCardIcon />}>
                Thêm bài mới
              </Button>
              <Tooltip title="Drag to move">
                <DragHandleIcon sx={{ cursor: "pointer" }} />
              </Tooltip>
            </>
          ) : (
            <div className="flex flex-row w-full items-center mt-1">
              <TextField
                label="Enter chapter title..."
                type="text"
                size="small"
                variant="outlined"
                autoFocus
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                className="w-full bg-white"
              />
              <div className="flex items-center gap-1 ml-2">
                <Button
                  onClick={addNewLesson}
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
                  Add
                </Button>
                <CloseIcon
                  fontSize="small"
                  sx={{
                    color: "white",
                    cursor: "pointer",
                    "&:hover": {
                      color: (theme) => theme.palette.warning.light,
                    },
                  }}
                  onClick={toggleNewLesson}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chapter;
