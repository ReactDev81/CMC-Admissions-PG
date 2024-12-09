import { NavLink } from "react-router-dom";

const SubSideNavLink = ({subLink = []}) => {
  return (
    <ul className="relative before:content-[''] before:w-[1px] before:h-[calc(100%-12px)] before:bg-[#cbccceb3] before:absolute before:top-1.5 before:left-7">
      
        {subLink.map((link, index) => {
          return(
            <li key={index}>
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  `transition duration-300 ease-in text-base font-medium leading-5 capitalize flex flex-wrap items-center px-5 pl-16 py-2 text-center 
                  ${isActive ? "text-white-default" : "text-[#CBCCCEB2]"} hover:text-white-default relative
                  before:content-[''] before:absolute before:top-2/4 before:left-11 before:w-[5px] before:h-[5px] before:rounded-full before:-translate-y-1/2 ${isActive ? "before:bg-[#fff]" : "before:bg-[#cbccceb3]"} 
                  after:content-[''] after:absolute after:top-[48%] after:left-7 after:w-4 after:border-t after:border-solid ${isActive ? "after:border-[#fff]" : "after:border-[#cbccceb3]"}`
                }
              >
                {link.text}
              </NavLink>
            </li>
          )
        })}
    </ul>
  );
};

export default SubSideNavLink;
