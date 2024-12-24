import { useContext } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';
import useAxios from '../../../hooks/UseAxios';
import SideNavLink from "./SideNavLink";
import { FaHome, FaUsers, FaFileAlt} from "react-icons/fa";
import {LuLogOut} from "react-icons/lu"; 

const StudentSidebar = () => {

    const  {userData, setUserData } = useContext(UserContext);
    const isStudent = userData.role;
    const navigate = useNavigate();
    const BEARER_TOKEN = userData?.token;
    const {fetchData} = useAxios('/logout', 'post', {headers: {'Authorization': `Bearer ${BEARER_TOKEN}`}})

    async function Logout(){
        await fetchData()
        setUserData({token: '', role: null, permissions: {}});
        navigate('/login');
    }

    return(
        <aside className="sidebar z-10 max-w-[252px] w-full bg-white-default shadow-side-Shadow overflow-y-scroll">
            <div className="p-5">
                <Link to="/">
                    <img
                        className="object-contain object-center"
                        src="/assets/images/logo-black.png"
                        alt="Logo"
                    />
                </Link>
            </div>
            <div className="pb-10">
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
                            href="/profile"
                            text="Profile"
                            icon={<FaUsers />}
                        />
                    </li>
                    <li>
                        <SideNavLink
                            href="/application-form"
                            text="Application Form"
                            icon={<FaFileAlt />}
                        />
                    </li>
                    <li>
                        <button 
                            onClick={Logout} 
                            className={`w-full text-base font-medium leading-5 capitalize flex flex-wrap items-center px-5 pt-3 pb-4 group ${isStudent === 'student' ? 'hover:bg-primary-100 hover:text-primary-default text-black-300' : 'hover:bg-primary-300'}`}
                        >
                            <span className="text-xl font-medium mr-3.5"><LuLogOut /></span>
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default StudentSidebar;