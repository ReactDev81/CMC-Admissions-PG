import InputField from "../../../../../components/forms/Inputfield";
import Checkbox from "../../../../../components/forms/Checkbox";
import Button from "../../../../../components/ui/Button";
const Permissions = () => {
    return(
        <div className="w-full rounded-md">
            <div className="border p-5 rounded-md">
                <InputField
                label="Permission Name"
                className="text-black-default mb-4"
                placeholder="Permission Name"
                />
                <h2 className="text-lg font-medium text-black-default mb-5">
                Assign Permissions
                </h2>
                <div className="mb-4 flex flex-col gap-4">
                <Checkbox label="Select All" />
                <Checkbox label="Admin" />
                <Checkbox label="Manager" />
                <Checkbox label="Student" />
                </div>

                <div className="text-right mb-2.5">
                <Button text="Add" classname="px-9 py-2.5 [&]:rounded-full" />
                </div>
            </div>
        </div>
    )
}

export default Permissions;