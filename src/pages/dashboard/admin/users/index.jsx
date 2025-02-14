import { useState, useEffect, Suspense, useContext} from "react";
import { CgAddR } from "react-icons/cg";
import { UserContext } from "../../../../context/UserContext";
import useAxios from "../../../../hooks/UseAxios";
import AddNewUser from "./popup/AddNewUser";
import EditUser from "./popup/EditUser";
import DeleteUser from "./popup/DeleteUser";
import Button from "../../../../components/ui/Button";
import UserTableContent from "./UserTableContent";

const Users = () => {

    const{ userData } = useContext(UserContext);
    const Token = userData.token;
    const {data, loading, fetchData} = useAxios('/users', 'get', {
        headers: {'Authorization': `Bearer ${Token}`}
    });

    const handleAction = (type, row) => {
        setPopupType(type);
        setPopupData(row);
    };

    const closePopup = () => {
        setPopupType(null);
        setPopupData(null);
    };

    const [popupData, setPopupData] = useState(null);
    const [popupType, setPopupType] = useState(null);
    const [showAddStudents, setShowAddStudents] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <>
            <div className="flex gap-2.5 justify-end items-center mt-4 mb-9">
                <Button
                    onclick={() => setShowAddStudents(true)}
                    classname="flex items-center [&]:rounded-full w-auto"
                    icon={<CgAddR className="text-xl mr-2" />}
                    text="Add User"
                    className="text-white-default"
                />
            </div>

            <Suspense fallback={<div className="text-center py-5 text-black-default">Loading Users...</div>}>
                <UserTableContent data={data} onAction={handleAction} />
            </Suspense>

            {showAddStudents && (
                <div className="fixed z-20 top-0 left-0 w-full h-full bg-[#1f1e1e80] flex justify-center items-center py-5">
                    <AddNewUser onClose={setShowAddStudents} />
                </div>
            )}

            {popupType === 'view' && popupData && (
                <div className="fixed z-20 top-0 left-0 w-full h-full bg-[#1f1e1e80] flex justify-center items-center py-5">
                    <EditUser data={popupData} onClose={closePopup} />
                </div>
            )}

            {popupType === 'delete' && popupData && (
                <div className="fixed z-20 top-0 left-0 w-full h-full bg-[#1f1e1e80] flex justify-center items-center py-5">
                    <DeleteUser onClose={closePopup} data={popupData} />
                </div>
            )}
        </>
    )
}

export default Users;