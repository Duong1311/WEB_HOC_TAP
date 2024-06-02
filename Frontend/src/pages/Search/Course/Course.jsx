/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

export default function Course({ data }) {
  console.log("data", data);
  return (
    <div className="bg-white rounded-lg w-full  flex flex-row">
      <div>
        <img
          className="w-72 h-48 object-cover rounded-l-lg"
          src="https://soict.daotao.ai/asset-v1:SoICT+IT4152+2023-1-143523+type@asset+block@IT4152.jpg"
          alt=""
        />
      </div>
      <div className="flex flex-col justify-between ml-5 p-5">
        <div className="font-semibold text-2xl">
          {data?.title || "Ten khoa hoc"}
        </div>
        <div className="font-light">{data?.userId?.username || "tac gia"}</div>
        <div className="flex flex-row gap-2 ">
          <Rating
            disableFillHover={true}
            initialValue={data?.totalRating || 5}
            size={20}
            SVGstyle={{ display: "inline" }}
            allowFraction={true}
            className="float-left"
          />
          <div className="text-yellow-600">
            {data?.totalRating?.toFixed(1) || 5}
          </div>
        </div>
        <Link to={`/usercoursedetail/${data?._id}`}>
          <button className="p-2.5 text-base font-medium text-white bg-blue-600 rounded-lg border border-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-600 dark:focus:ring-blue-800">
            Xem chi tiết
          </button>
        </Link>
      </div>
    </div>
  );
}
