/* eslint-disable react/prop-types */
export default function Guide({ setShowGuide }) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className=" w-full my-6 mx-auto max-w-2xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg  flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex w-full items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-2xl font-semibold">
                Hướng dẫn tạo câu hỏi bằng AI
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowGuide(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  X
                </span>
              </button>
            </div>
            {/*body*/}
            <div className=" w-full  p-6 flex-auto">
              <div>
                <p className="text-lg">
                  Bạn có thể tạo câu hỏi một cách tự động bằng cách nhập chủ đề
                  và số lượng câu hỏi muốn tạo. Chủ đề phải thật cụ thể và đúng
                  ngữ cảnh để có thể tạo ra câu hỏi chất lượng.
                </p>
                <p className="text-lg">
                  Ví dụ: Toán lớp 1, Văn lớp 2, Lịch sử Việt Nam, ...
                </p>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  setShowGuide(false);
                }}
              >
                Đã hiểu
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
