import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { UserContext } from "../../../../../context/UserContext";
import UseAxios from "../../../../../hooks/UseAxios";
import Loader from "../../../../../components/ui/Loader";
import InputField from "../../../../../components/forms/Inputfield";
import Checkbox from "../../../../../components/forms/Checkbox";
import Button from "../../../../../components/ui/Button";
const Permissions = () => {

    const { userData } = useContext(UserContext);
    const getRoles = UseAxios('/roles', 'get', { headers: { Authorization: `Bearer ${userData.token}` } });
    const allRoles = getRoles.data || [];

    const createPermission = UseAxios('/permissions', 'post', { headers: { Authorization: `Bearer ${userData.token}` } });

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
            const fieldName = role.name
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '_')
            .replace(/_+/g, '_')         
            .replace(/^_|_$/g, '');

            setValue(fieldName, newSelectAll);
        });
    };

    useEffect(() => {
        getRoles.fetchData();
    }, [])

    const onSubmit = async (formData) => {
        const selectedRoles = allRoles
            .filter(role => {
                const fieldName = role.name
                    .toLowerCase()
                    .replace(/[^a-z0-9]/g, '_')
                    .replace(/_+/g, '_')         
                    .replace(/^_|_$/g, '');    
                return formData[fieldName]; 
            })
            .map(role => role.id);
    
        const customizeData = {
            name: formData.name, 
            roles: selectedRoles
        };
    
        console.log("Formatted Payload:", customizeData);
        await createPermission.fetchData({data: customizeData});
    };

    useEffect(() => {
        if(createPermission.status === 201){
            toast.success(createPermission.data.message);
            reset();
        }
    }, [createPermission.loading])

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="w-full border p-5 rounded-md">
            <InputField
                label="Permission Name"
                className="text-black-default mb-4"
                placeholder="Permission Name"
                {...register("name", { required: true })}
                error={errors.name?.type === 'required' ? "Permission Name is required" : undefined}
            />
            {createPermission.error && <p className="bg-red-100 py-2.5 px-5 text-red-800 mt-2 mb-3 rounded-md font-normal" dangerouslySetInnerHTML={{ __html: createPermission.error }}></p>}
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
                {getRoles.loading ? <Loader /> : allRoles && allRoles.map((role) => {
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
                                checked={selectedRoles[fieldName] || false}  
                                onChange={(e) => setValue(fieldName, e.target.checked)}
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