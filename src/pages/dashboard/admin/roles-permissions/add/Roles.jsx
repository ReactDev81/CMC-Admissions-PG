import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { UserContext } from "../../../../../context/UserContext";
import UseAxios from "../../../../../hooks/UseAxios";
import InputField from "../../../../../components/forms/Inputfield";
import Checkbox from "../../../../../components/forms/Checkbox";
import Button from "../../../../../components/ui/Button";
const Roles = () => {

    const { userData } = useContext(UserContext);
    const getAllPermissions = UseAxios('/permissions', 'get', { headers: { Authorization: `Bearer ${userData.token}` } });
    const allPermissions = getAllPermissions.data || [];

    const createRole = UseAxios('/roles', 'post', { headers: { Authorization: `Bearer ${userData.token}` } });

    const { register, handleSubmit, setValue, watch, reset, formState: { errors }} = useForm();
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        getAllPermissions.fetchData();
    }, [])

    // Watch all permissions to track changes
    const selectedPermissions = watch();

    // Handle "Select All" toggle
    const handleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);

        // Set all checkboxes to the same state as "Select All"
        allPermissions.forEach(permission => {
            setValue(permission.name, newSelectAll);
        });
    };

    const onSubmit = async (formData) => {

        // Filter permissions where value is `true`
        const selectedRoles = allPermissions
        .filter(permission => formData[permission.name])
        .map(permission => permission.id); 

        const customizeData = {
            name: formData.name,
            roles: selectedRoles
        };

        await createRole.fetchData({data: customizeData});
    }

    useEffect(() => {
        if(createRole.status === 200){
            toast.success(createRole.data.message);
            reset();
        }
    }, [createRole.loading])

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="w-full border p-5 rounded-md">
            <InputField
                label="Role Name"
                className="text-black-default mb-4"
                placeholder="Role Name"
                {...register("name", { required: true})}
                error={errors.name?.type === 'required' ? "Role Name is required" : undefined}
            />
            {createRole.error && <p className="bg-red-100 py-2.5 px-5 text-red-800 mt-2 mb-3 rounded-md font-normal" dangerouslySetInnerHTML={{ __html: createRole.error }}></p>}
            <h2 className="text-lg font-medium text-black-default mb-5">
                Assign Permissions
            </h2>
            <div className="mb-4">
                <Checkbox 
                    label="Select All" 
                    id="select-all-permissions"
                    checked={selectAll}
                    onChange={handleSelectAll}
                />
            </div>
            <div className="flex flex-wrap gap-4 mb-4">
                {getAllPermissions.loading ? (
                        <div className="flex justify-center items-center py-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                        </div>
                    ) : allPermissions && 
                    allPermissions.map((permission) => {
                        const formattedName = permission.name
                        .split('-') 
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
                        .join(' '); 
                        return(
                            <div key={permission.id} className="w-fit">
                                <Checkbox 
                                    id={permission.id} 
                                    label={formattedName}
                                    fieldName={permission.name}
                                    register={register}
                                    checked={selectedPermissions[permission.name] || false} 
                                    onChange={() => setValue(permission.name, !selectedPermissions[permission.name])}
                                />
                            </div>
                        )
                    })
                }
            </div>
            <div className="text-right mb-2.5">
                <Button type="submit" text="Add" classname="px-9 py-2.5 [&]:rounded-full" />
            </div>
        </form>
    )
}

export default Roles;