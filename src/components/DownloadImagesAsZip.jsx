import axios from "axios";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";

const DownloadImagesAsZip = async (applicationId, documents, token) => {
  if (!documents || documents.length === 0) {
    toast.error("No documents available for download.");
    return;
  }

  const zip = new JSZip();

  try {
    for (const doc of documents) {
      try {
        // Fetch the document file
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_API_URL}/applications/${applicationId}/documents/${doc.id}/file`,
          {
            responseType: "blob", // Expect raw binary data
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "image/*", // Accept any image format
            },
          }
        );

        // Determine the file extension dynamically
        const fileExtension = response.headers["content-type"].split("/")[1] || "jpg";
        const fileName = doc.file_name || `${doc.name}.${fileExtension}`;

        // Add the file to the ZIP
        zip.file(fileName, response.data);
      } catch (error) {
        console.error(`Error downloading ${doc.name}:`, error);
        toast.error(`Error downloading ${doc.name}`);
      }
    }

    // Generate the ZIP file and trigger download
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "documents.zip");
      toast.success("Documents downloaded successfully!");
    });
  } catch (error) {
    console.error("Error creating ZIP file:", error);
    toast.error("Failed to create ZIP file.");
  }
};

export default DownloadImagesAsZip;