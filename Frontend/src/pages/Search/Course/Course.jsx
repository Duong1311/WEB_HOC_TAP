/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

export default function Course({ data }) {
  console.log("data", data);
  return (
    <Link to={`/usercoursedetail/${data?._id}`}>
      <div className="bg-white rounded-md w-full  flex flex-row">
        <div>
          <img
            className="w-auto h-40 object-cover rounded-l-md"
            src="https://soict.daotao.ai/asset-v1:SoICT+IT4152+2023-1-143523+type@asset+block@IT4152.jpg"
            alt=""
          />
        </div>
        <div className="w-full flex flex-col justify-between ml-5 p-5">
          <div className="font-semibold text-2xl">
            {data?.title || "Ten khoa hoc"}
          </div>
          <div className="font-light">
            {data?.userId?.username || "tac gia"}
          </div>
          <div className="flex flex-row gap-2 ">
            <div className="text-yellow-600">
              {data?.totalRating?.toFixed(1) || 5}
            </div>
            <Rating
              disableFillHover={true}
              initialValue={data?.totalRating || 5}
              size={20}
              SVGstyle={{ display: "inline" }}
              allowFraction={true}
              className="float-left"
            />
            <div>({data?.ratingCount || 0} đánh giá)</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
