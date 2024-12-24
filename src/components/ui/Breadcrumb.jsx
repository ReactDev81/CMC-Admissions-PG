import { GoHome } from "react-icons/go"; 
import Title from "./Title";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Breadcrumb = () => {

  const {userData} = useContext(UserContext);
  const Dashboard = userData.role === "student" ? 'Student' : 'Admin';

  const location = useLocation();
  let pathname = location.pathname; 
  pathname = pathname === '/' ? Dashboard : pathname;

  const breadcrumb = pathname.startsWith('/') ? pathname.slice(1) : pathname;

  const formattedBreadcrumb = breadcrumb
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <>
      <Title title={formattedBreadcrumb === "Student" ? formattedBreadcrumb + ' Dashboard' : formattedBreadcrumb === "Admin" ? formattedBreadcrumb + ' Dashboard' :  formattedBreadcrumb} />
      <div className="flex flex-wrap items-center mt-1">
        <h5 className="text-black-300 font-medium items-center flex flex-wrap">
          <span className="text-xl font-medium">
            <GoHome />
          </span>
          &nbsp;&nbsp;/&nbsp;&nbsp;Dashboard&nbsp;&nbsp;/
        </h5>
        <h5 className="text-primary-default font-medium">&nbsp;&nbsp;{formattedBreadcrumb}</h5>
      </div>
    </>
  );
};

export default Breadcrumb;