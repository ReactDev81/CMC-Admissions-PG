import Searchbar from "../ui/Searchbar";
import Breadcrumb from "../ui/Breadcrumb";
import Iconsbutton from "../ui/Iconsbutton"; 
import Profile from "../ui/Profile";
import Notification from "../ui/notification";
import { IoNotificationsOutline } from "react-icons/io5"; 
import { PiMoon } from "react-icons/pi";
import { AiOutlineExpand } from "react-icons/ai";
import { BsFullscreenExit } from "react-icons/bs";
import { useState } from "react";

const Header = () => {

  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const element = document.documentElement; // Select the full document

    if (!isFullscreen) {
      // Enter fullscreen
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen(); // Firefox
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(); // Chrome, Safari, Opera
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen(); // IE/Edge
      }
      setIsFullscreen(true);
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen(); // Firefox
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen(); // Chrome, Safari, Opera
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen(); // IE/Edge
      }
      setIsFullscreen(false);
    }
  };

  return (
    <header className="bg-white-defaultw-full h-fit bg-white-default shadow-flex sticky top-0 z-10">
      <div className="flex flex-wrap justify-between items-center py-4 px-5">
        <div className="left-header">
          <Breadcrumb />
        </div>
        <div className="right-header">
          <div className="flex flex-wrap items-center gap-[10px]">
            <Searchbar placeholder="Search.." />
            <div className="relative group">
              <Iconsbutton
                icon={<IoNotificationsOutline />}
              />
              <Notification />
            </div>
            <Iconsbutton icon={<PiMoon />} />
            <Iconsbutton onclick={toggleFullscreen} icon={isFullscreen ? <BsFullscreenExit /> : <AiOutlineExpand />} />
            <Profile />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
