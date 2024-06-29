/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

export default function Course({ data }) {
  console.log("data", data);
  return (
    <Link to={`/usercoursedetail/${data?._id}`}>
      <div className="bg-white rounded-md w-full  flex flex-row">
        <div className="overflow-hidden">
          <img
            className="w-80 h-40 object-cover rounded-l-md  hover:scale-125 transition duration-300 ease-in-out overflow-hidden"
            src={
              data?.imageId
                ? "https://drive.google.com/thumbnail?id=" + data?.imageId
                : "https://soict.daotao.ai/asset-v1:SoICT+IT4210+2020-2+type@asset+block@banner-10.jpg"
            }
            alt=""
          />
        </div>
        <div className="w-full flex flex-col justify-between ml-5 p-5">
          <div className="font-semibold text-2xl max-w-[600px] truncate ">
            {data?.title || "Ten khoa hoc"}
          </div>
          <div className="flex flex-row gap-3">
            <div className="font-light ">
              Tác giả: {data?.userId?.username || "tac gia"}
            </div>
            <div className="font-light">
              Danh mục: {data?.categoryId?.categoryName || "danh muc"}
            </div>
          </div>
          <div className="flex flex-row gap-2 ">
            <div className="text-yellow-600 mt-[2px]">
              {data?.totalRating?.toFixed(1) || 0}
            </div>
            <Rating
              disableFillHover={true}
              initialValue={data?.totalRating || 0}
              size={20}
              SVGstyle={{ display: "inline" }}
              allowFraction={true}
              readonly={true}
              className="float-left"
            />
            <div className="mt[2px]">({data?.ratingCount || 0} đánh giá)</div>
          </div>
          <div>Số học viên: {data?.studyCount || 0}</div>
        </div>
      </div>
    </Link>
  );
}
