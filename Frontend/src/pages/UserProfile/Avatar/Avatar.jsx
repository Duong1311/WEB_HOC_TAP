/* eslint-disable react/prop-types */
import { Box, Modal, Slider, Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { FcAddImage } from "react-icons/fc";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { userAvatar } from "~/services/userServices";

const boxStyle = {
  width: "300px",
  height: "300px",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
};
const modalStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

// Modal
const CropperModal = ({ src, modalOpen, setModalOpen, setPreview }) => {
  const [slideValue, setSlideValue] = useState(10);
  const cropRef = useRef(null);
  const { id } = useParams();

  //handle save
  const handleSave = async () => {
    if (cropRef) {
      const dataUrl = cropRef.current.getImage().toDataURL();

      const result = await fetch(dataUrl);
      const blob = await result.blob();
      setPreview(URL.createObjectURL(blob));
      setModalOpen(false);
      // console.log("blob", blob);
      const formData = new FormData();
      formData.append("file", blob, id);
      const res = await userAvatar(formData);
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error("Thay đổi ảnh đại diện thất bại");
      }
    }
  };

  return (
    <Modal sx={modalStyle} open={modalOpen}>
      <Box sx={boxStyle}>
        <AvatarEditor
          ref={cropRef}
          image={src}
          style={{ width: "100%", height: "100%" }}
          border={50}
          borderRadius={150}
          color={[0, 0, 0, 0.72]}
          scale={slideValue / 10}
          rotate={0}
        />

        {/* MUI Slider */}
        <Slider
          min={10}
          max={50}
          sx={{
            margin: "0 auto",
            width: "80%",
            color: "cyan",
          }}
          size="medium"
          defaultValue={slideValue}
          value={slideValue}
          onChange={(e) => setSlideValue(e.target.value)}
        />
        <Box
          sx={{
            display: "flex",
            padding: "10px",
            border: "3px solid white",
            background: "black",
          }}
        >
          <Button
            size="small"
            sx={{ marginRight: "10px", color: "white", borderColor: "white" }}
            variant="outlined"
            onClick={() => setModalOpen(false)}
          >
            cancel
          </Button>
          <Button
            sx={{ background: "#5596e6" }}
            size="small"
            variant="contained"
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

// Container
const Cropper = ({ avatar }) => {
  console.log("sdas", avatar);
  // image src
  const [src, setSrc] = useState(null);

  // preview
  const [preview, setPreview] = useState(null);

  // modal state
  const [modalOpen, setModalOpen] = useState(false);

  // ref to control input element
  const inputRef = useRef(null);
  const [url, setUrl] = useState("");
  const avatarUrl = useRef(
    " https://www.signivis.com/img/custom/avatars/member-avatar-01.png"
  );
  // handle Click
  const handleInputClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };
  // handle Change
  const handleImgChange = (e) => {
    setSrc(URL.createObjectURL(e.target.files[0]));
    setModalOpen(true);
  };

  return (
    <>
      <main className="container flex flex-col items-center mt-5">
        <CropperModal
          modalOpen={modalOpen}
          src={src}
          setPreview={setPreview}
          setModalOpen={setModalOpen}
        />

        <div className="img-container rounded-full border border-black">
          {avatar && (
            <img
              src={preview || "https://drive.google.com/thumbnail?id=" + avatar}
              // src={"https://drive.google.com/thumbnail?id=" + avatar}
              alt=""
              width="200"
              height="200"
              className="object-cover rounded-full"
            />
          )}
        </div>
        <a href="/" onClick={handleInputClick}>
          <FcAddImage className="add-icon w-[50px] h-[50px]" />
        </a>
        <small>Click to select image</small>
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleImgChange}
          style={{ display: "none" }}
        />
      </main>
    </>
  );
};

export default Cropper;
