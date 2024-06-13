export default function GvDetail() {
  return (
    <div className="flex justify-center bg-white  min-h-screen w-full">
      <div className="w-4/6  ">
        <div className="w-full bg-white  my-5 rounded-sm flex flex-col ">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col gap-2">
              <div className="text-xl font-semibold">Giảng viên</div>
              <div className="text-2xl font-serif">Tên</div>
              <div className="h-[100px]"></div>
            </div>
            <div>
              <img
                className="object-cover w-52 h-52 rounded-full shadow-md"
                src="https://scontent-hkg4-2.xx.fbcdn.net/v/t39.30808-6/444469790_438593725459566_6608098911307273135_n.jpg?stp=dst-jpg_p526x296&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=dKrF_4aq89kQ7kNvgEwnFyr&_nc_ht=scontent-hkg4-2.xx&oh=00_AYCz70lqnsrUqsB1N4USh-3KLblK1KhN3Vurh0Eze46HrQ&oe=666F02EE"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="text-xl font-semibold">Giới thiệu về tôi</div>
            <div>sdasdasdasdasdasdasdas</div>
          </div>
        </div>
        <div>
          <div className="text-xl font-semibold">Khóa học của tôi</div>
        </div>
      </div>
    </div>
  );
}
