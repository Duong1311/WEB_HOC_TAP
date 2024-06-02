import { useState } from "react";
import { toast } from "react-toastify";
import { updateUserPassword } from "~/services/userServices";

/* eslint-disable react/prop-types */
export default function ChangePass({ setShowModal, id }) {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const updateUser = async () => {
    try {
      if (newPassword !== confirmPassword) {
        alert("Mật khẩu không khớp");
        return;
      }
      const res = await updateUserPassword(id, {
        password: password,
        newPassword: newPassword,
      });
      console.log(res);
      if (res.data.status === 200) toast.success(res.data.message);
      if (res.data.status === 201) toast.error(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full my-6 mx-auto max-w-2xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex w-full items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Thay đổi mật khẩu</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  X
                </span>
              </button>
            </div>
            {/*body*/}
            <div className=" w-full relative p-6 flex-auto">
              <div className="flex flex-col w-full gap-2">
                <div className="font-semibold">Mật khẩu cũ</div>
                <input
                  className="  border border-gray-400 leading-normal  w-full  py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col w-full gap-2">
                <div className="font-semibold">Mật khẩu mới</div>
                <input
                  className="  border border-gray-400 leading-normal  w-full  py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                  type="text"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col w-full gap-2">
                <div className="font-semibold">Xác nhận mật khẩu</div>
                <input
                  className="  border border-gray-400 leading-normal  w-full  py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                  type="text"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  setShowModal(false);
                  updateUser();
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
