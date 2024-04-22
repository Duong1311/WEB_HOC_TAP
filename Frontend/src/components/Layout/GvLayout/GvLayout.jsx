import GvHeader from "../../Header/GvHeader";
import Footer from "../../Footer/Footer";

// eslint-disable-next-line react/prop-types
export default function GvLayout({ children }) {
  return (
    <div>
      <GvHeader />
      {children}
      <Footer />
    </div>
  );
}
