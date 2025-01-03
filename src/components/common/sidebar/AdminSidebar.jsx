import { useContext } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';
import useAxios from '../../../hooks/UseAxios';
import Badge from "../../ui/Badge";
import SideNavLink from "./SideNavLink";
import { FaHome, FaUsers, FaChartBar, FaFileAlt} from "react-icons/fa";
import {LuLogOut, LuLayoutPanelLeft, LuFiles} from "react-icons/lu"; 
import { LiaToolsSolid} from "react-icons/lia"; 
import { RiLockPasswordLine } from "react-icons/ri"; 
import { GrMapLocation } from "react-icons/gr"; 
import { MdDynamicForm } from "react-icons/md";
import { FaBible } from "react-icons/fa";

const AdminSidebar = () => {

  const  {userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const BEARER_TOKEN = userData?.token;
  const {fetchData} = useAxios('/logout', 'post', {headers: {'Authorization': `Bearer ${BEARER_TOKEN}`}})

  async function Logout(){
    await fetchData()
    setUserData({token: '', role: null, permissions: {}});
    navigate('/login');
  }

  const applicationLinks = [
    { href: "/applications", text: "All Applications" },
    { href: "/application-detail", text: "Application Detail" },
    { href: "/add-new", text: "Add New" },
  ];

  return (
    <aside className="sidebar max-w-[252px] w-full bg-primary-default shadow-side-Shadow overflow-y-scroll">
        <div className="p-5">
          <Link to="/">
            <img
              className="object-contain object-center"
              src="/assets/images/logo.png"
              alt="Logo"
            />
          </Link>
        </div>
        <div className="pb-10">
          <Badge text="Main" />
          <ul>
            <li>
              <SideNavLink
                href="/"
                text="Dashboards"
                icon={<FaHome />}
              />
            </li>
            <li>
              <SideNavLink
                href="/users"
                text="Users"
                icon={<FaUsers />}
              />
            </li>
            {/* Link with sub-items */}
            <li>
              <SideNavLink
                text="Applications"
                icon={<FaFileAlt />}
                subLinks={applicationLinks}
              />
            </li>
            <li>
              <SideNavLink
                href="/pg-form-settings"
                text="PG Form Settings"
                icon={<MdDynamicForm  />}
              />
            </li>
            <li>
              <SideNavLink
                href="/reports"
                text="Reports"
                icon={<FaChartBar  />}
              />
            </li>
            {
              userData?.role === 'super-admin' &&
              (<li>
                  <SideNavLink
                    href="/admin-panel"
                    text="Admin Panel"
                    icon={<LuLayoutPanelLeft />}
                />
              </li>)
            }
          </ul>

          <Badge text="Setting" />

          <ul>
            <li>
              <SideNavLink
                href="/pages"
                text="Pages"
                icon={<LuFiles />}
              />
            </li>
            <li>
              <SideNavLink
                href="/bible-test-center"
                text="Bible Test Centers"
                icon={<FaBible />}
              />
            </li>
            <li>
              <SideNavLink
                href="/states"
                text="States"
                icon={<GrMapLocation />}
              />
            </li>
            <li>
              <SideNavLink
                href="/maintenance"
                text="Maintenance"
                icon={<LiaToolsSolid />}
              />
            </li>
            <li>
              <SideNavLink
                href="change-password"
                text="Change Password"
                icon={<RiLockPasswordLine />}
              />
            </li>
            <li>
                <button onClick={Logout} className="w-full text-base font-medium leading-5 capitalize flex flex-wrap items-center px-5 pt-3 pb-4 hover:bg-primary-300 group">
                    <span className="text-xl font-medium mr-3.5"><LuLogOut /></span>
                    Logout
                </button>
            </li>
          </ul>
        </div>
    </aside>
  );
};

export default AdminSidebar;
