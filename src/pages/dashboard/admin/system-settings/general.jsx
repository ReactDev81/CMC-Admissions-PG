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
    const sendGeneralData = UseAxios('/settings/general', 'post', 
        { 
            headers: { 
                Authorization: `Bearer ${userData.token}` 
            }
        }
    )

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [logo, setLogo] = useState();
    const [favicon, setFavicon] = useState();
    const [logoFile, setLogoFile] = useState(null);
    const [faviconFile, setFaviconFile] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (data) {
            setLogo(data.find((field) => field.key === "logo")?.value || null);
            setFavicon(data.find((field) => field.key === "favicon")?.value || null);
        }
    }, [data])

    const handleImageChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            
            if (type === "logo") {
                setLogo(imageUrl);
                setLogoFile(file);
            } else {
                setFavicon(imageUrl);
                setFaviconFile(file);
            }
        }
    };
    
    

    const handleImageRemove = (type) => {
        if (type === "logo") {
            setLogo(null);
            setLogoFile(null);
        } else {
            setFavicon(null);
            setFaviconFile(null);
        }
    
        // Create a new file input reference to allow re-upload
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const onSubmit = (formData) => {

        if (!faviconFile && !favicon) {
            toast.error("Favicon is required.");
            return;
        }
        
        if (!logoFile && !logo) {
            toast.error("Logo is required.");
            return;
        }
    
        // Create FormData object
        const formDataToSend = new FormData();
        formDataToSend.append("site_title", formData.site_title);
        formDataToSend.append("site_tagline", formData.site_tagline);
    
        // Append files only if they exist
        if (logoFile) formDataToSend.append("logo", logoFile);
        if (faviconFile) formDataToSend.append("favicon", faviconFile);
    
        sendGeneralData.fetchData({
            data: formDataToSend,
        });
    
        console.log("Form submitted", formDataToSend);
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
                                const fieldName = field.key === "logo" ? "logo" : "favicon";
                                const preview = isLogo ? logo : favicon;
                                return (
                                    <div className="mb-5" key={field.id}>
                                        <label className="mb-2">{field.description}</label>
                                        <div className="relative">
                                            {preview ? 
                                                <div className="bg-black-200 flex items-center justify-center h-64 rounded-md">
                                                    <img
                                                        src={preview}
                                                        alt={field.description}
                                                        className="object-contain z-[5] max-w-56"
                                                    />
                                                    {preview && (
                                                        <button
                                                            onClick={() => handleImageRemove(fieldName)}
                                                            type="button"
                                                            className="absolute top-4 right-4 p-1 bg-white-default rounded-full shadow-md z-[5]"
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
                                                        className="hidden"
                                                        onChange={(e) => handleImageChange(e, fieldName)}
                                                        accept="image/*"
                                                    />
                                                </label>
                                            }
                                            {errors.image && (<p className="text-red-700 text-sm font-semibold w-96 mt-1">{errors.image.message}</p>)}
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