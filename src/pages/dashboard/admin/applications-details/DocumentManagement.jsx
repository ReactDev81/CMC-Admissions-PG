import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { GrDocument, GrDocumentPdf } from "react-icons/gr";
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

const DocumentManagement = (id, Token) => {

    const [thumbnails, setThumbnails] = useState({});
    const [loadingThumbnails, setLoadingThumbnails] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupData, setPopupData] = useState({ fieldlabel: "", fieldName: "" });
    const [isRemarkOpen, setIsRemarkOpen] = useState(false);
    const [uploadedDocs, setUploadedDocs] = useState([]);

    // Get all document fields
    const getAllDocumentFields = useAxios("/form/1/file-fields", "get", { headers: { Authorization: `Bearer ${Token}` } });

    // Get uploaded document fields by user
    const getUploadedDocumentField = useAxios(`applications/${id}/documents`, "get", { headers: { Authorization: `Bearer ${Token}` } });

    // get all Uploaded Document
    const fetchUploadedDocuments = useAxios(null, "get", { headers: { Authorization: `Bearer ${Token}` } });

    // Get uploaded document
    const getUploadedDocument = useAxios(null, "get", { headers: { Authorization: `Bearer ${Token}` } });

    // Document verification
    const DocumentVerfication = useAxios(null, "post", { headers: { Authorization: `Bearer ${Token}` } });

    // Remove document
    const removeDocument = useAxios(null, "delete", { headers: { Authorization: `Bearer ${Token}` } });

    const fetchThumbnails = async () => {

    if (!getUploadedDocumentField.data?.length) return;

        setLoadingThumbnails(true);
        const thumbData = {};
        for (const doc of getUploadedDocumentField.data) {
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
        await getUploadedDocumentField.fetchData();
    };

    const handleRemove = async (documentId) => {
        await removeDocument.fetchData({
            url: `applications/${id}/documents/${documentId}`,
        });
        await getUploadedDocumentField.fetchData();
    };

    const openPopup = (fieldlabel, fieldName) => {
        setPopupData({ fieldlabel, fieldName });
        setIsPopupOpen(true);
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

    const downloadZipFile = async () => {

        if (!getUploadedDocumentField.data?.length) {
            toast.error("No documents available for download.");
            return;
        }

        const zip = new JSZip();

        for (const doc of getUploadedDocumentField.data) {
            try {
                if (doc.extension === "application/pdf") {
                    const fetchPdf = await fetchUploadedDocuments.fetchData({
                    url: `applications/${id}/documents/${doc.id}/file`,
                    headers: { Authorization: `Bearer ${Token}` },
                    responseType: "blob"
                    });
                    const pdfBlob = new Blob([fetchPdf.data], { type: "application/pdf" });
                    zip.file(`${doc.name}.pdf`, pdfBlob);
                } else {
                    const fetchImages = await fetchUploadedDocuments.fetchData({
                    url: `applications/${id}/documents/${doc.id}/file`,
                    headers: {
                        Authorization: `Bearer ${Token}`,
                        Accept: "image/jpeg",
                    }
                    });
                    const srcMatch = fetchImages.data.match(/src=["'](data:image\/[^"']+)["']/);
                    if (srcMatch && srcMatch[1]) {
                    const [mimeType, base64Data] = srcMatch[1].split(",");
                    const extension = mimeType.split("/")[1]?.split(";")[0] || "jpeg";
                    const blob = base64ToBlob(base64Data, mimeType);
                    zip.file(`${doc.name}.${extension}`, blob);
                    }
                }
            } catch (error) {
                console.error(`Error fetching document ${doc.name}:`, error);
                toast.error(`Failed to fetch document ${doc.name}.`);
            }
        }

        try {
            const content = await zip.generateAsync({ type: "blob" });
            saveAs(content, "Documents.zip");
            toast.success("Documents downloaded successfully!");
        } catch (error) {
            console.error("Error creating ZIP file:", error);
            toast.error("Failed to download documents.");
        }
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
    }, [getUploadedDocumentField.data]);

    useEffect(() => {
        if (getUploadedDocumentField.status === 200) {
            const fetchDocuments = async () => {
            try {
                const documentData = getUploadedDocumentField.data;
                if (!documentData || documentData.length === 0) return;
                const docIds = documentData.map((doc) => doc.id).filter(Boolean);
                    const documentRequests = docIds.map((docId) =>
                        fetchUploadedDocuments.fetchData({
                            url: `/applications/${id}/documents/${docId}/file`,
                        })
                    );
                    const documentResponses = await Promise.all(documentRequests);
                    const documents = documentResponses.map((res) => res.data);
                    setUploadedDocs(documents);
                } catch (error) {
                    toast.error("Error fetching documents:", error);
                }
            };
            fetchDocuments();
        }
    }, [getUploadedDocumentField.status]);

    return {
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
    };
};

export default DocumentManagement