import { useState, useContext, useEffect } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { IoCloseSharp } from "react-icons/io5";
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
    // draft: fullConfig.theme.colors.black.default,
    // submitted: fullConfig.theme.colors.info.default,
    pending: fullConfig.theme.colors.warning.default,
    fulfilled: fullConfig.theme.colors.success.default,
    // rejected: fullConfig.theme.colors.danger.default,
};

const StatusLightColors = {
    // draft: fullConfig.theme.colors.black['100'],
    // submitted: fullConfig.theme.colors.info['100'],
    pending: fullConfig.theme.colors.warning['300'],
    fulfilled: fullConfig.theme.colors.success['300'],
    // rejected: fullConfig.theme.colors.danger['300'],
};

const AddRemark = ({ onClose }) => {
  const { userData } = useContext(UserContext);
  const { applicationInfo } = useContext(ApplicationContext);
  const { data, fetchData } = useAxios('/form/1/file-fields', "get", {headers: { Authorization: `Bearer ${userData.token}` },});
  const askDocuments = useAxios(`/applications/${applicationInfo.application_id}/remarks`, 'post', {headers: { Authorization: `Bearer ${userData.token}` },});
  const getAllRemark = useAxios(`/applications/${applicationInfo.application_id}/remarks`, 'get', {headers: { Authorization: `Bearer ${userData.token}` },});
  
  const [visibleMessages, setVisibleMessages] = useState(5); // Initially show 6 messages

  const loadMoreMessages = () => {
    setVisibleMessages((prev) => prev + 6); // Show 6 more messages on each click
  };

  useEffect(() => {
    fetchData();
    getAllRemark.fetchData();
  }, []);

  console.log(getAllRemark.data);

  const {register, handleSubmit, setValue, watch, setError, clearErrors, reset, formState: { errors }} = useForm();

  const selectedOptions = watch("requested_documents", []);

  const onSubmit = async (formData) => {

    if (!formData.requested_documents || formData.requested_documents.length === 0) {
      setError("requested_documents", { type: "manual", message: "At least one document is required" });
      return;
    }

    const formattedData = {
      ...formData,
      requested_documents: formData.requested_documents.map((item) => item.value),
    };

    await askDocuments.fetchData({
      data: formattedData,
    })
  };

  useEffect(() => {
    if(askDocuments.status === 200){
      toast.success(askDocuments.data.message);
      reset();
      clearErrors();
      setValue("requested_documents", []);
      fetchData();
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

      <main className="overflow-y-scroll h-full">

        {/* Message Box */}
        <div className="p-5 border-b bg-white-300 overflow-y-scroll max-h-[600px]">
          {getAllRemark.loading ? <Loader /> : getAllRemark.data &&
            getAllRemark.data.slice().reverse().slice(0, visibleMessages).map((remark, index) => {
              const formattedTime = format(new Date(remark.created_at), "h:mm a");
              return(
                <div key={index} className={`flex flex-row gap-2.5 w-full mb-4 ${remark.requested_documents ? 'justify-start' : 'flex-row-reverse'}`}>
                  <img
                    src={remark.sender.profile_pic_url ? remark.sender.profile_pic_url : "/assets/avatars/avatar-1.png"}
                    alt="Sender Profile"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className={`px-3 py-2.5 border border-black-100 rounded-xl ${remark.requested_documents ? 'bg-black-100' : 'bg-white-default'}`}>
                    <p className="text-black-300 text-base font-normal mb-1">{remark.message}</p>
                    <div className="flex gap-x-2">
                      <p className="text-info-default text-base font-normal mb-1">
                        {remark.submitted_documents 
                          ? Object.keys(remark.submitted_documents).map(formatDocumentName).join(", ") 
                          : remark.requested_documents.map(formatDocumentName).join(", ")}
                      </p>
                    </div>
                    <div className={`flex items-center gap-x-2 ${remark.requested_documents ? 'justify-start' : 'justify-end'}`}>
                      <div className="rounded-full w-fit" style={{ backgroundColor: StatusLightColors[remark.status] }}>
                          <p className="capitalize text-sm font-medium px-3 py-1" style={{ color: StatusColors[remark.status] }}>
                              {remark.status}
                          </p>
                      </div>
                      <p className={`text-black-300 text-[10px] font-normal ${remark.requested_documents ? 'text-left' : 'text-right'}`}>{formattedTime}</p>
                    </div>
                  </div>
                </div>
              )
            })
          }

          {/* Load More Button */}
        {getAllRemark.data && visibleMessages < getAllRemark.data.length && (
          <div className="text-center py-4">
            <Button onclick={loadMoreMessages} text="Load More...." classname="[&]:rounded-full [&]:px-6 [&]:py-2.5" />
          </div>
        )}
        </div>

        {/* Send Message */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-5 h-96">

          {/* Select Field */}
          <div className="mb-4">
            <label className="mb-2">Select Fields/Documents</label>
            <Select
              options={data?.map(item => ({
                value: item.name, 
                label: item.label  
              })) || []}
              isMulti
              value={selectedOptions}
              onChange={(selected) => {
                setValue("requested_documents", selected || []); 
                if (selected.length > 0) {
                  clearErrors("requested_documents");
                }
              }}
              placeholder="Select fields/documents..."
              className="select-doc-fields"
            />
            {errors.requested_documents && (
              <p className="bg-red-100 py-2.5 px-5 text-red-800 mt-2 rounded-md font-normal">
                {errors.requested_documents.message}
              </p>
            )}
          </div>

          {/* Textarea Field */}
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

          {/* Submit Button */}
          <div className="text-right">
            <Button text={askDocuments.loading ? "Sending..." : 'Send'} classname="[&]:rounded-full [&]:px-8 [&]:py-2" />
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddRemark;