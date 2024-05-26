import CourseHeader from "../../Header/Header";
import Footer from "../../Footer/Footer";

// eslint-disable-next-line react/prop-types
function CourseLayout({ children }) {
  return (
    <div className="">
      <CourseHeader />
      <div className=" mb-10 min-h-[100vh]">{children}</div>
      <Footer />
    </div>
  );
}
export default CourseLayout;
