import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go"; // Home

const Breadcrumb = ({ icon }) => {
  return (
    <div className="flex flex-wrap items-center">
      <Link>
        <h5 className="text-black-300 font-medium items-center flex flex-wrap">
          <span className="text-xl font-medium">
            <GoHome />
          </span>
          &nbsp;&nbsp;/&nbsp;&nbsp;Dashboard&nbsp;&nbsp;/
        </h5>
      </Link>
      <h5 className="text-primary-default font-medium">&nbsp;&nbsp;Admin</h5>
    </div>
  );
};

export default Breadcrumb;