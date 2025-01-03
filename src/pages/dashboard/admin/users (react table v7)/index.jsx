import { useState, useEffect, Suspense} from "react";
import UserList from "../../../../fake-api/UserList"
import AddNewUser from "./popup/AddNewUser";
import EditUser from "./popup/EditUser";
import DeleteUser from "./popup/DeleteUser";
import { FaArrowsRotate } from "react-icons/fa6";
import { FiPrinter } from "react-icons/fi";
import { CgAddR } from "react-icons/cg";
import Button from "../../../../components/ui/Button";
import UseAxios from "../../../../hooks/UseAxios";
import { useContext } from "react";
import { UserContext } from "../../../../context/UserContext";
import UserTableContent from "./UserTableContent";

const Users = () => {

    const{ userData } = useContext(UserContext);
    const Token = userData.token;
    const {data, loading, error, status, fetchData} = UseAxios('/users', 'get', {
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

    console.log(data?.data)

    return(
        <>
            <div className="flex gap-2.5 justify-end items-center mt-4 mb-9">
                <span className="h-10 w-10 rounded-full bg-white-default flex items-center justify-center">
                    <FaArrowsRotate className="text-black-300" />
                </span>
                <span className="h-10 w-10 rounded-full bg-white-default flex items-center justify-center">
                    <FiPrinter className="text-black-300" />
                </span>
                <Button
                    onclick={() => setShowAddStudents(true)}
                    classname="flex items-center [&]:rounded-full w-auto"
                    icon={<CgAddR className="text-xl mr-2" />}
                    text="Add User"
                    className="text-white-default"
                />
            </div>

            <Suspense fallback={<div className="text-center py-5">Loading Users...</div>}>
                <UserTableContent data={data} onAction={handleAction} />
            </Suspense>

            {showAddStudents && (
                <div className="fixed top-0 left-0 w-full h-full bg-[#1f1e1e80] flex justify-center items-center">
                    <AddNewUser onClose={setShowAddStudents} />
                </div>
            )}

            {popupType === 'view' && popupData && (
                <div className="fixed top-0 left-0 w-full h-full bg-[#1f1e1e80] flex justify-center items-center">
                    <EditUser data={popupData} onClose={closePopup} />
                </div>
            )}

            {popupType === 'delete' && popupData && (
                <div className="fixed top-0 left-0 w-full h-full bg-[#1f1e1e80] flex justify-center items-center">
                    <DeleteUser
                        data={popupData}
                        onClose={closePopup}
                        onConfirm={() => {
                            closePopup();
                        }}
                    />
                </div>
            )}
        </>
    )
}

export default Users;