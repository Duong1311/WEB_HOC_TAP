/**
 * YouTube: TrungQuanDev - Một Lập Trình Viên
 * Created by trungquandev.com's author on Jun 28, 2023
 */
/**
 * Capitalize the first letter of a string
 */
export const capitalizeFirstLetter = (val) => {
  if (!val) return "";
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`;
};

/**
 * Video 37.2 hàm generatePlaceholderCard: Cách xử lý bug logic thư viện Dnd-kit khi Column là rỗng:
 * Phía FE sẽ tự tạo ra một cái card đặc biệt: Placeholder Card, không liên quan đến Back-end
 * Card đặt biệt này sẽ được ẩn ở giao diện UI người dùng.
 * Cấu trúc Id của cái card này để Unique rất đơn giản, không cần phải làm random phức tạp:
 * "columnId-placeholder-card" (mỗi column chỉ có thể có tối đa một cái Placeholder Card)
 * Quan trọng khi tạo: phải đầy đủ: (_id, _boardId, columnId, FE_PlaceholderCard)
 * => Kỹ hơn nữa về cách tạo chuẩn ở bước nào thì sẽ ở học phần tích hợp API Back-end vào dự
 * án. (bởi vì đây là file mock-data)
 */
export const generatePlaceholderlesson = (chapter) => {
  return {
    _id: `${chapter._id}-placeholder-card`,
    courseId: chapter.courseId,
    chapterId: chapter._id,
    FE_PlaceholderCard: true,
  };
};
