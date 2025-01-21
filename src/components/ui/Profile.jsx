import { RiArrowDownSLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { GoBell } from "react-icons/go";
import { SlLogout } from "react-icons/sl";
import DropdownLinkBox from "./DropdownLinkBox";
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../context/UserContext"
import useAxios from "../../hooks/UseAxios";

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
    }
  ]

  const applicationInformation = {
    application_id: null,
    steps:{
      step_personal: 'pending',
      step_academic: 'pending',
      step_documents: 'pending',
      step_payment: 'pending',
    }
  }

  const {userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const BEARER_TOKEN = userData?.token;
  const {status, fetchData} = useAxios('/logout', 'post', {headers: {'Authorization': `Bearer ${BEARER_TOKEN}`}})

  async function Logout(){
    await fetchData()
    setUserData({token: '', role: null, permissions: {}});
    navigate('/login');
  }

  return (
    <>
      <div className="group relative cursor-pointer">
          <div className="flex flex-wrap gap-3">
            <img className="object-contain" src="/assets/images/profile.png" alt="User"/>
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
    </>
  );
};

export default Profile;
