import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { GrDocument } from "react-icons/gr";
import { AiOutlineFilePdf } from "react-icons/ai";
import { MdMessage } from "react-icons/md";
import { HiFolderDownload } from "react-icons/hi";
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

  // get all Uploaded Document 
  const fetchUploadedDocuments = useAxios(null, "get", 
    {
      headers: {
        Authorization: `Bearer ${Token}`,
        Accept: "image/jpeg", 
      }
    }
  );

  // Get uploaded document
  const getUploadedDocument = useAxios(null, "get", {headers: { Authorization: `Bearer ${Token}` }});

  // Document verification
  const DocumentVerfication = useAxios(null, "post", {headers: { Authorization: `Bearer ${Token}` }});

  // Remove document
  const removeDocument = useAxios(null, "delete", {headers: { Authorization: `Bearer ${Token}` }});

  const [thumbnails, setThumbnails] = useState({});
  const [loadingThumbnails, setLoadingThumbnails] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState({ fieldlabel: "", fieldName: "" });
  const [isRemarkOpen, setIsRemarkOpen] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState([]);

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

  useEffect(() => {
    // if (!id || !Token) return;

    if(getUploadedDocumentField.status === 200){

      // Fetch uploaded document fields
      const fetchDocuments = async () => {
        try {
          const documentData = getUploadedDocumentData;
          if (!documentData || documentData.length === 0) return;

          // Extract all document IDs
          const docIds = documentData.map((doc) => doc.id).filter(Boolean);

          // Fetch all documents using their IDs
          const documentRequests = docIds.map((docId) =>
            fetchUploadedDocuments.fetchData({
              url: `/applications/${id}/documents/${docId}/file`,
            })
          );

          // Resolve all API requests
          const documentResponses = await Promise.all(documentRequests);
          const documents = documentResponses.map((res) => res.data);

          // Log the fetched documents for debugging
          // toast.error("Fetched Documents:", documents);

          setUploadedDocs(documents);
        } catch (error) {
          toast.error("Error fetching documents:", error);
        }
      };

      fetchDocuments();
    }
  }, [getUploadedDocumentField.status]);

  const downloadZipFile = async () => {
    if (!uploadedDocs.length) {
      toast.error("No documents available for download.");
      return;
    }
  
    const zip = new JSZip();
  
    uploadedDocs.forEach((doc, index) => {
      const srcMatch = doc.match(/src=["'](data:image\/[^"']+)["']/);
      if (srcMatch && srcMatch[1]) {
        const [mimeType, base64Data] = srcMatch[1].split(",");
        const extension = mimeType.split("/")[1]?.split(";")[0] || "jpeg";
        const blob = base64ToBlob(base64Data, mimeType);
        zip.file(`document_${index + 1}.${extension}`, blob);
      }
    });
  
    try {
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "Documents.zip");
  
      // Show success toast notification
      toast.success("Documents downloaded successfully!");
    } catch (error) {
      console.error("Error creating ZIP file:", error);
      toast.error("Failed to download documents.");
    }
  };  
  
  const base64ToBlob = (base64, mimeType) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  };

  if (getAllDocumentFields.loading || getUploadedDocumentField.loading) {
    return <div className="text-black-default">Loading...</div>;
  }

  return (
    <div className="-mx-5">

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-[#1f1e1e80] flex items-center justify-center z-50">
          <UploadDocumentPopup
            onClose={setIsPopupOpen}
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

      <div className="flex justify-end gap-x-2 pb-5 pr-5">
        <Button
          onclick={downloadZipFile}
          text="Download All Docs"
          icon={<HiFolderDownload size={18} className="mr-1.5" />}
          classname="[&]:rounded-full [&]:px-5 [&]:py-2.5 flex items-center"
        />
        <Button
          text="Add Remark"
          onclick={() => setIsRemarkOpen(true)}
          icon={<MdMessage size={16} className="mr-1.5" />}
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
            document={docinfo?.extension === "application/pdf" ? ( <AiOutlineFilePdf size={80} className="text-black-200" /> ) : 
            docinfo?.extension !== "application/pdf" && thumbnails[docinfo?.id] ? (
                loadingThumbnails ? ( "loading..." ) : (
                  <img
                    src={thumbnails[docinfo.id]}
                    alt={`${field.label}`}
                    className="w-20 h-20 object-cover"
                  />
                )
              ) : ( <GrDocument size={70} className="text-black-200" /> )
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