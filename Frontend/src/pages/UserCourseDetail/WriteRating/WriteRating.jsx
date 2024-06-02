/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { toast } from "react-toastify";
import { createRating } from "~/services/courseServices";

export default function WriteRating({ addRating }) {
  const { id } = useParams();
  const user = useSelector((state) => state.root.auth.login.currentUser);
  const userId = user?._id;

  const [rating, setRating] = useState(0);
  const [ratingComment, setRatingComment] = useState("");
  const handleStarRating = (rate) => {
    setRating(rate);
  };
  const handleRating = async () => {
    try {
      const res = await createRating({
        userId: userId,
        courseId: id,
        rating: rating,
        comment: ratingComment,
      });
      console.log(res);
      const newRating = {
        userId: userId,
        courseId: id,
        rating: rating,
        comment: ratingComment,
      };
      addRating(newRating);
      toast.success("Đánh giá thành công");
    } catch (error) {
      console.log(error);
      toast.error("Đánh giá thất bại");
    }
  };
  return (
    <div className="flex w-full  items-center justify-center mb-4 border border-black">
      <div className="w-full  bg-white rounded-lg px-4 pt-2">
        <div className="flex flex-col flex-wrap -mx-3 mb-6">
          <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
            Thêm đánh giá
          </h2>
          <div className="flex flex-row gap-2 px-4 ">
            <Rating
              disableFillHover={true}
              onClick={handleStarRating}
              initialValue={rating}
              size={15}
              SVGstyle={{ display: "inline", verticalAlign: "text-top" }}
              allowFraction={true}
              className="float-left"
            />
            <div className=" text-yellow-500">{rating}</div>
          </div>
          <div className="w-full md:w-full px-3 mb-2 mt-2">
            <textarea
              className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
              name="body"
              placeholder="Đánh giá của bạn"
              required
              onChange={(e) => setRatingComment(e.target.value)}
            />
          </div>
          <div className="w-full  md:w-full flex justify-end items-start px-3">
            <div className="">
              <Button
                onClick={handleRating}
                className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
              >
                Gửi đánh giá
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
