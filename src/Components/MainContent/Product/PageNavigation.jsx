import { Link } from "react-router-dom";

const PageNavigation = ({ title }) => {
  return (
    <div className="py-8 ml-20 text-red-300  hover:text-red-600">
      <Link to="/">Home</Link> /<Link to="/allproduct/:id">All Products</Link> /
      {title}
    </div>
  );
};
export default PageNavigation;
