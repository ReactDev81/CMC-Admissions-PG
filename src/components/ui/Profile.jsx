import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiArrowDownSLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { GoBell } from "react-icons/go";
import { SlLogout } from "react-icons/sl";
import { UserContext } from "../../context/UserContext";
import { ApplicationContext } from '../../context/ApplicationContext';
import useAxios from "../../hooks/UseAxios";
import DropdownLinkBox from "./DropdownLinkBox";

const formatDocumentName = (name) => {
  return name
  .replace(/_/g, " ")
  .replace(/-/g, " ")
  .replace(/\b\w/g, (char) => char.toUpperCase()); 
};

const Profile = () => {

  const applicationInformation = {
    application_id: null,
    steps:{
      step_personal: 'pending',
      step_academic: 'pending',
      step_documents: 'pending',
      step_payment: 'pending',
    }
  }

  const {userData, setUserData} = useContext(UserContext);
  const {setApplicationInfo} = useContext(ApplicationContext);
  const navigate = useNavigate();
  const { fetchData } = useAxios('/logout', 'post', {headers: {'Authorization': `Bearer ${userData?.token}`}})

  async function Logout(){
    await fetchData()
    setUserData({ token: '', role: null, userDetails: {}, permissions: {} });
    setApplicationInfo(applicationInformation)
    navigate('/login');
  }

  const roleBasedLink = userData.role === "student" ? 'student' : 'admin';

  const LinkLists = [
    {
      title: "Account",
      path: userData.role === "student" ? '/student/profile' : '/admin/my-account',
      icon: AiOutlineUser,
    },
    {
      title: "Notifications",
      path: `/${roleBasedLink}/notifications`,
      icon: GoBell,
    }
  ]

  return (
    <div className="group relative cursor-pointer">
        <div className="flex items-center flex-wrap gap-2.5">
          <img 
            className="w-8 h-8 rounded-full object-contain" 
            src={userData?.userDetails.profile_pic_url ? userData?.userDetails.profile_pic_url : '/assets/avatars/user.png'}
            alt="User"
          />
          <div>
            <h5 className="text-black-default font-medium leading-5">{userData?.userDetails.name}</h5>
            <p className="text-sm font-normal text-black-200 flex items-center">
              {userData ? formatDocumentName(userData?.role) : ''}
              <span className="text-xl">
                <RiArrowDownSLine />
              </span>
            </p>
          </div>
        </div>
        <DropdownLinkBox 
          lists={LinkLists} 
          buttonItem={
            <li>
              <button onClick={Logout} className="flex flex-wrap items-center gap-[10px] p-2.5 group/item">
                <SlLogout className="group-hover/item:text-primary-default rotate-180 ml-[3px]"  />
                <span className="text-base font-medium text-black-300 group-hover/item:text-primary-default">Logout</span>
              </button>
            </li>
          }
        />
    </div>
  );
};

export default Profile;
