import Button from "../../../../components/ui/Button"; // Button
import OutlineButton from "../../../../components/ui/OutlineButton"; // Outline Button
import { PiChurch } from "react-icons/pi"; // Church icon
import { CiLocationOn } from "react-icons/ci"; // Location
import { useParams } from "react-router-dom";
import useAxios from "../../../../hooks/UseAxios";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../../context/UserContext";
import { PiUserCircleDuotone } from "react-icons/pi";
import SelectStatus from "../../../../components/SelectStatus";

const ApplicationDetailCard = () => {

  const { id } = useParams();
  const { userData } = useContext(UserContext);

  // get applicant information
  const { data, loading, fetchData } = useAxios(`applications/${id}`, 'get', { headers: {Authorization: `Bearer ${userData.token}`} })

  useEffect(() => {
    const getApplicationData = async () => {
      await fetchData();
    };
    getApplicationData();
  }, [])


  // download application
  const { data: applicationPdf, loading: applicationLoading, fetchData: getApplicationPdf, status: applicationStatus } = useAxios(`applications/${id}/pdf`, 'get',
    {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${userData.token}`,
        'Accept': 'application/pdf',
      }
    }
  )

  const getPdf = async () => {
    await getApplicationPdf();
  }

  useEffect(() => {
    if(applicationStatus === 200){
      // Convert the PDF data into a Blob
      const file = new Blob([applicationPdf], {type: 'application/pdf'});

      // Create a temporary URL for the Blob
      const fileURL = window.URL.createObjectURL(file);

      // Create a temporary anchor element
      const a = document.createElement("a");
      a.href = fileURL;
      a.download = "application.pdf";

      // Append the anchor to the document body and trigger a click
      document.body.appendChild(a);
      a.click();

      // Clean up the temporary anchor and URL
      document.body.removeChild(a);
      window.URL.revokeObjectURL(fileURL);
    }
  }, [applicationStatus])


  // get documents
  const { data: documentsData, fetchData: getDocuments, status: documentStatus } = useAxios(`applications/${id}/documents`, 'get', { headers: {Authorization: `Bearer ${userData.token}`} })

  useEffect(() => {
    const getDocumentsData = async () => {
      await getDocuments();
    };
    getDocumentsData();
  }, [])


  // get Applicant Profile Picture
  const { data: applicantProfile, fetchData: getApplicantProfile } = useAxios(null, 'get', { 
    headers: { Authorization: `Bearer ${userData.token}`} 
  });

  useEffect(() => {
    if(documentStatus === 200 && documentsData){

      const profileDocId = documentsData.find(doc => doc.document_type === "profile_pic")?.id || '';

      getApplicantProfile({
        url: `applications/${id}/documents/${profileDocId}/file?thumb=true`
      });
    }
  }, [documentStatus, documentsData])
  
  // Function to extract image src
  const getProfileImageSrc = (htmlString) => {

    // Create a temporary DOM element
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    
    // Get the img element and return its src
    const imgElement = tempDiv.querySelector('img');
    
    return imgElement ? imgElement.src : '';
  };

  const imageSrc = getProfileImageSrc(applicantProfile);

  return (
    <>
    {loading ? (
      <div className="w-full h-max p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
        <div className="flex items-center mb-4">
          <PiUserCircleDuotone className="text-black-default" size={140} />
          <div>
            <div className="h-7 w-20 rounded-full mb-3 border border-primary-default"></div>
            <div className="h-7 w-20 rounded-full bg-primary-200"></div>
          </div>
        </div>
        <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full"></div>
        <div className="h-8 w-full mt-4 rounded-full bg-primary-200"></div>
      </div>
    ) :
      <div className="bg-white-default rounded-md w-full shadow-flex h-fit">
        <div className="flex flex-wrap">
          <div className="p-5 w-full border-b">
            <div className="flex flex-wrap items-center">
              {applicantProfile ? (
                <img
                  className="h-[177px] w-[138px] object-cover rounded-md"
                  src={imageSrc}
                  alt=""
                />
                ) : ( <PiUserCircleDuotone className="text-black-default" size={140} />
              )}
              <div className="flex flex-col items-center ml-7">
                <OutlineButton
                  text="Change"
                  className="border-primary-default text-primary-default py-1 px-5 mb-3.5"
                />
                <Button
                  text="Remove"
                  classname="[&]:py-[5px] [&]:rounded-full border-0 [&]:text-black-300 [&]:bg-primary-100"
                />
              </div>
            </div>
          </div>
          <div className="p-5 w-full">
            <div className="flex flex-wrap mb-1">
              <h1 className="text-black-default flex-1">{data?.applicant.name}</h1>
              <SelectStatus />
            </div>
            <div className="mb-8">
              <p className="text-black-default">Registeration ID:</p>
              <p className="text-black-default">{data?.bfuhs_regstration_id}</p>
            </div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-black-default text-2xl bg-black-100 rounded-full p-1">
                <PiChurch />
              </span>
              <p className="text-black-200">{data?.body_church_cmc_ludhiana}</p>
            </div>
            <div className="flex items-center gap-2 mb-5">
              <span className="text-black-default text-2xl bg-black-100 rounded-full p-1">
                <CiLocationOn />
              </span>
              <p className="text-black-200">{data?.correspondence_address}</p>
            </div>
            <div className="flex justify-center">
              <Button onclick={getPdf} text={applicationLoading ? "Downloading..." : "Download Application"} classname="[&]:rounded-full w-full"/>
            </div>
          </div>
        </div>
      </div>
      }
    </>
  );
};

export default ApplicationDetailCard;
