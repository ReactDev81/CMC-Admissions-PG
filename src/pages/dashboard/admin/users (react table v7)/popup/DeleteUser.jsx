import Button from "../../../../../components/ui/Button";
import Iconsbutton from "../../../../../components/ui/Iconsbutton";
import { BsTrash3 } from "react-icons/bs";

const DeleteUser = ({ data, onClose, onConfirm }) => {
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
                    onClick={onConfirm}
                    text="Yes, Delete" 
                    classname="py-2.5 px-9 [&]:rounded-full" 
                />
            </div>
        </div>
    )
}

export default DeleteUser;