import { useState, useRef, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import UseAxios from "../../../../hooks/UseAxios";
import { AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai";
import { UserContext } from "../../../../context/UserContext";
import InputField from "../../../../components/forms/Inputfield";
import Button from "../../../../components/ui/Button";

const ChangePassword = () => {

  const [showCurrentPassword, setCurrentPassword] = useState(false);
  const [showNewPassword, setNewPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);

  const { userData } = useContext(UserContext);
  const { data, loading, status, error, fetchData } = UseAxios("/update-password", "post", {headers: { Authorization: `Bearer ${userData.token}` },});

  const {register, handleSubmit, reset, watch, formState: { errors }} = useForm();
  const password = useRef({});
  password.current = watch("new_password", "");

  const onSubmit = async (formData) => {
    fetchData({data: formData});
  };

  useEffect(() => {
    if(status === 200) {
      toast.success(data.message);
      reset();
    }
  }, [loading])

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-[520px] w-full rounded-md bg-white-default shadow-flex p-5">
        <div className="flex flex-col mb-7">
          <h1 className="text-2xl text-black-default mb-3">Change Password</h1>
          <p className="text-base font-normal text-black-default">
            Here you can change the password to your account.
          </p>

          <div className="relative mt-6">
            <InputField
                label="Current Password"
                placeholder={"Enter Current Password"}
                type={showCurrentPassword ? "text" : "password"}
                {...register('current_password', { required: true, minLength: 8 })} 
                error={errors.current_password?.type === "required" ? "Current Password is required" : errors.current_password?.type === 'minLength' ? "Current Password must be at least 8 characters" : undefined}
            />
            <span className="absolute top-[46px] right-5 cursor-pointer" onClick={() => setCurrentPassword(!showCurrentPassword)}>
                {showCurrentPassword ? <AiOutlineEye color="#4D4D4D" size={20}  /> : <AiOutlineEyeInvisible color="#4D4D4D" size={20} />}
            </span>
          </div>

          <div className="relative mt-6">
            <InputField
                label="New Password"
                placeholder={"Enter New Password"}
                type={showNewPassword ? "text" : "password"}
                {...register('new_password', {required: true, minLength: 8})} 
                error={errors.new_password?.type === "required" ? "Password is required" : errors.new_password?.type === 'minLength' ? "Password must be at least 8 characters" : undefined}
            />
            <span className="absolute top-[46px] right-5 cursor-pointer" onClick={() => setNewPassword(!showNewPassword)}>
                {showNewPassword ? <AiOutlineEye color="#4D4D4D" size={20}  /> : <AiOutlineEyeInvisible color="#4D4D4D" size={20} />}
            </span>
          </div>

          <div className="relative mt-4">
            <InputField
                label="Confirm Password"
                placeholder={"Enter New Password"}
                type={showConfirmPassword ? "text" : "password"}
                {...register('new_password_confirmation', {required: true, validate: (value) => value === password.current || "Passwords do not match"})}
                error={errors.new_password_confirmation?.type === "required" ? "Confirm Password is required" : errors.new_password_confirmation?.message} 
            />
            <span className="absolute top-[46px] right-5 cursor-pointer" onClick={() => setConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <AiOutlineEye color="#4D4D4D" size={20}  /> : <AiOutlineEyeInvisible color="#4D4D4D" size={20} />}
            </span>
          </div>
          {error && <p className="bg-red-100 py-2.5 px-5 text-red-800 mt-2 rounded-md font-normal" dangerouslySetInnerHTML={{ __html: error }}></p>}
        </div>

        <div className="text-right">
          <Button
            text="Change"
            classname="[&]:px-12 [&]:py-2.5 [&]:rounded-full"
          />
        </div>
      </form>
  );
};

export default ChangePassword;
