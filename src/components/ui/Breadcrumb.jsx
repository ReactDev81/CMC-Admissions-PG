import { GoHome } from "react-icons/go";
import Title from "./Title";
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import useAxios from "../../hooks/UseAxios";

const Breadcrumb = () => {
  const { userData } = useContext(UserContext);
  const Dashboard = userData.role === "student" ? "Student" : "Admin";

  const location = useLocation();
  const [name, setName] = useState(""); 

  let pathname = location.pathname;
  pathname = pathname === "/" ? Dashboard : pathname;

  const breadcrumb = pathname.startsWith("/") ? pathname.slice(1) : pathname;

  // Split the breadcrumb into parts using "/" and capitalize each part
  const breadcrumbParts = breadcrumb.split("/").map((part) =>
    part
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );

  const { data, loading, status, fetchData } = useAxios(null, 'get', { headers: {Authorization: `Bearer ${userData.token}`} })

  useEffect(() => {
    if (pathname.includes("application/")){
      const id = pathname.split("/")[3];
      if(id){
        fetchData({
          url: `/applications/${id}`
        })
      }
    }
  }, [pathname])

  useEffect(() => {
    if (status === 200) {
      setName(data?.name);
    }
  }, [status])

  return (
    <>
      <Title
        title={
          pathname.includes("application/") // Check for application detail page
            ? "Applications Detail"
            : pathname === "/admin" // Check if on admin home page
            ? "Admin Dashboard"
            : pathname === "/student" // Check if on student home page
            ? "Student Dashboard"
            : breadcrumbParts.length > 1 // Check if there are multiple breadcrumb parts
            ? breadcrumbParts[breadcrumbParts.length - 1] // Show last path part
            : breadcrumbParts[0] // Otherwise, show first part
        }
      />
      <div className="flex flex-wrap items-center mt-1">
        <h5 className="text-black-300 font-medium flex items-center">
          <span className="text-xl font-medium">
            <GoHome />
          </span>
          {breadcrumbParts.map((part, index) => (
            <span key={index} className="flex items-center">
              <span className="mx-2">/</span>
              <span
                className={
                  index === breadcrumbParts.length - 1 && !loading
                    ? "text-primary-default font-medium"
                    : ""
                }
              >
                {index === breadcrumbParts.length - 1 && pathname.includes("application/")
                  ? loading
                    ? "Loading..."
                    : name || part
                  : part}
              </span>
            </span>
          ))}
        </h5>
      </div>
    </>
  );
};

export default Breadcrumb;