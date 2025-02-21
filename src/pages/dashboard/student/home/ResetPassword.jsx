import { useState, useEffect, useRef} from "react";
import InputField from "../../../../components/forms/Inputfield";
import Button from "../../../../components/ui/Button";
import { AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai";
import { useForm } from "react-hook-form";
import useAxios from "../../../../hooks/UseAxios";
import { UserContext } from "../../../../context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { userData, setUserData } = useContext(UserContext);
    const BEARER_TOKEN = userData.token;
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const new_password = useRef({});
    new_password.current = watch("new_password", "");

    const { data, loading, error, status, fetchData } = useAxios('/change-password', 'post', {headers: { Authorization: `Bearer ${BEARER_TOKEN}`}});
    const navigate = useNavigate();

    const onSubmit = async (formData) => {
        const body = {
            new_password: formData.new_password,
            new_password_confirmation: formData.new_password_confirmation
        }
        await fetchData({ data: body });
    };

    useEffect(() => {
        if(status === 200) {
            const { token, user: { role, permissions_list: permissions, id, name, email, password_changed, profile_pic_url, application_status} } = data;
            const userDetails = { id, name, email, password_changed, profile_pic_url, application_status};
            setUserData({ token, role, permissions, userDetails});
            navigate('/student/application-form');
        }
    }, [data, status])

    

    return(
        <section className="flex flex-wrap justify-center items-center h-screen py-10">
            <div className="mx-auto max-w-400 w-full">
                <div className="bg-white-default rounded-md shadow-1x">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="py-10 px-[30px] text-black-default">
                            <h2 className="text-3xl text-center border-b border-black-400 pb-6">Reset password</h2>
                            
                            <div className="relative mt-6">
                                <InputField
                                    label="New Password"
                                    placeholder={"Enter New Password"}
                                    type={showNewPassword ? "text" : "password"}
                                    {...register('new_password', {required: true, minLength: 8})} 
                                    error={errors.new_password?.type === "required" ? "Password is required" : errors.new_password?.type === 'minLength' ? "Password must be at least 8 characters" : undefined}
                                />
                                <span className="absolute top-[46px] right-5 cursor-pointer" onClick={() => setShowNewPassword(!showNewPassword)}>
                                    {showNewPassword ? <AiOutlineEye color="#4D4D4D" size={20}  /> : <AiOutlineEyeInvisible color="#4D4D4D" size={20} />}
                                </span>
                            </div>
                            
                            <div className="relative mt-4">
                                <InputField
                                    label="Confirm Password"
                                    placeholder={"Enter New Password"}
                                    type={showConfirmPassword ? "text" : "password"}
                                    {...register('new_password_confirmation', {required: true, validate: (value) => value === new_password.current || "Passwords do not match"})}
                                    error={errors.new_password_confirmation?.type === "required" ? "Confirm Password is required" : errors.new_password_confirmation?.message} 
                                />
                                <span className="absolute top-[46px] right-5 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <AiOutlineEye color="#4D4D4D" size={20}  /> : <AiOutlineEyeInvisible color="#4D4D4D" size={20} />}
                                </span>
                            </div>
                            <Button classname="mt-8 w-full" text={loading ? 'Loading in...' : 'Reset Password'} disabled={loading} />
                            {error && <p className="bg-red-100 py-2.5 px-5 text-red-800 mt-3 rounded-md font-normal">{error}</p>}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ResetPassword;