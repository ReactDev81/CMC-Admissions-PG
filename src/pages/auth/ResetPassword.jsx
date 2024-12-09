import { useState, useEffect} from "react";
import InputField from "../../components/forms/inputfield";
import Button from "../../components/ui/Button";
import { AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai";
import { useForm } from "react-hook-form";
import useAxios from "../../hooks/UseAxios";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { userData } = useContext(UserContext);
    const BEARER_TOKEN = userData.token;

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { data, loading, error, status, fetchData } = useAxios('/forgot-password/reset', 'post');

    console.log(data)

    const navigate = useNavigate();

    const onSubmit = async (formData) => {

        const body = {
            token: BEARER_TOKEN,
            password: formData.password,
            password_confirmation: formData.password_confirmation
        }

        await fetchData({ data: body });
    };

    useEffect(() => {
        if(status === 200) {
            navigate('/login');
        }
    }, [status])

    return (
        <section className="flex flex-wrap justify-center items-center h-screen py-10">
            <div className="mx-auto max-w-400 w-full">
                <div className="flex flex-wrap items-center justify-center mb-6">
                    <img src="../src/assets/images/logo-black.png" alt="Logo" />
                </div>
                <div className="bg-white-default rounded-md shadow-1x">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="py-10 px-[30px] text-black-default">
                            <h2 className="text-3xl text-center border-b border-black-400 pb-6">Reset password</h2>
                            
                            <div className="relative">
                                <InputField
                                    label="New Password"
                                    placeholder={"Enter New Password"}
                                    type={showNewPassword ? "text" : "password"}
                                    {...register('password', {required: true, minLength: 8})} 
                                    error={errors.password?.type === "required" ? "Password is required" : errors.password?.type === 'minLength' ? "Password must be at least 8 characters" : undefined}
                                />
                                <span className="absolute top-[46px] right-5 cursor-pointer" onClick={() => setShowNewPassword(!showNewPassword)}>
                                    {showNewPassword ? <AiOutlineEye color="#4D4D4D" size={20}  /> : <AiOutlineEyeInvisible color="#4D4D4D" size={20} />}
                                </span>
                            </div>
                            
                            <div className="relative">
                                <InputField
                                    label="Confirm Password"
                                    placeholder={"Enter New Password"}
                                    type={showConfirmPassword ? "text" : "password"} 
                                    {...register('password_confirmation', {required: true, minLength: 8})}
                                    error={errors.password_confirmation?.type === "required" ? "Password is required" : errors.password_confirmation?.type === "minLength" ? "Password must be at least 8 characters" : undefined}
                                />
                                <span className="absolute top-[46px] right-5 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <AiOutlineEye color="#4D4D4D" size={20}  /> : <AiOutlineEyeInvisible color="#4D4D4D" size={20} />}
                                </span>
                            </div>
                            <Button classname="mt-8" text={loading ? 'Loading in...' : 'Reset Password'} disabled={loading} />
                            {error && <p className="bg-red-100 py-2.5 px-5 text-red-800 mt-3 rounded-md font-normal">{error}</p>}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ResetPassword;