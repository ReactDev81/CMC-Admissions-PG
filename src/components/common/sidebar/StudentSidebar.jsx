import { useContext } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { FaHome, FaUsers, FaFileAlt} from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { ImExit } from "react-icons/im";
import { UserContext } from '../../../context/UserContext';
import { ApplicationContext } from '../../../context/ApplicationContext';
import useAxios from '../../../hooks/UseAxios';
import SideNavLink from "./SideNavLink";


const StudentSidebar = () => {

    const {userData, setUserData } = useContext(UserContext);
    const { setApplicationInfo } = useContext(ApplicationContext);
    const isStudent = userData.role;
    const navigate = useNavigate();
    const BEARER_TOKEN = userData?.token;
    const {fetchData} = useAxios('/logout', 'post', {headers: {'Authorization': `Bearer ${BEARER_TOKEN}`}})

    async function Logout(){
        await fetchData()
        setUserData({token: '', role: null, permissions: {}, userDetails: {}});
        setApplicationInfo({
            application_id: null,
            steps:{
                step_personal: 'pending',
                step_academic: 'pending',
                step_documents: 'pending',
                step_payment: 'pending',
            }
        });
        navigate('/login');
    }

    return(
        <aside className="sidebar z-10 max-w-[252px] w-full bg-white-default shadow-side-Shadow overflow-y-scroll">
            <div className="p-5">
                <Link to="/student">
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
                            href="student"
                            text="Dashboards"
                            icon={<FaHome />}
                        />
                    </li>
                    <li>
                        <SideNavLink
                            href="/student/profile"
                            text="Profile"
                            icon={<FaUsers />}
                        />
                    </li>
                    <li>
                        <SideNavLink
                            href="/student/notifications"
                            text="Notifications"
                            icon={<IoNotifications  />}
                        />
                    </li>
                    <li>
                        <SideNavLink
                            href="/student/application-form"
                            text="Application Form"
                            icon={<FaFileAlt />}
                        />
                    </li>
                    <li>
                        <button 
                            onClick={Logout} 
                            className={`w-full text-base font-medium leading-5 capitalize flex flex-wrap items-center px-5 pt-3 pb-4 group ${isStudent === 'student' ? 'hover:bg-primary-100 hover:text-primary-default text-black-300' : 'hover:bg-primary-300'}`}
                        >
                            <span className="text-xl font-medium mr-3.5"><ImExit size={20} /></span>
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default StudentSidebar;