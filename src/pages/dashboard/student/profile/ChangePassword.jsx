import InputField from "../../../../components/forms/Inputfield";
import Button from "../../../../components/ui/Button";
import { useForm } from "react-hook-form";
import { useState, useRef} from "react";
import { AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai";

const ChangePassword = () => {

    const [showCurrentPassword, setCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = (data) => {
        console.log(data);
    }

    const handleCancel = () => {
        reset();
    };

    return(
        <div className="max-w-[452px] w-full bg-white-default rounded-md">
            <div className="p-5 flex flex-col self-center">
                <div>
                    <h2 className="mb-3 text-black-default text-3xl leading-5 font-medium">
                        Change Password
                    </h2>
                    <p className="text-black-default font-normal leading-5">
                        Here you can change the password of your account.
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="relative mt-6">
                        <InputField
                            label="Current Password"
                            placeholder="Enter Current Password"
                            id="CurrentPassword"
                            type={showCurrentPassword ? "text" : "password"}
                            {...register('current_password', {required: true})} 
                            error={errors.current_password?.type === "required" ? "Current Password is required" : undefined}
                        />
                        <span className="absolute top-[46px] right-5 cursor-pointer" onClick={() => setCurrentPassword(!showCurrentPassword)}>
                            {showCurrentPassword ? <AiOutlineEye color="#4D4D4D" size={20}  /> : <AiOutlineEyeInvisible color="#4D4D4D" size={20} />}
                        </span>
                    </div>
                    <div className="relative mt-4">
                        <InputField
                            label="New Password"
                            placeholder="New Password"
                            id="New Password"
                            type={showNewPassword ? "text" : "password"}
                            {...register('password', {required: true, minLength: 8})} 
                            error={errors.password?.type === "required" ? "New Password is required" : errors.password?.type === 'minLength' ? "New Password must be at least 8 characters" : undefined}
                        />
                        <span className="absolute top-[46px] right-5 cursor-pointer" onClick={() => setShowNewPassword(!showNewPassword)}>
                            {showNewPassword ? <AiOutlineEye color="#4D4D4D" size={20}  /> : <AiOutlineEyeInvisible color="#4D4D4D" size={20} />}
                        </span>
                    </div>
                    <div className="relative mt-4">
                        <InputField
                            label="Confirm Password"
                            placeholder="Confirm Password"
                            id="Confirm Password"
                            type={showConfirmPassword ? "text" : "password"} 
                            {...register('password_confirmation', {required: true, validate: (value) => value === password.current || "Passwords do not match"})}
                            error={errors.password_confirmation?.type === "required" ? "Confirm Password is required" : errors.password_confirmation?.message}
                        />
                        <span className="absolute top-[46px] right-5 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <AiOutlineEye color="#4D4D4D" size={20}  /> : <AiOutlineEyeInvisible color="#4D4D4D" size={20} />}
                        </span>
                    </div>
                    <div className="flex gap-2.5 items-center justify-end mt-6">
                        <Button 
                            text="Cancel" 
                            classname="px-8 py-2.5 [&]:text-black-300 [&]:rounded-full [&]:bg-primary-200 border-0"
                            type="button"
                            onclick={handleCancel}
                        />
                        <Button 
                            text="Update Password" 
                            classname="px-8 py-2.5 [&]:rounded-full border-0"
                            type="submit" 
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword;