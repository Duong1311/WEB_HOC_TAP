// import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function UserDetail({ userInfor, handleBlock }) {
  const handleBlockClick = () => {
    handleBlock(userInfor._id);
  };
  return (
    <div
      key={userInfor._id}
      className="mb-3 border flex flex-row justify-between items-center "
    >
      <div className="flex flex-row">
        <div>
          <img
            className="object-cover w-40 h-32"
            src="https://s.udemycdn.com/course/200_H/placeholder.jpg"
            alt=""
          />
        </div>
        <div className="ml-4 flex items-center">
          <div className="flex flex-col space-y-2">
            <p className="text-lg font-bold">{userInfor?.username}</p>
            {/* <p className="text-sm">Giáo viên: Tên giáo viên</p> */}
            <p className="text-sm">Email: {userInfor?.email}</p>
            {/* <p className="text-sm">Số học viên: 0</p> */}
          </div>
        </div>
      </div>
      <div className="">
        {/* <Link to={`/usercoursedetail/${userInfor._id}`}>
          <button className=" mr-4 rounded-lg text-white bg-red-500 border border-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-600 py-3 px-6 font-sans text-xs font-bold uppercase hover:shadow-lg ">
            Xem chi tiết
          </button>
        </Link> */}

        {userInfor?.status ? (
          <button
            onClick={handleBlockClick}
            className=" mr-4 rounded-lg text-white bg-red-500 border border-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-500 dark:focus:ring-red-600 py-3 px-6 font-sans text-xs font-bold uppercase hover:shadow-lg "
          >
            Khóa tài khoản
          </button>
        ) : (
          <button
            onClick={handleBlockClick}
            className=" mr-4 rounded-lg text-white bg-red-400 border border-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-500 dark:focus:ring-red-600 py-3 px-6 font-sans text-xs font-bold uppercase hover:shadow-lg "
          >
            Mở khóa tài khoản
          </button>
        )}
      </div>
    </div>
  );
}
