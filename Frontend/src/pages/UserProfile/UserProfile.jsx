import { useSelector } from "react-redux";
import UserAvatar from "./Avatar/Avatar";
import { useEffect, useState } from "react";
import { getUserInfor, updateUserInfor } from "~/services/userServices";
import ChangePass from "./ChangePass/ChangePass";

export default function UserProfile() {
  const user = useSelector((state) => state.root.auth.login.currentUser);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const id = user?._id;
  const getUserData = async (id) => {
    try {
      const res = await getUserInfor(id);
      setUserName(res.data.username);
      setEmail(res.data.email);
      setDescription(res.data.description);
    } catch (error) {
      console.log(error);
    }
  };
  const updateUser = async () => {
    try {
      const res = await updateUserInfor(id, {
        username: userName,
        email: email,
        description: description,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData(id);
  }, [id]);

  return (
    <div className="w-full flex justify-center  bg-gray-100">
      <div className="w-10/12 my-10 bg-white p-4 rounded-md">
        <div className="text-black text-2xl font-semibold mb-10 border-b border-black pb-3">
          Thông tin cá nhân
        </div>
        <div className="flex flex-col">
          <div className="w-full flex flex-row gap-5 ">
            <div className="w-full flex flex-col gap-4">
              <div className="flex flex-col w-full gap-2">
                <div className="font-semibold">Họ và tên</div>
                <input
                  className="  border border-gray-400 leading-normal  w-full  py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col w-full gap-2">
                <div className="font-semibold">Email</div>
                <input
                  className=" border border-gray-400 leading-normal  w-full  py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {/* <div>
              <div className="font-semibold">Công việc</div>
              <input
                className="  border border-gray-400 leading-normal  w-full  py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                type="text"
              />
            </div> */}
              <div>
                <div className="font-semibold">Tiểu sử</div>
                <textarea
                  className="  border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full ">
              <UserAvatar />
            </div>
          </div>
          <div className="flex flex-row gap-5">
            <button
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md mt-5"
              onClick={updateUser}
            >
              Cập nhật
            </button>
            <button
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md mt-5"
              onClick={() => setShowModal(true)}
            >
              Thay đổi mật khẩu
            </button>
            {showModal && <ChangePass setShowModal={setShowModal} id={id} />}
          </div>
        </div>
      </div>
    </div>
  );
}
