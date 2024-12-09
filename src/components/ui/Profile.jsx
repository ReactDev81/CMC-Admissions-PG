import { RiArrowDownSLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { GoBell } from "react-icons/go";
import { SlLogout } from "react-icons/sl";
import DropdownLinkBox from "./DropdownLinkBox";

const Profile = () => {

const LinkLists = [
  {
    title: "Account",
    path: "/",
    icon: AiOutlineUser,
  },
  {
    title: "Notifications",
    path: "/",
    icon: GoBell,
  },
  {
    title: "Logout",
    path: "/",
    icon: SlLogout,
  }
]

  return (
    <>
      <div className="group relative">
          <div className="flex flex-wrap gap-3">
            <img className="object-contain" src="../src/assets/images/profile.png" alt="User"/>
            <div>
              <h5 className="text-black-default font-medium leading-5">Alen Miller</h5>
              <p className="text-sm font-normal text-black-200 flex items-center">
                UI Designer
                <span className="text-xl">
                  <RiArrowDownSLine />
                </span>
              </p>
            </div>
          </div>
          <DropdownLinkBox lists={LinkLists} />
      </div>
    </>
  );
};

export default Profile;
