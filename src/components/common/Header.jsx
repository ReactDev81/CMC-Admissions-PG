import Searchbar from "../ui/Searchbar"; // Searchbar
import Breadcrumb from "../ui/Breadcrumb";
import Iconsbutton from "../ui/Iconsbutton"; // Header icons-button
import { IoNotificationsOutline } from "react-icons/io5"; // notification-icon
import Profile from "../ui/Profile"; // Profile
import Notification from "../ui/notification";
import Title from "../ui/Title";
import { PiMoon } from "react-icons/pi";
import { AiOutlineExpand } from "react-icons/ai";

const Header = () => {
  return (
    <header className="bg-white-defaultw-full h-fit bg-white-default">
      <div className="flex flex-wrap justify-between items-center py-4 px-5">
        <div className="left-header">
          <Title title="Admin Dashboard" />
          <div className="flex flex-wrap items-center text-black-300">
            <Breadcrumb text="Dashboard" />
          </div>
        </div>
        <div className="right-header">
          <div className="flex flex-wrap items-center gap-[10px]">
            <Searchbar placeholder="Search.." />
            <div className="relative group">
              <Iconsbutton
                icon={<IoNotificationsOutline />}
                classname=""
              />
              <Notification />
            </div>
            <Iconsbutton icon={<PiMoon />} />
            <Iconsbutton icon={<AiOutlineExpand />} />
            <Profile />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
