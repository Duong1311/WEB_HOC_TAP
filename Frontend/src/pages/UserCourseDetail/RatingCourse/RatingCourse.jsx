/* eslint-disable react/prop-types */
import { Rating } from "react-simple-star-rating";

export default function RatingCourse({ data }) {
  return (
    <div className="w-full min-w-[208px] flex flex-col gap-2 border border-black px-3 py-3 ">
      <div className="flex flex-row items-center">
        {data?.userId?.imageId ? (
          <img
            src={
              "https://drive.google.com/thumbnail?id=" + data?.userId?.imageId
            }
            alt="Logo"
            className="w-14 h-14 rounded-full"
          />
        ) : (
          <div className="w-14 h-14  bg-yellow-500 rounded-full flex items-center justify-center font-bold text-white">
            LOGO
          </div>
        )}
        <div className="ml-3">
          <div className="text-lg font-semibold">{data?.userId?.username}</div>

          <div className="flex flex-row gap-2">
            <Rating
              disableFillHover={true}
              initialValue={data?.rating}
              size={15}
              SVGstyle={{
                display: "inline",
                verticalAlign: "text-top",
              }}
              allowFraction={true}
              className="float-left"
            />
            <div className=" text-yellow-500">{data?.rating}</div>
            {/* <div className="text-sm">(100 ratings)</div> */}
          </div>
        </div>
      </div>
      <div className="text-sm">{data?.comment}</div>
    </div>
  );
}
