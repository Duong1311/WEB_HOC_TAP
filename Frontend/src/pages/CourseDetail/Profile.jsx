import { useRef, useState } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Modal from "./Modal";

const Profile = () => {
  const avatarUrl = useRef(
    "https://avatarfiles.alphacoders.com/161/161002.jpg"
  );
  const [modalOpen, setModalOpen] = useState(false);

  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
    console.log(imgSrc);
  };

  return (
    <div className="flex flex-col items-center pt-12">
      <div className="relative">
        <img
          src={avatarUrl.current}
          alt="Avatar"
          className="w-[150px] h-[150px] rounded-sm border-2 border-gray-400"
        />
        <button
          className="absolute -bottom-3  left-0 right-0 m-auto w-fit p-[.35rem] rounded-full bg-white hover:bg-gray-700 border border-gray-600"
          title="Change photo"
          onClick={() => setModalOpen(true)}
        >
          <div className="">
            <AddAPhotoIcon />
          </div>
        </button>
      </div>
      <h2 className="text-black font-bold mt-6">Mack Aroney</h2>
      <p className="text-gray-500 text-xs mt-2">Software Engineer</p>
      {modalOpen && (
        <Modal
          updateAvatar={updateAvatar}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Profile;
