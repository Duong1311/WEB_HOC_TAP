import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

// eslint-disable-next-line react/prop-types
function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
export default DefaultLayout;
