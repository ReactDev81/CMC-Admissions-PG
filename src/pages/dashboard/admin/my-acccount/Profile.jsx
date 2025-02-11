import { useState, useContext, useEffect, useRef  } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { UserContext } from "../../../../context/UserContext";
import useAxios from "../../../../hooks/UseAxios";
import InputField from "../../../../components/forms/Inputfield"
import Button from "../../../../components/ui/Button";


const Profile = () => {

    const { userData } = useContext(UserContext);
    const getUserDetails = useAxios(`/users/${userData.userDetails.id}`, 'get', { headers: { Authorization: `Bearer ${userData.token}` } })
    const updateUserDetails = useAxios('/profile', 'post', { headers: { Authorization: `Bearer ${userData.token}` } })

    useEffect(() => {
        getUserDetails.fetchData();
    }, [updateUserDetails.status])

    const {register, handleSubmit, setError, clearErrors, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: userData?.userDetails.name || "", 
            email: userData?.userDetails.email || "",
            role: userData?.role || "",
        }
    });

    const [image, setImage] = useState("/assets/avatars/user.png");
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (getUserDetails?.data?.profile_pic_url) {
            setImage(getUserDetails.data.profile_pic_url);
        }
    }, [getUserDetails.data]); 

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            setImageFile(file);
            clearErrors("image");
    
            // Reset the input value to allow re-uploading the same image
            e.target.value = "";
        }
    };

    // Handle Image Remove
    const handleImageRemove = () => {
        setImage(getUserDetails?.data?.profile_pic_url || "/assets/avatars/user.png");
        setImageFile(null);

        // Reset the file input
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // Form Submission
    const onSubmit = (formData) => {
        if (!imageFile && image === "/assets/avatars/user.png") {
            setError("image", {
                type: "manual",
                message: "Image is required",
            });
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        if (imageFile) {
            formDataToSend.append("image", imageFile);
        }

        updateUserDetails.fetchData({
            data: formDataToSend,
            headers: {
                Authorization: `Bearer ${userData.token}`,
                "Content-Type": "multipart/form-data",
            },
        });

        console.log("Form submitted", formDataToSend);
    };

    useEffect(() => {
        if(updateUserDetails.status === 200){
            toast.success(updateUserDetails.data.message);
            reset();
            setImage(getUserDetails?.data?.profile_pic_url || "/assets/avatars/user.png");
            setImageFile(null);
        }
    }, [updateUserDetails.loading])

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
                        ref={fileInputRef}
                        className="hidden"
                        id="myprofile"
                        {...register("image")}
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