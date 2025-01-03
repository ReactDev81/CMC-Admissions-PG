import { RxCross2 } from "react-icons/rx";
import OutlineButton from "../../../../../components/ui/OutlineButton";
import Button from "../../../../../components/ui/Button";
import Inputfield from "../../../../../components/forms/Inputfield";
import ToggleButton from "../../../../../components/forms/ToggleButton";

const AddNewUser = ({onClose}) => {
    return (
        <div className="max-w-[670px] w-full bg-white-default rounded-md shadow-flex">
            <div className="grid grid-cols-1 gap-7 text-black-default">
                <div className="flex items-center justify-between pt-7 pb-5 px-5 border-b">
                    <h2 className="text-black-default text-xl font-bold">Add New User</h2>
                    <RxCross2 onClick={() => onClose(false)} className="text-black-default cursor-pointer size-5" />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-7 px-5 py-4 text-black-default">
                <div className="flex items-center gap-4">
                    <div className="size-[73px]">
                        <img
                            src="/assets/avatars/add-new-user.png"
                            alt="Add new User Popup Avatar"
                            className="h-full w-full rounded-full object-cover object-center"
                        />
                    </div>
                    <OutlineButton
                        text="Add"
                        className="pt-1 pb-1.5 px-5 border-primary-default text-primary-default"
                    />
                </div>
                <Inputfield label="Full Name" />
                <Inputfield label="Email" />
                <Inputfield label="Role?" />
                <Inputfield label="Password" type="password" />
                <Inputfield label="Confirm Password" type="password" />
                <div className="flex items-center gap-2.5">
                    <span className="text-black-300 font-medium text-lg">Status</span>
                    <ToggleButton />
                </div>
                <div className="flex items-center gap-2.5 justify-end border-t pt-4">
                    <Button
                        onclick={() => onClose(false)}
                        text="Cancel"
                        classname="py-2.5 px-8 [&]:rounded-full border-0 [&]:text-black-300 [&]:bg-primary-100"
                    />
                    <Button text="Add User" classname="py-2.5 px-8 [&]:rounded-full" />
                </div>
            </div>
        </div>
    );
};

export default AddNewUser;
