import { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import useAxios from "../../hooks/UseAxios";
import Button from "../ui/Button";
import OutlineButton from "../ui/OutlineButton";
import Profile from "../ui/Profile"

const StudentHeader = () => {

  const navigate = useNavigate();
  const { userData } = useContext(UserContext);
  

  return (
    <header>
      <div className="bg-white-default">
        <div className="max-w-lg w-full mx-auto py-5">
          <div className="flex items-center justify-between">
              <Link to="/">
                <img className="h-[60px] w-[260px] object-contain object-left" src="/assets/images/StudentHeaderLogo.png" alt="CMC Logo" />
              </Link>
              {
                userData.token ? <Profile /> :
                <div className="flex items-center gap-x-5">
                  <OutlineButton onclick={() => navigate('/login')} className="text-primary-default border-primary-default px-6 py-2 w-full" text="Login" />
                  <Button onclick={() => navigate('/pg-registration-form')} classname="[&]:rounded-full [&]:px-8 w-full min-w-max" text="Submit Application" />
                </div>
              }
              
          </div>
        </div>
      </div>
    </header>
  );
};

export default StudentHeader;
