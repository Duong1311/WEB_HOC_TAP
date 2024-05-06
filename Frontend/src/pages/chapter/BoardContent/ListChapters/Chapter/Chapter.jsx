/* eslint-disable react/prop-types */
import DragHandleIcon from "@mui/icons-material/DragHandle";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddCardIcon from "@mui/icons-material/AddCard";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import Cloud from "@mui/icons-material/Cloud";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ListLesson from "./ListLessons/ListLessons";
import { mapOrder } from "~/utils/sorts";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Chapter({ chapter }) {
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

  const [openNewLesson, setOpenNewLesson] = useState(false);
  const [lessonTitle, setLessonTitle] = useState("");
  const toggleNewLesson = () => setOpenNewLesson(!openNewLesson);
  const addNewLesson = () => {
    if (!lessonTitle) {
      toast.error("Lesson title is required");
      return;
    }

    // Call API to add new chapter
    toggleNewLesson();
    setLessonTitle("");
  };

  // Phải bọc div ở đây vì vấn đề chiều cao của chapter khi kéo thả sẽ có bug kiểu kiểu flickering (video 32)
  return (
    <div ref={setNodeRef} style={dndKitchapterStyles} {...attributes}>
      <Box
        {...listeners}
        sx={{
          width: "800px",
          bgcolor: "#ebecf0",
          borderRadius: "6px",
          height: "fit-content",
        }}
      >
        {/* Box chapter Header */}
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignIems: "center",
            justifyContent: "space-between",
          }}
        >
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
              <ExpandMoreIcon
                sx={{ color: "text.primary", cursor: "pointer" }}
                id="basic-chapter-dropdown"
                aria-controls={open ? "basic-menu-chapter-dropdown" : undefined}
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
              MenuListProps={{
                "aria-labelledby": "basic-chapter-dropdown",
              }}
            >
              <MenuItem>
                <ListItemIcon>
                  <AddCardIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add new lesson</ListItemText>
                <Typography variant="body2" color="text.secondary">
                  ⌘X
                </Typography>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
                <Typography variant="body2" color="text.secondary">
                  ⌘X
                </Typography>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize="small" />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
                <Typography variant="body2" color="text.secondary">
                  ⌘C
                </Typography>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
                <Typography variant="body2" color="text.secondary">
                  ⌘V
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <DeleteForeverIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Remove Archive this chapter</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize="small" />
                </ListItemIcon>
                <ListItemText>Archive this chapter</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* List lessons */}
        <ListLesson lessons={orderedlessons} />

        {/* Box chapter Footer */}
        <div className="w-full bg-gray-200 p-2 rounded-md h-fit flex items-center justify-between">
          {!openNewLesson ? (
            <>
              <Button onClick={toggleNewLesson} startIcon={<AddCardIcon />}>
                Add new lesson
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
      </Box>
    </div>
  );
}

export default Chapter;
