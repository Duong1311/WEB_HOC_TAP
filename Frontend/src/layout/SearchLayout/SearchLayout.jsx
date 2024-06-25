import SearchHeader from "~/components/Header/SearchHeader";
import Footer from "~/components/Footer/Footer";

// eslint-disable-next-line react/prop-types
function SearchLayout({ children }) {
  return (
    <div className="">
      <SearchHeader />
      <div className="mt-[60px] bg-gray-100 min-h-[100vh]">{children}</div>
      <Footer />
    </div>
  );
}
export default SearchLayout;
