import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import { useParams } from "react-router-dom";
import { GrDocument } from "react-icons/gr";
import { AiOutlineFilePdf } from "react-icons/ai";
import { MdMessage } from "react-icons/md";
import Button from "../../../../components/ui/Button";
import StudentsDocumentData from "./StudentsDocumentData";
import useAxios from "../../../../hooks/UseAxios";
import UploadDocumentPopup from "./popup/UploadDocumentPopup";
import AddRemark from "./popup/AddRemark";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const extractBase64FromHtml = (htmlString) => {
  if (!htmlString) return "";
  const match = htmlString.match(/src='(data:image\/[^']+)'/);
  return match?.[1] || "";
};

const ApplicationDocument = () => {
  const { userData } = useContext(UserContext);
  const Token = userData.token;
  const { id } = useParams();

  // Get all document fields
  const getAllDocumentFields = useAxios("/form/1/file-fields", "get", {headers: { Authorization: `Bearer ${Token}` },});

  // Get uploaded document fields by user
  const getUploadedDocumentField = useAxios(`applications/${id}/documents`,"get",{ headers: { Authorization: `Bearer ${Token}` } });
  const getUploadedDocumentData = getUploadedDocumentField.data;

  // Get uploaded document
  const getUploadedDocument = useAxios(null, "get", {headers: { Authorization: `Bearer ${Token}` },});

  // Document verification
  const DocumentVerfication = useAxios(null, "post", {headers: { Authorization: `Bearer ${Token}` },});

  // Remove document
  const removeDocument = useAxios(null, "delete", {headers: { Authorization: `Bearer ${Token}` },});

  const [thumbnails, setThumbnails] = useState({});
  const [loadingThumbnails, setLoadingThumbnails] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState({ fieldlabel: "", fieldName: "" });
  const [isRemarkOpen, setIsRemarkOpen] = useState(false);

  const fetchThumbnails = async () => {
    if (!getUploadedDocumentData?.length) return;

    setLoadingThumbnails(true);
    const thumbData = {};
    for (const doc of getUploadedDocumentData) {
      if (doc.extension !== "application/pdf") {
        const response = await getUploadedDocument.fetchData({
          url: `applications/${id}/documents/${doc.id}/file?thumb=true`,
        });
        thumbData[doc.id] = extractBase64FromHtml(response.data);
      }
    }
    setThumbnails(thumbData);
    setLoadingThumbnails(false);
  };

  const onVerifyStatus = async (documentId, newStatus) => {
    await DocumentVerfication.fetchData({
      url: `/applications/${id}/documents/${documentId}/verify`,
      data: { status: newStatus },
    });

    // Refresh uploaded document data
    await getUploadedDocumentField.fetchData();
  };

  const handleRemove = async (documentId) => {
    await removeDocument.fetchData({
      url: `applications/${id}/documents/${documentId}`,
    });
    
    // Refresh the document list
    await getUploadedDocumentField.fetchData(); 
  };

  useEffect(() => {
    const fetchData = async () => {
      await getAllDocumentFields.fetchData();
      await getUploadedDocumentField.fetchData();
    };
    fetchData();
  }, []);

  useEffect(() => {
    fetchThumbnails();
  }, [getUploadedDocumentData]);

  const openPopup = (fieldlabel, fieldName) => {
    setPopupData({ fieldlabel, fieldName });
    setIsPopupOpen(true);
  };

  if (getAllDocumentFields.loading || getUploadedDocumentField.loading) {
    return <div className="text-black-default">Loading...</div>;
  }

  return (
    <div className="-mx-5">

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-[#1f1e1e80] flex items-center justify-center z-50">
          <UploadDocumentPopup
            onClose={() => setIsPopupOpen(false)}
            fieldlabel={popupData.fieldlabel}
            fieldName={popupData.fieldName}
            onSuccess={() => getUploadedDocumentField.fetchData()}
          />
        </div>
      )}

      {isRemarkOpen && (
        <div className="fixed inset-0 bg-black bg-[#1f1e1e80] flex items-start justify-end z-50">
          <AddRemark onClose={() => setIsRemarkOpen(false)} />
        </div>
      )}

      <div className="flex justify-end pb-5 pr-5">
        <Button
          text="Add Remark"
          onclick={() => setIsRemarkOpen(true)}
          icon={<MdMessage className="h-4 w-4 mr-1.5" />}
          classname="[&]:rounded-full [&]:px-5 [&]:py-2.5 flex items-center"
        />
      </div>

      <div className="grid grid-cols-5 text-black-default bg-black-100 px-5 py-3">
        {["Document", "Document Name", "Date", "Status", "Actions"].map(
          (header) => (
            <div key={header} className="text-base font-medium leading-5">
              {header}
            </div>
          )
        )}
      </div>

      {getAllDocumentFields.data?.map((field) => {
        const docinfo = getUploadedDocumentData?.find(
          (doc) => doc.document_type === field.name
        );
        const isUploaded = !!docinfo;
        return (
          <StudentsDocumentData
            key={field.name}
            id={field.name}
            document={
              docinfo?.extension === "application/pdf" ? (
                <AiOutlineFilePdf size={80} className="text-black-200" />
              ) : docinfo?.extension !== "application/pdf" && thumbnails[docinfo?.id] ? (
                loadingThumbnails ? (
                  "loading..."
                ) : (
                  <img
                    src={thumbnails[docinfo.id]}
                    alt={`${field.label}`}
                    className="w-20 h-20 object-cover"
                  />
                )
              ) : (
                <GrDocument size={70} className="text-black-200" />
              )
            }
            name={field.label}
            date={docinfo ? formatDate(docinfo.created_at) : "N/A"}
            status={docinfo ? docinfo.status : "unverified"}
            documentId={docinfo?.id}
            isUploaded={isUploaded}
            onVerifyStatus={onVerifyStatus}
            onRemove={() => handleRemove(docinfo?.id)}
            onUpload={() => openPopup(field.label, field.name)}
          />
        );
      })}
    </div>
  );
};

export default ApplicationDocument;