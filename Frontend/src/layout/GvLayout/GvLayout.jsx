import GvHeader from "~/components/Header/GvHeader";
import Footer from "~/components/Footer/Footer";

// eslint-disable-next-line react/prop-types
export default function GvLayout({ children }) {
  return (
    <div className="">
      <div className="z-[999]">
        <GvHeader />
      </div>
      <div className="mt-[60px] min-h-[100vh] z-0 ">{children}</div>
      <Footer />
    </div>
  );
}
