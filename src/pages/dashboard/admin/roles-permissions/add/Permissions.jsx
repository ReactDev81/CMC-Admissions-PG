import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../../../../context/UserContext";
import UseAxios from "../../../../../hooks/UseAxios";
import InputField from "../../../../../components/forms/Inputfield";
import Checkbox from "../../../../../components/forms/Checkbox";
import Button from "../../../../../components/ui/Button";
const Permissions = () => {

    const { userData } = useContext(UserContext);
    const getRoles = UseAxios('/roles', 'get', { headers: { Authorization: `Bearer ${userData.token}` } });
    const allRoles = getRoles.data || [];

    const { register, handleSubmit, setValue, watch, reset, formState: { errors }} = useForm();
    const [selectAll, setSelectAll] = useState(false);

    // Watch all permissions to track changes
    const selectedRoles = watch();

    // Handle "Select All" toggle
    const handleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);

        // Set all checkboxes to the same state as "Select All"
        allRoles.forEach(role => {
            setValue(role.name, newSelectAll);
        });
    };

    useEffect(() => {
        getRoles.fetchData();
    }, [])

    const onSubmit = (formData) => {

        const selectedRoles = allRoles
            .filter(role => formData[role.name])
            .map(role => role.id);

        const customizeData = {
            name: formData.name, 
            roles: selectedRoles
        };

        console.log("Formatted Payload:", customizeData);
        reset();
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="w-full border p-5 rounded-md">
            <InputField
                label="Permission Name"
                className="text-black-default mb-4"
                placeholder="Permission Name"
                {...register("name", { required: true })}
                error={errors.name?.type === 'required' ? "Permission Name is required" : undefined}
            />
            <h2 className="text-lg font-medium text-black-default mb-5">
                Assign Permissions
            </h2>
            <div className="mb-4 flex flex-col gap-4">
                <Checkbox 
                    label="Select All"
                    id="select-all-roles"
                    checked={selectAll}
                    onChange={handleSelectAll}
                />
                {getRoles.loading ? 
                    <div className="flex justify-center items-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                : allRoles && allRoles.map((role) => {
                    const fieldName = role.name
                        .toLowerCase()
                        .replace(/[^a-z0-9]/g, '_')
                        .replace(/_+/g, '_')        
                        .replace(/^_|_$/g, ''); 
                        return (
                            <Checkbox 
                                key={role.id}
                                label={role.name} 
                                id={`role-${role.id}`}
                                fieldName={fieldName}
                                register={register}
                                checked={selectedRoles[role.name] || false} 
                                onChange={() => setValue(role.name, !selectedRoles[role.name])}
                            />
                        )
                    }
                )}
            </div>

            <div className="text-right mb-2.5">
            <Button text="Add" classname="px-9 py-2.5 [&]:rounded-full" />
            </div>
        </form>
    )
}

export default Permissions;