import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-2">
      <div>
        <div className="flex flex-col ">
          <div className="font-semibold text-2xl">404</div>
          <div>Không tìm thấy trang</div>
        </div>
        <Link to="/" className="text-blue-500 underline">
          <div>Trở về trang home</div>
        </Link>
      </div>
    </div>
  );
}
