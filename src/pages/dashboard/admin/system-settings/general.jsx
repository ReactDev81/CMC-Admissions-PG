import React, { useState, useRef, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { RxCross2 } from "react-icons/rx";
import { UserContext } from "../../../../context/UserContext";
import UseAxios from "../../../../hooks/UseAxios";
import InputField from "../../../../components/forms/Inputfield";
import Button from "../../../../components/ui/Button";

const General = ({ data }) => {

    const { userData } = useContext(UserContext);
    const sendGeneralData = UseAxios('/settings/general', 'post', { headers: { Authorization: `Bearer ${userData.token}` } })

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [logoPreview, setLogoPreview] = useState();
    const [faviconPreview, setFaviconPreview] = useState();

    useEffect(() => {
        if (data) {
            setLogoPreview(data.find((field) => field.key === "logo")?.value || null);
            setFaviconPreview(data.find((field) => field.key === "favicon")?.value || null);
        }
    }, [data])

    const logoInputRef = useRef(null);
    const faviconInputRef = useRef(null);

    const handleFileChange = (event, setPreview) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogoChange = (event) => handleFileChange(event, setLogoPreview);
    const handleFaviconChange = (event) => handleFileChange(event, setFaviconPreview);

    const removeLogo = () => {
        setLogoPreview(null);
        if (logoInputRef.current) logoInputRef.current.value = "";
    };

    const removeFavicon = () => {
        setFaviconPreview(null);
        if (faviconInputRef.current) faviconInputRef.current.value = "";
    };

    const onSubmit = (formData) => {
        const formDataObj = new FormData();

        // Append text inputs
        data.forEach((field) => {
            if (field.type === "text") {
                formDataObj.append(field.key, formData[field.key]);
            }
        });

        // Append file inputs
        if (logoInputRef.current?.files[0]) {
            formDataObj.append("logo", logoInputRef.current.files[0]);
        }
        if (faviconInputRef.current?.files[0]) {
            formDataObj.append("favicon", faviconInputRef.current.files[0]);
        }

        console.log("Submitting form:", Object.fromEntries(formDataObj.entries()));

        const sendData = async() =>{
            await sendGeneralData.fetchData({ data: formDataObj });
        }
        sendData();
    };

    useEffect(() => {
        if (sendGeneralData.status === 200) {
            toast.success(sendGeneralData.data.message);
        }
    }, [sendGeneralData.loading])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="border rounded-md">
                <div className="p-5 border-b">
                    <h2 className="text-black-default mb-2.5">
                        General and basic info settings
                    </h2>
                    <p className="text-black-300 font-normal">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit dui, mi
                        facilisis malesuada leo sem dictum turpis cursus varius.
                    </p>
                </div>

                <div className="flex">
                    <div className="p-5 flex flex-col basis-1/2">
                        {data.map((field) => {
                            if (field.type === "file") {
                                const isLogo = field.key === "logo";
                                const preview = isLogo ? logoPreview : faviconPreview;
                                const handleChange = isLogo ? handleLogoChange : handleFaviconChange;
                                const removeFile = isLogo ? removeLogo : removeFavicon;
                                const inputRef = isLogo ? logoInputRef : faviconInputRef;

                                return (
                                    <div className="mb-5" key={field.id}>
                                        <label className="mb-2">{field.description}</label>
                                        <div className="relative">
                                        {preview ? 
                                            <div className="bg-black-200 flex items-center justify-center h-64 rounded-md">
                                                <img
                                                    src={preview}
                                                    alt={field.description}
                                                    className="object-contain z-10 max-w-56"
                                                />
                                                {preview && (
                                                    <button
                                                        onClick={removeFile}
                                                        type="button"
                                                        className="absolute top-4 right-4 p-1 bg-white-default rounded-full shadow-md z-10"
                                                    >
                                                        <RxCross2 className="w-4 h-4 text-gray-600" />
                                                    </button>
                                                )}
                                            </div>
                                        :
                                            <label
                                                htmlFor={field.key}
                                                className="flex flex-col items-center justify-center h-64 border-dashed border-2 border-primary-200 rounded-md p-5 cursor-pointer"
                                            >
                                                <div className="w-full flex items-center justify-center">
                                                    <p className="text-xl text-black-300 underline cursor-pointer">
                                                        Upload Image
                                                    </p>
                                                </div>
                                                <input
                                                    type="file"
                                                    id={field.key}
                                                    ref={inputRef}
                                                    className="hidden"
                                                    onChange={handleChange}
                                                    accept="image/*"
                                                />
                                            </label>
                                        }
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>

                    <div className="p-5 basis-1/2">
                        {data.map((field) =>
                            field.type === "text" && (
                                <InputField
                                    key={field.id}
                                    className="text-black-default mb-5"
                                    label={field.description}
                                    type="text"
                                    defaultValue={field.value}
                                    {...register(field.key, { required: true })}
                                    error={errors[field.key]?.type === "required"? `${field.description} is required`: undefined}
                                />
                            )
                        )}
                    </div>
                </div>
            </div>

            {sendGeneralData.error && <p className="bg-red-100 py-2.5 px-5 text-red-800 mt-2 rounded-md font-normal" dangerouslySetInnerHTML={{ __html: sendGeneralData.error }}></p>}

            <div className="flex gap-2.5 items-center justify-end mt-6 -mx-5 p-5 pb-0 border-t">
                <Button
                    text="Save Changes"
                    className="px-8 py-2.5 [&]:rounded-full border-0"
                />
            </div>
        </form>
    );
};

export default General;