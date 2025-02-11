import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { IoCloseSharp } from "react-icons/io5";
import { FiPaperclip } from "react-icons/fi";
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from "../../../../../../tailwind.config";
import { UserContext } from "../../../../../context/UserContext";
import { ApplicationContext } from "../../../../../context/ApplicationContext";
import useAxios from "../../../../../hooks/UseAxios";
import Button from "../../../../../components/ui/Button";
import Loader from "../../../../../components/ui/Loader";

const formatDocumentName = (name) => {
    return name
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase()); 
};

const fullConfig = resolveConfig(tailwindConfig);

const StatusColors = {
    pending: fullConfig.theme.colors.warning.default,
    fulfilled: fullConfig.theme.colors.success.default,
};

const StatusLightColors = {
    pending: fullConfig.theme.colors.warning['300'],
    fulfilled: fullConfig.theme.colors.success['300'],
};

const ApplicantRemark = ({ onClose }) => {

    const {register, handleSubmit, reset, setValue, formState: { errors }} = useForm({
        defaultValues: {
            message: "",
        },
    });
    const { userData } = useContext(UserContext);
    const { applicationInfo } = useContext(ApplicationContext);
    const getAllRemark = useAxios(`/applications/${applicationInfo.application_id}/remarks`, "get", { headers: { Authorization: `Bearer ${userData.token}` } });
    
    const [visibleMessages, setVisibleMessages] = useState(5);
    const [uploadedFiles, setUploadedFiles] = useState({});
    const [selectedRemarkId, setSelectedRemarkId] = useState(null);

    const askDocuments = useAxios(`/applications/${applicationInfo.application_id}/remarks/${selectedRemarkId}/respond`, "post", 
        {headers: { 
            Authorization: `Bearer ${userData.token}` ,
            "Content-Type": "multipart/form-data",
        }}
    );

    // Function to handle Reply button click
    const handleReplyClick = (remarkId, requestedDocuments) => {
        setSelectedRemarkId(remarkId);
        // Reset the form fields when a new remark is selected
        const resetFields = requestedDocuments.reduce((acc, field) => {
            acc[field] = null;
            return acc;
        }, {});
        reset(resetFields);
    };

    const loadMoreMessages = () => {
        setVisibleMessages((prev) => prev + 6);
    };

    useEffect(() => {
        getAllRemark.fetchData();
    }, [askDocuments.status]);

    const handleFileChange = (event, field) => {
        const file = event.target.files[0];
        if (file) {
            setUploadedFiles((prev) => ({ ...prev, [field]: file.name }));
            setValue(field, file);
        }
    };

    const onSubmit = async (formData) => {
        console.log("Form submitted successfully!", formData);
        await askDocuments.fetchData({data: formData});
    };

    useEffect(() => {
        if(askDocuments.status === 200){
            toast.success(askDocuments.data.message);
            reset();
        }
    }, [askDocuments.loading])

    return (
        <div className="max-w-[500px] h-full w-full bg-white-default">

            <header className="w-full border-b">
                <div className="px-5 py-3 flex items-center gap-5">
                    <IoCloseSharp onClick={onClose} className="text-black-default h-5 w-5 cursor-pointer" />
                    <h4 className="text-black-default capitalize">Add Remarks</h4>
                </div>
            </header>

            <main className="chat-box overflow-y-scroll h-full">

                {/* Message Box */}
                <div className="chat-message-box p-5 border-b bg-white-300 overflow-y-scroll max-h-[600px]">

                    {/* Load More Button */}
                    {getAllRemark.data && visibleMessages < getAllRemark.data.length && (
                        <div className="text-center py-4">
                            <Button onclick={loadMoreMessages} text="Load More...." classname="[&]:rounded-full [&]:px-6 [&]:py-2.5" />
                        </div>
                    )}

                    {getAllRemark.loading ? <Loader /> : getAllRemark.data &&
                        getAllRemark.data.slice(0, visibleMessages).reverse().map((remark, index) => {
                        const formattedTime = format(new Date(remark.created_at), "h:mm a");
                        const isReviewer = remark.type === "reviewer_remark";
                        return(
                            <div key={index} className={`flex flex-row gap-2.5 w-full mb-4 ${isReviewer ? 'justify-start' : 'flex-row-reverse'}`}>
                                <img
                                    src={remark.sender.profile_pic_url || "/assets/avatars/avatar-1.png"}
                                    alt="Sender Profile"
                                    className="h-10 w-10 rounded-full object-cover"
                                />
                                <div className={`px-3 py-2.5 border border-black-100 rounded-xl ${isReviewer ? 'bg-black-100' : 'bg-white-default'}`}>
                                    <p className="text-black-300 text-base font-normal mb-1">{remark.message}</p>
                                    <div className="flex gap-x-2">
                                        <p className="text-info-default text-base font-normal mb-1">
                                            {remark.submitted_documents 
                                            ? Object.keys(remark.submitted_documents).map(formatDocumentName).join(", ") 
                                            : remark.requested_documents.map(formatDocumentName).join(", ")}
                                        </p>
                                    </div>
                                    <div className={`flex items-center gap-x-2 ${isReviewer ? 'justify-start' : 'justify-end'}`}>
                                        <div className="rounded-full w-fit" style={{ backgroundColor: StatusLightColors[remark.status] }}>
                                            <p className="capitalize text-sm font-medium px-3 py-1" style={{ color: StatusColors[remark.status] }}>
                                                {remark.status}
                                            </p>
                                        </div>
                                        {isReviewer && remark.status == "pending" &&
                                            <Button 
                                                onclick={() => handleReplyClick(remark.id, remark.requested_documents)}
                                                text="Reply" 
                                                classname="[&]:bg-info-default [&]:border-0 [&]:rounded-full [&]:px-3 [&]:py-1 [&]:text-sm" 
                                            />
                                        }
                                        
                                        <p className={`text-black-300 text-[10px] font-normal ${isReviewer ? 'text-left' : 'text-right'}`}>{formattedTime}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>

                {/* Send Message */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-5 h-96">

                    <label className="mb-2">Select Fields/Documents</label>
                    {selectedRemarkId && getAllRemark.data.map((remark) => {
                        if (remark.id === selectedRemarkId && remark.requested_documents && remark.status === "pending") {
                            return (
                                <div key={remark.id} className="flex flex-wrap items-center gap-2 mb-4 mt-4" remark_id={remark.id}>
                                    {remark.requested_documents.map((field, i) => (
                                        <div key={i}>
                                            <label 
                                                className={`flex items-center w-max gap-x-2 py-1.5 px-4 rounded-full text-base cursor-pointer ${
                                                    uploadedFiles[field] ? 'text-info-default bg-info-100' : 'text-black-300 bg-black-100'
                                                }`}
                                                htmlFor={field}
                                            >
                                                <FiPaperclip size={16} />
                                                {uploadedFiles[field] || formatDocumentName(field)}
                                                <input 
                                                    id={field} 
                                                    type="file" 
                                                    className="hidden"  
                                                    onChange={(e) => handleFileChange(e, field)}
                                                />
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            );
                        }
                    })}

                    <div className="mb-4">
                        <textarea
                            rows="3"
                            className="w-full rounded-xl p-4 border text-black-300 block mb-4 outline-none"
                            placeholder="Add Remark..."
                            {...register("message", { required: "Message is required" })}
                        />
                        {errors.message && (
                            <p className="bg-red-100 py-2.5 px-5 text-red-800 mt-2 rounded-md font-normal">
                                {errors.message.message}
                            </p>
                        )}
                    </div>

                    {askDocuments.error && <p className="bg-red-100 py-2.5 px-5 text-red-800 mt-2 rounded-md font-normal" dangerouslySetInnerHTML={{ __html: askDocuments.error }}></p>}

                    <div className="text-right">
                        <Button 
                            text={askDocuments.loading ? "Sending..." : 'Send'} 
                            classname="[&]:rounded-full [&]:px-8 [&]:py-2" 
                        />
                    </div>

                </form>
            </main>
        </div>
    );
};

export default ApplicantRemark;