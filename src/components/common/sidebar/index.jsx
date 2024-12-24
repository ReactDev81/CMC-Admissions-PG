import AdminSidebar from "./AdminSidebar";
import StudentSidebar from "./StudentSidebar";
import { UserContext } from "../../../context/UserContext";
import { useContext } from "react";

const Sidebar = () => {

    const {userData} = useContext(UserContext);

    return userData.role === 'student' ? <StudentSidebar /> : <AdminSidebar />;
}

export default Sidebar;