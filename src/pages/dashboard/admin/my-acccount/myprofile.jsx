import InputField from "../../../../components/forms/Inputfield";
import Button from "../../../../components/ui/Button";
import { useForm } from "react-hook-form";
import React, { useState } from "react";

const MyProfile = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [image, setImage] = useState("/assets/avatars/user.png");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(e);
    console.log(file);
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };


  const handleImageRemove = () => {
    setImage("/assets/avatars/user.png");
  };

  const onSubmit = (data) => {
  //   const formData = new FormData();
  // formData.append("myprofile", data.myprofile[0]); // Access the file object
  // console.log("Form submitted", formData);
    // reset();
    console.log(data.myprofile[0]);
  };

  return (
    <div>
      <form
        className="max-w-[520px] w-full rounded-md bg-white-default shadow-flex p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
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
              // onChange={(e) => {handleImageChange(e)}}
              onChange={(e) => (console.log(e.target.value))}
              {...register("myprofile")}
            />
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
          {errors.name && (
            <p className="text-sm text-red-700 font-semibold">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="mb-2.5">
          <InputField
            label="Email"
            className="text-black-default"
            {...register("email", {
              required: { value: true, message: "Email is Required" },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-sm text-red-700 font-semibold">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="mb-5">
          <InputField
            label="Role"
            className="text-black-default"
            {...register("role", {
              required: { value: true, message: "Role is Required" },
            })}
          />
          {errors.role && (
            <p className="text-sm text-red-700 font-semibold">
              {errors.role.message}
            </p>
          )}
        </div>

        <div className="text-right">
          <Button
            text="Update"
            classname="[&]:px-12 [&]:py-2.5 [&]:rounded-full"
          />
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
