import { useContext } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { FaHome, FaUsers, FaChartBar, FaFileAlt} from "react-icons/fa";
import {LuLogOut, LuLayoutPanelLeft, LuFiles} from "react-icons/lu"; 
import { LiaToolsSolid} from "react-icons/lia"; 
import { GrSystem } from "react-icons/gr";
import { RiListCheck3 } from "react-icons/ri";
import { RiListSettingsLine } from "react-icons/ri";
import { FaUserCog } from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";
import { UserContext } from '../../../context/UserContext';
import { ApplicationContext } from '../../../context/ApplicationContext';
import useAxios from '../../../hooks/UseAxios';
import Badge from "../../ui/Badge";
import SideNavLink from "./SideNavLink";



const AdminSidebar = () => {

  const applicationInformation = {
    application_id: null,
    steps:{
      step_personal: 'pending',
      step_academic: 'pending',
      step_documents: 'pending',
      step_payment: 'pending',
    }
  }

  const { userData, setUserData } = useContext(UserContext);
  const { setApplicationInfo } = useContext(ApplicationContext);
  const navigate = useNavigate();
  const BEARER_TOKEN = userData?.token;
  const { fetchData } = useAxios('/logout', 'post', {headers: {'Authorization': `Bearer ${BEARER_TOKEN}`}})

  async function Logout(){
    await fetchData()
    setUserData({ token: '', role: null, userDetails: {}, permissions: {} });
    setApplicationInfo(applicationInformation)
    navigate('/login');
  }

  const applicationLinks = [
    { href: "/admin/applications", text: "All Applications" },
    { href: "/admin/application/addnew", text: "Add New" },
  ];

  return (
    <aside className="sidebar max-w-[252px] w-full bg-primary-default shadow-side-Shadow overflow-y-scroll">
        <div className="p-5">
          <Link to="/admin">
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
                href="/admin"
                text="Dashboards"
                icon={<FaHome />}
              />
            </li>
            <li>
              <SideNavLink
                href="/admin/users"
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
                href="/admin/reports"
                text="Reports"
                icon={<FaChartBar  />}
              />
            </li>
            {/* {
              userData?.role === 'super-admin' &&
              (<li>
                  <SideNavLink
                    href="/admin-panel"
                    text="Admin Panel"
                    icon={<LuLayoutPanelLeft />}
                />
              </li>)
            } */}
          </ul>

          <Badge text="Setting" />

          <ul>
            <li>
              <SideNavLink
                href="/admin/pages"
                text="Pages"
                icon={<LuFiles />}
              />
            </li>
            <li>
              <SideNavLink
                href="/admin/pg-form-settings"
                text="PG Form Settings"
                icon={<RiListSettingsLine  />}
              />
            </li>
            <li>
              <SideNavLink
                href="/admin/system-settings"
                text="System Settings"
                icon={<GrSystem size={16}  />}
              />
            </li>
            <li>
              <SideNavLink
                href="/admin/roles-permissions"
                text="Roles & Permissions"
                icon={<RiListCheck3  />}
              />
            </li>
            <li>
              <SideNavLink
                href="/admin/maintenance-mode"
                text="Maintenance"
                icon={<LiaToolsSolid />}
              />
            </li>
          </ul>

          <Badge text="Account" />

          <ul>
            <li>
              <SideNavLink
                href="/admin/my-account"
                text="My Account"
                icon={<FaUserCog  />}
              />
            </li>
            <li>
              <SideNavLink
                href="/admin/notifications"
                text="Notifications"
                icon={<MdNotificationsActive  />}
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
