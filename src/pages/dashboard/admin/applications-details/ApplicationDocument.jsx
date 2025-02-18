import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { GrDocument } from "react-icons/gr";
import { GrDocumentPdf } from "react-icons/gr";
import { MdMessage } from "react-icons/md";
import { HiFolderDownload } from "react-icons/hi";
import Button from "../../../../components/ui/Button";
import StudentsDocumentData from "./StudentsDocumentData";
import useAxios from "../../../../hooks/UseAxios";
import UploadDocumentPopup from "./popup/UploadDocumentPopup";
import AddRemark from "./popup/AddRemark";
import DocumentManagement from "./DocumentManagement";

const ApplicationDocument = () => {
  const { userData } = useContext(UserContext);
  const Token = userData.token;
  const { id } = useParams();

  const {
    thumbnails,
    loadingThumbnails,
    isPopupOpen,
    popupData,
    isRemarkOpen,
    uploadedDocs,
    getAllDocumentFields,
    getUploadedDocumentField,
    onVerifyStatus,
    handleRemove,
    openPopup,
    setIsRemarkOpen,
    downloadZipFile,
    formatDate
  } = DocumentManagement(id, Token);

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
        const docinfo = getUploadedDocumentField.data?.find(
          (doc) => doc.document_type === field.name
        );
        const isUploaded = !!docinfo;
        return (
          <StudentsDocumentData
            key={field.name}
            id={field.name}
            document={docinfo?.extension === "application/pdf" ? ( <GrDocumentPdf size={65} className="text-black-200" /> ) : 
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