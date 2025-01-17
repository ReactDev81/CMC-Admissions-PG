import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import useAxios from "../../../../hooks/UseAxios";
import { UserContext } from "../../../../context/UserContext";
import { RxCross2 } from "react-icons/rx";
import FileFeild from "../../../../components/forms/FileFeild";
import Button from "../../../../components/ui/Button";
import { toast } from 'react-toastify';


const UploadDocumentPopup = ({onClose, fieldlabel, fieldName, onSuccess}) => {

    const { id } = useParams();
    const { userData } = useContext(UserContext);
    const Token = userData.token;

    const validateFile = (file) => {
        if (!file) return true;
        
        const validMimeTypes = ["application/pdf", "image/jpeg", "image/png"];
        const maxFileSize = 2048 * 1024; // 2MB

        if (!validMimeTypes.includes(file.type)) {
            return "Invalid file type. Only JPEG, PNG, or PDF are allowed.";
        }
        if (file.size > maxFileSize) {
            return `File size exceeds ${maxFileSize / 1024}KB.`;
        }
        return true;
    };

    const {data, status, loading, error, fetchData} = useAxios(`/applications/${id}/documents/single`, "post", {headers: { Authorization: `Bearer ${Token}` },});

    const {register, handleSubmit, formState: { errors }} = useForm();

    const onSubmit = async (formData) => {
        const form = new FormData();
        form.append('document_type', fieldName);
        form.append('document', formData[fieldName][0]);
        await fetchData({ data: form });
    }

    useEffect(() => {
        if(status === 201){
            onSuccess?.();
            onClose(true);
            toast.success(`${fieldlabel} file uploaded successfully`);
        }
    }, [status])

    return(
        <div className="max-w-[670px] w-full bg-white-default rounded-md shadow-flex">
            
            <div className="grid grid-cols-1 gap-7 text-black-default">
                <div className="flex items-center justify-between pt-7 pb-5 px-5 border-b">
                    <h2 className="text-black-default text-xl font-bold">Upload Document</h2>
                    <RxCross2 onClick={() => onClose(false)} className="text-black-default cursor-pointer size-5" />
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="px-5 py-4">
                    <FileFeild 
                        label={fieldlabel}
                        id={fieldName}
                        {...register(fieldName, {
                            required: "Please select a file",
                            validate: (fileList) => validateFile(fileList?.[0])
                        })}
                        error={errors[fieldName]?.message}
                    />
                </div>
                
                <div className="flex items-center gap-2.5 justify-end border-t p-4">
                    <Button
                        onclick={() => onClose(false)}
                        text="Cancel"
                        classname="py-2.5 px-8 [&]:rounded-full border-0 [&]:text-black-300 [&]:bg-primary-100"
                    />
                    <Button 
                        type="submit" 
                        text={loading ? 'Submitting...' : 'Submit'}
                        classname="py-2.5 px-8 [&]:rounded-full" 
                    />
                </div>

                {error && <p className="bg-red-100 py-2.5 px-5 text-red-800 mt-2 rounded-md font-normal" dangerouslySetInnerHTML={{ __html: error }}></p>}
            </form>

        </div>
    )
}

export default UploadDocumentPopup;