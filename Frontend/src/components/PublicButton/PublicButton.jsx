/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

export default function PublicButton({ courseId, isPublic, handlePublic }) {
  const user = useSelector((state) => state.root.auth.login.currentUser);
  const isAdmin = user?.admin;
  if (!isAdmin) {
    return null;
  }
  const handlePublicClick = () => {
    // try {
    //   await publicCourse(courseId);
    //   toast.success("Cập nhật thành công");
    // } catch (error) {
    //   console.log(error);
    // }
    handlePublic(courseId);
  };

  return (
    <div className="fixed bottom-[80px] right-32 z-10">
      {!isPublic ? (
        <button
          onClick={handlePublicClick}
          className=" mr-4 rounded-lg text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 py-3 px-6 font-sans text-xs font-bold uppercase hover:shadow-lg "
        >
          Xuất bản
        </button>
      ) : (
        <button
          onClick={handlePublicClick}
          className=" mr-4 rounded-lg text-white bg-blue-400 border border-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 py-3 px-6 font-sans text-xs font-bold uppercase hover:shadow-lg "
        >
          Hủy xuất bản
        </button>
      )}
    </div>
  );
}
