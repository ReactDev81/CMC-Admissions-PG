import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useState, useContext, useEffect } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai";
import { UserContext } from "../../context/UserContext";
import useAxios from '../../hooks/UseAxios';
import InputField from '../../components/forms/Inputfield';
import Button from "../../components/ui/Button";
import InputLink from "../../components/forms/InputLink";

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {setUserData} = useContext(UserContext);
    
    const navigate = useNavigate();
    const { data, loading, error, fetchData } = useAxios('/login', 'post');

    const onSubmit = async (formData) => {
        await fetchData({ data: formData });
    };

    useEffect(() => {
        if (data) {
            const { token, user: { role, permissions_list: permissions, id, name, email} } = data;
            const userDetails = { id, name, email };
            setUserData({ token, role, permissions, userDetails});
            navigate('/');
        }
    }, [data, setUserData, navigate]);

    return(
        <section className="flex flex-wrap justify-center items-center h-screen py-10">
            <div className="mx-auto max-w-400 w-full">
                <div className="flex flex-wrap items-center justify-center mb-6">
                    <img
                        src="/assets/images/logo-black.png"
                        className="object-contain object-center"
                        alt="Logo"
                    />
                </div>
                <div className="bg-white-default rounded-md shadow-1x">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="py-10 px-[30px] text-black-default">
                            <h2 className="text-3xl text-center border-b border-black-400 pb-6">Sign in</h2>

                            <InputField
                                className="mt-6"
                                label="Email Address"
                                placeholder="Enter Your Email"
                                type="email" 
                                error={errors.email?.type === 'required' ? "Email is required" : errors.email?.type === 'pattern' ? "Email is not correct" : undefined}
                                {...register("email", { required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })}
                            />

                            <div className="relative mt-4">
                                <InputField
                                    label="Password"
                                    placeholder="Enter Password"
                                    type={showPassword ? "text" : "password"} 
                                    error={errors.password?.type === 'required' ? "Password is required" : errors.password?.type === 'minLength' ? "Password must be at least 8 characters" : undefined}
                                    {...register("password", { required: true, minLength: 8 })}
                                />
                                <span className="absolute top-[46px] right-5 cursor-pointer" onClick={() => (setShowPassword(!showPassword))}>
                                    {showPassword ? <AiOutlineEye color="#4D4D4D" size={20}  /> : <AiOutlineEyeInvisible color="#4D4D4D" size={20} />}
                                </span>
                            </div>

                            <Button classname="mt-8 w-full" text={loading ? "Loading in..." : "Submit"} disabled={loading} />
                            <div className="w-full text-center mt-2.5">
                                <InputLink href="/forget-password" text="Forget Password?" />
                            </div>
                            {error && <p className="bg-red-100 py-2.5 px-5 text-red-800 mt-3 rounded-md font-normal">{error}</p>}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login;