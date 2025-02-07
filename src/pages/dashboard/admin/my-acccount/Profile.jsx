import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../../../context/UserContext";
import useAxios from "../../../../hooks/UseAxios";
import InputField from "../../../../components/forms/Inputfield"
import Button from "../../../../components/ui/Button";


const Profile = () => {

    const defaultImage = "/assets/avatars/user.png";
    const { userData } = useContext(UserContext);

    const getUserDetails = useAxios(`/users/${userData.userDetails.id}`, 'get', { headers: { Authorization: `Bearer ${userData.token}` } })

    useEffect(() => {
        getUserDetails.fetchData();
    }, [])

    console.log('data', getUserDetails.data);

    const {register, handleSubmit, setError, clearErrors, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: userData?.userDetails.name || "", 
            email: userData?.userDetails.email || "",
            role: userData?.role || "",
        }
    });

    const [image, setImage] = useState(defaultImage);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file)); 
            clearErrors("image"); 
        }
    };

    const handleImageRemove = () => {
        setImage(defaultImage);
    };

    const onSubmit = (data) => {
        if (image === defaultImage) {
            setError("image", {
                type: "manual",
                message: "Image is required",
            });
            return;
        }

        console.log("Form submitted", data);
        reset();
        setImage(defaultImage);
    };

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-[520px] w-full rounded-md bg-white-default shadow-flex p-5">
            <h1 className="text-2xl text-black-default mb-6">My Profile</h1>
            <div className="flex items-center gap-5 mb-6">
                <div className="size-[100px] rounded-full">
                    <img
                        src={image}
                        alt="My Profile Image"
                        className="w-full h-full object-cover rounded-full relative"
                    />
                    <input
                        type="file"
                        className="hidden"
                        id="myprofile"
                        {...register("image", {
                            required: { value: true, message: "Image is Required" },
                        })}
                        onChange={handleImageChange}
                    />
                    {errors.image && (<p className="text-red-700 text-sm font-semibold w-96 mt-1">{errors.image.message}</p>)}
                </div>
                <div className="flex gap-2.5">
                    <label
                        htmlFor="myprofile"
                        className="capitalize text-base font-medium leading-5 border rounded-full px-5 py-1.5 border-primary-default text-primary-default cursor-pointer"
                    >
                        Change
                    </label>
                    <Button
                        type="button"
                        text="Remove"
                        classname="[&]:px-5 [&]:py-1.5 [&]:text-black-300 [&]:rounded-full border-none [&]:bg-primary-100"
                        onclick={handleImageRemove}
                    />
                </div>
            </div>
            <div className="mb-2.5">
                <InputField
                    label="Full Name"
                    className="text-black-default"
                    {...register("name", {
                    required: { value: true, message: "Name is Required" },
                    minLength: {
                        value: 3,
                        message: "Name must be at least 3 characters",
                    },
                    })}
                />
                {errors.name && (<p className="text-sm text-red-700 font-semibold">{errors.name.message}</p>)}
            </div>
            <div className="mb-2.5">
                <InputField
                    label="Email"
                    className="text-black-default"
                    disabled
                    {...register("email")}
                />
            </div>
            <div className="mb-5">
                <InputField
                    label="Role"
                    className="text-black-default"
                    disabled
                    {...register("role")}
                />
            </div>
            <div className="text-right">
                <Button
                    text="Update"
                    classname="[&]:px-12 [&]:py-2.5 [&]:rounded-full"
                />
            </div>
        </form>
    )
}

export default Profile;