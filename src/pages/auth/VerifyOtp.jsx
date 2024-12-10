import React, { useRef, useEffect} from "react";
import { useForm, Controller } from "react-hook-form";
import Button from "../../components/ui/Button";
import InputLink from "../../components/forms/InputLink";
import axios from "axios";
import useAxios from "../../hooks/UseAxios";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {

    const {userData, setUserData} = useContext(UserContext);
    const UserEmail = userData.userDetails.email;

    const { handleSubmit, control, setValue, watch } = useForm({
        defaultValues: {
            otp: Array(6).fill(""),
        },
    });

    const inputsRef = useRef([]);
    const otpValues = watch("otp");

    const handleInputChange = (value, index) => {
        if (/^\d$/.test(value)) {
            setValue(`otp.${index}`, value);
            if (index < inputsRef.current.length - 1) {
                inputsRef.current[index + 1].focus();
            }
        } else {
            setValue(`otp.${index}`, "");
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otpValues[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const {data, loading, error, status, fetchData} = useAxios('/forgot-password/verify-otp', 'post')

    const navigate = useNavigate();

    const onSubmit = async (formData) => {

        const otp = formData.otp.join("");

        const body = {
            email: UserEmail,
            otp: otp
        }
    
        await fetchData({ data: body });

        if(status === 200){
            const { reset_token } = data;

            setUserData((prev) => ({
                ...prev,
                token: reset_token,
            }));
    
            navigate('/reset-password');
        }
    };
    
    useEffect(() => {
        if (data) {
            const { reset_token } = data;
    
            setUserData((prev) => ({
                ...prev,
                token: reset_token,
            }));

            if(status === 200) {
                navigate('/reset-password');
            }
        }
    }, [data, setUserData, status, navigate]);

    const [counter, setCounter] = React.useState(30);

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);

    const ResendEmail = () => {
        axios.post(`${import.meta.env.VITE_BASE_API_URL}/forgot-password/send-otp`, { email: UserEmail })
        .then((res) => {
            if (res?.status === 200) {
                setCounter(30);
            }
        })
        .catch((err) => {
            console.error("Error resending OTP:", err);
        })
    };

    return (
        <section className="flex flex-wrap justify-center items-center h-screen py-10">
            <div className="mx-auto max-w-400 w-full">
                <div className="flex flex-wrap items-center justify-center mb-6">
                    <img src="/assets/images/logo-black.png" className="" alt="Logo" />
                </div>
                <div className="bg-white-default rounded-md shadow-1x">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="py-10 px-[30px] text-black-default text-center">
                            <h2 className="text-3xl text-center pb-[10px]">Verify OTP</h2>
                            <p className="text-center text-black-200 font-normal border-b border-black-400 pb-4">
                                Fill the OTP that we sent on your email.
                            </p>
                            <div className="flex flex-wrap gap-3 mt-6 justify-center">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <Controller
                                        key={index}
                                        name={`otp.${index}`}
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                ref={(el) => (inputsRef.current[index] = el)}
                                                className="border border-black-400 rounded-md text-base font-normal leading-5 p-2 w-10 h-9 text-center"
                                                type="text" 
                                                maxLength="1" 
                                                inputMode="numeric"
                                                value={field.value || ""}
                                                onChange={(e) => handleInputChange(e.target.value, index)}
                                                onKeyDown={(e) => handleKeyDown(e, index)}
                                            />
                                        )}
                                    />
                                ))}
                            </div>
                            <Button classname="mt-8" text={loading ? "Loading in..." : "Verify"} disabled={loading} />
                            {
                                counter === 0 ? (
                                    <p className="font-normal leading-5 text-center mt-[15px] text-black-200 flex items-center justify-center gap-x-2">
                                        Didn't Received OTP ? <span onClick={ResendEmail} className="text-parrotgreen-default cursor-pointer	 text-base leading-5 font-normal text-center inline-block">Resend</span>
                                    </p>
                                    
                                )
                                : (
                                    <p className="font-normal leading-5 text-center mt-[15px] text-black-200">
                                        Resend OTP in <span className="text-parrotgreen-default font-medium">{counter}</span>
                                    </p>
                                )
                            }
                            <div className="w-full text-center mt-2.5">
                                <InputLink text="Back to login" />
                            </div>
                            

                            {error && <p className="bg-red-100 py-2.5 px-5 text-red-800 mt-3 rounded-md font-normal">{error}</p>}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default VerifyOtp;