import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

// eslint-disable-next-line react/prop-types
function DefaultLayout({ children }) {
  return (
    <div className="">
      <Header />
      <div className="mt-[60px] bg-white">{children}</div>
      <Footer />
    </div>
  );
}
export default DefaultLayout;
