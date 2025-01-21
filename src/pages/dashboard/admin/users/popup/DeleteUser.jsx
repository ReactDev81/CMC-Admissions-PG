import { useContext, useEffect } from "react";
import { BsTrash3 } from "react-icons/bs";
import useAxios from "../../../../../hooks/UseAxios";
import { UserContext } from "../../../../../context/UserContext";
import Button from "../../../../../components/ui/Button";
import Iconsbutton from "../../../../../components/ui/Iconsbutton";

const DeleteUser = ({onClose, data }) => {

    const { userData } = useContext(UserContext);

    const { fetchData: fetchDeleteUser, status: deletedUserSatus} = useAxios(null, "delete", { headers: { Authorization: `Bearer ${userData.token}` }});

    const deleteUser = async () => {
        await fetchDeleteUser({url: `/users/${data.id}`});
        console.log('delete user');
    }

    useEffect(() => {
        if(deletedUserSatus === 204){
            onClose();
        }
    }, [fetchDeleteUser])

    return(
        <div className="max-w-96 w-full bg-white-default rounded-md shadow-flex p-8">
            <div className="flex flex-col items-center text-center">
                <Iconsbutton classname='inline-block [&]:bg-danger-300 text-danger-default' icon={<BsTrash3 size={24} />} />
                <h2 className="text-[18px] font-medium text-black-default mt-5">Confirm Deletion</h2>
                <p className="text-black-300 mt-2">You want to delete all the marked items.This cant be undone once you delete.</p>
            </div>
            <div className="flex justify-center gap-2.5 mt-4">
                <Button
                    onclick={onClose}
                    text="Cancel"
                    classname="py-2.5 px-9 [&]:rounded-full border-0 [&]:text-black-300 [&]:bg-primary-100"
                />
                <Button 
                    onclick={deleteUser}
                    text="Yes, Delete" 
                    classname="py-2.5 px-9 [&]:rounded-full" 
                />
            </div>
        </div>
    )
}

export default DeleteUser;