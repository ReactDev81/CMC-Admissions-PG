import InputField from "../../../../../components/forms/Inputfield";
import Checkbox from "../../../../../components/forms/Checkbox";
import Button from "../../../../../components/ui/Button";
const Roles = () => {
    return(
        <div className="w-full rounded-md">
            <div className="border p-5 rounded-md">
                <InputField
                    label="Role Name"
                    className="text-black-default mb-4"
                    placeholder="Role Name"
                />
                <h2 className="text-lg font-medium text-black-default mb-5">
                    Assign Permissions
                </h2>
                <div className="mb-4">
                    <Checkbox label="Select All" />
                </div>
                <div className="flex-box flex gap-4 mb-4">
                    <div className="basis-1/5">
                        <Checkbox label="View Any User" />
                    </div>
                    <div className="basis-1/5">
                        <Checkbox label="Delete Profile" />
                    </div>
                    <div className="basis-1/5">
                        <Checkbox label="View Role" />
                    </div>
                    <div className="basis-1/5">
                        <Checkbox label="Create Form" />
                    </div>
                    <div className="basis-1/5">
                        <Checkbox label="Create Remark" />
                    </div>
                </div>
                <div className="flex-box flex gap-4 mb-4">
                    <div className="basis-1/5">
                        <Checkbox label="Create User" />
                    </div>
                    <div className="basis-1/5">
                        <Checkbox label="Update Profile" />
                    </div>
                    <div className="basis-1/5">
                        <Checkbox label="Update Role" />
                    </div>
                    <div className="basis-1/5">
                        <Checkbox label="View Form" />
                    </div>
                    <div className="basis-1/5">
                        <Checkbox label="View Remark" />
                    </div>
                </div>
                <div className="flex-box flex gap-4 mb-4">
                    <div className="basis-1/5">
                        <Checkbox label="Delete User" />
                    </div>
                    <div className="basis-1/5">
                        <Checkbox label="View Any Role" />
                    </div>
                    <div className="basis-1/5">
                        <Checkbox label="Delete Role" />
                    </div>
                    <div className="basis-1/5">
                        <Checkbox label="Update Form" />
                    </div>
                    <div className="basis-1/5">
                        <Checkbox label="Update Remark" />
                    </div>
                </div>
                <div className="flex-box flex gap-4 mb-5">
                    <div className="basis-1/5">
                        <Checkbox label="View Profile" />
                    </div>
                    <div className="basis-1/5">
                        <Checkbox label="Create Role" />
                    </div>
                    <div className="basis-1/5">
                        <Checkbox label="View Any Form" />
                    </div>
                    <div className="basis-1/5">
                        <Checkbox label="Delete Form" />
                    </div>
                    <div className="basis-1/5">
                        <Checkbox label="Delete Remark" />
                    </div>
                </div>
                <div className="text-right mb-2.5">
                    <Button text="Add" classname="px-9 py-2.5 [&]:rounded-full" />
                </div>
            </div>
        </div>
    )
}

export default Roles;