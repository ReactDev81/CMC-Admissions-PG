import { useContext, useEffect, useState, useRef } from "react";
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai";
import Button from "../../../../../components/ui/Button";
import InputField from "../../../../../components/forms/Inputfield";
import SelectField from "../../../../../components/forms/SelectField";
import ToggleButton from "../../../../../components/forms/ToggleButton";
import { UserContext } from "../../../../../context/UserContext";
import useAxios from "../../../../../hooks/UseAxios";
import Checkbox from "../../../../../components/forms/Checkbox";

const EditUser = ({ data, onClose }) => {

    const defaultImage = "/assets/avatars/user.png";
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isEnabled, setEnabled] = useState(false);
    const [image, setImage] = useState(defaultImage);
    const [selectedImage, setSelectedImage] = useState(null);

    const { register, handleSubmit, watch, control, reset, clearErrors, formState: { errors } } = useForm({
        defaultValues: {
            roles: "",
        },
    });

    const password = useRef({});
    password.current = watch("password", "");  

    const roles = [
        { value: "", label: "Select a Role" },
        { value: "admin", label: "Admin" },
        { value: "super-admin", label: "Super Admin" },
        { value: "student", label: "Student" },
        { value: "manager", label: "Manager" },
    ];

    const { userData } = useContext(UserContext);
    const { error, status, loading, fetchData } = useAxios(`/users/${data.id}`, "put", 
        { 
            headers: { 
                Authorization: `Bearer ${userData.token}`,
                "Content-Type": "multipart/form-data" 
            }
        }
    );

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file); 
            setImage(URL.createObjectURL(file)); 
            clearErrors("avatar"); 
        }
    };
    
    
    const handleImageRemove = () => {
        setImage(defaultImage);
    };

    // Prefill form with fetched data
    useEffect(() => {
        reset({
            name: data.name || "",
            email: data.email || "",
            roles: data.role || "",
            status: data.status && setEnabled(data.status) || "",
        });

        // Set existing user image if available
        if (data.avatar) {
            setSelectedImage(data.avatar);
        }

    }, [reset, data]);


    const onSubmit = async (formData) => {
        const payload = {
            ...formData,
            status: isEnabled,
            roles: [formData.roles],
            profile_pic: selectedImage,
            force_reset_password: formData.force_reset_password === true ? 0 : 1
        };
    
        // Remove password and confirm password fields if they are empty
        if (!formData.password) {
            delete payload.password;
            delete payload.password_confirmation;
        }

        console.log(payload);
    
        await fetchData({ data: payload });
    };

    useEffect(() => {
        if(status === 200){
            onClose(false);
            toast.success(data.message);
        }
    }, [loading])

    return (
    <div className="max-w-[670px] w-full bg-white-default rounded-md shadow-flex h-[-webkit-fill-available] overflow-y-scroll">
        <div className="grid grid-cols-1 gap-7 text-black-default">
            <div className="flex items-center justify-between pt-7 pb-5 px-5 border-b">
                <h2 className="text-black-default text-xl font-bold">Edit User</h2>
                <RxCross2 onClick={onClose} className="text-black-default size-5 cursor-pointer" />
            </div>
        </div>
        
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-7 px-5 py-4 text-black-default"
        >
            <div className="flex items-center gap-4">
                <div className="size-[73px]">
                    <img
                        src={image}
                        alt="User Avatar"
                        className="h-full w-full rounded-full object-cover object-center"
                    />
                    <input
                        id="profile_pic"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        {...register("profile_pic")}
                        onChange={handleImageChange}
                    />
                </div>
                <div className="flex items-center gap-2.5">
                    <label
                        htmlFor="profile_pic"
                        className="capitalize text-base font-medium leading-5 border rounded-full px-5 py-1.5 border-primary-default text-primary-default cursor-pointer"
                    >
                        Change
                    </label>
                    <Button
                        onclick={handleImageRemove}
                        text="Remove"
                        type="button"
                        classname="pt-1 pb-1.5 px-5 [&]:rounded-full border-0 [&]:text-black-300 [&]:bg-primary-100"
                    />
                </div>
            </div>

            <InputField 
                label="Full Name" 
                error={errors.name?.type === 'required' ? "Name is required" : undefined}
                {...register("name", { required: true })}
            />
            <InputField
                label="Email"
                type="email" 
                error={errors.email?.type === 'required' ? "Email is required" : errors.email?.type === 'pattern' ? "Email is not correct" : undefined}
                {...register("email", { required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })}
            />
            
            <SelectField
                name="roles"
                control={control}
                label="Role"
                options={roles}
            />

            <div className="relative">
                <InputField
                    label="New Password"
                    type={showNewPassword ? "text" : "password"}
                    {...register('password', {minLength: 8})} 
                    error={errors.password?.type === 'minLength' ? "Password must be at least 8 characters" : undefined}
                />
                <span className="absolute top-[46px] right-5 cursor-pointer" onClick={() => setShowNewPassword(!showNewPassword)}>
                    {showNewPassword ? <AiOutlineEye color="#4D4D4D" size={20}  /> : <AiOutlineEyeInvisible color="#4D4D4D" size={20} />}
                </span>
            </div>

            <div className="relative">
                <InputField
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    {...register('password_confirmation', {validate: (value) => value === password.current || "Passwords do not match"})}
                    error={errors.password_confirmation?.message} 
                />
                <span className="absolute top-[46px] right-5 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <AiOutlineEye color="#4D4D4D" size={20}  /> : <AiOutlineEyeInvisible color="#4D4D4D" size={20} />}
                </span>
            </div>

            <div className="flex items-center gap-2.5">
                <span className="text-black-300 font-medium text-lg">Status</span>
                <ToggleButton 
                    id="status"
                    value={isEnabled}
                    onChange={(newValue) => setEnabled(newValue)}
                    disabled={false} 
                />
            </div>

            <div>
                <Checkbox
                    label="Force user to reset password"
                    id="force_reset_password"
                    fieldName="force_reset_password"
                    register={register}
                />
                <p className="ml-6 text-black-200">( if this field is checked, then user will be forced to reset password after login )</p>
            </div>

            <div className="flex items-center gap-2.5 justify-end border-t pt-4">
                <Button
                    onclick={() => onClose(false)}
                    text="Cancel"
                    type="button"
                    classname="py-2.5 px-8 [&]:rounded-full border-0 [&]:text-black-300 [&]:bg-primary-100"
                />
                <Button type="submit" text="Update User" classname="py-2.5 px-8 [&]:rounded-full" />
            </div>

            {error && <p className="bg-red-100 py-2.5 px-5 text-red-800 mt-2 rounded-md font-normal" dangerouslySetInnerHTML={{ __html: error }}></p>}

        </form>

    </div>
    );
};

export default EditUser;