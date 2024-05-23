export default function UserCourseDetail() {
  return (
    <div className="flex flex-col">
      <div className="relative z-[-1]">
        <img
          className="object-cover h-[300px] w-screen"
          src="https://www.w3schools.com/images/background_in_space.gif"
          alt=""
        />
        {/* Thong tin khoa hoc */}
        <div className=" w-full absolute top-0 flex justify-center ">
          <div className="w-10/12 mt-5 ">
            <div className="font-semibold text-3xl text-white ">
              Tên khóa học
            </div>
          </div>
        </div>
        {/* anh khoa hoc */}
        <div className="absolute top-[200px] right-32">
          <img
            className="w-full object-cover h-[200px] rounded-md"
            src="https://soict.daotao.ai/asset-v1:SoICT+IT4210+2020-2+type@asset+block@banner-10.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="w-full flex justify-center ">
        <div className="w-10/12 flex flex-col mt-7">
          <div className="w-full flex flex-row">
            <div className="w-2/3 mr-10">
              <div className="flex flex-row justify-between mb-3">
                <div className="text-2xl font-bold mb-3">Mô tả khóa học</div>
                <button
                  // onClick={handleCreateLessonContent}
                  className=" max-w-[5rem] h-10 rounded-lg text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  px-4 font-sans text-xs font-bold uppercase hover:shadow-lg "
                >
                  Lưu
                </button>
              </div>
              <div className="w-full border-2 rounded-md  ">
                <div className="p-3 "></div>
              </div>
            </div>
            <div className="w-1/3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
