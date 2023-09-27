import { Link } from "react-router-dom";

const PageNavigation = ({ title }) => {
  return (
    <div className="py-4">
      <Link to="/">Home</Link> / {title}
    </div>
  );
};
export default PageNavigation;
