import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import SubSideNavLink from "./SubSideNavLink";

const SideNavLink = ({ href, text, icon, arrowicon, subLinks = [] }) => {
  const location = useLocation();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const isActive = subLinks.some((link) => location.pathname === link.href);

  const handleDropdownToggle = () => {
    if (subLinks.length) {
      setDropdownOpen((prevState) => !prevState);
    }
  };

  return (
    <div className="relative">
      <NavLink
        to={subLinks.length ? "#" : href}
        className={({ isActive: parentActive }) =>
          `text-base font-medium leading-5 capitalize flex items-center justify-between px-5 py-3 hover:bg-primary-300 
          ${isDropdownOpen || parentActive ? "bg-primary-300" : "bg-transparent"}
          ${isActive || isDropdownOpen ? "mb-2.5" : 'mb-0'}`
        }
        onClick={handleDropdownToggle}
      >
        <div className="flex items-center">
          <span className="text-xl font-medium mr-3.5">{icon}</span>
          {text}
        </div>
        {subLinks.length > 0 && <span className={`${isDropdownOpen ? 'rotate-90' : 'rotate-0'}`}>{arrowicon}</span>}
      </NavLink>

      {subLinks.length > 0 && isDropdownOpen && (
        <SubSideNavLink subLink={subLinks} />
      )}
    </div>
  );
};

export default SideNavLink;
