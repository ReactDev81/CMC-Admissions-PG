import Button from "../../../../components/ui/Button";
import StudentsDocumentData from "./StudentsDocumentData";
import { MdMessage } from "react-icons/md"; 
import { useContext, useEffect } from "react";
import { UserContext } from "../../../../context/UserContext";
import useAxios from "../../../../hooks/UseAxios";
import { useParams } from "react-router-dom";

const ApplicationDocument = () => {

  const { userData } = useContext(UserContext);
  const Token = userData.token;
  const { id } = useParams();

  // get all document fields
  const getAllDocumentFields = useAxios("/form/1/file-fields", 'get', { headers: {Authorization: `Bearer ${Token}`} })

  useEffect(() => {
    const getDocuments = async () => {
      await getAllDocumentFields.fetchData();
    };
    getDocuments();
  }, [getAllDocumentFields.status])

  console.log('All Document Fields : ', getAllDocumentFields.data);

  // get uploaded document fields by user
  const getUploadedDocumentField = useAxios(`applications/${id}/documents`, 'get', { headers: {Authorization: `Bearer ${Token}`} })

  useEffect(() => {
    const getDocuments = async () => {
      await getUploadedDocumentField.fetchData();
    };
    getDocuments();
  }, [getUploadedDocumentField.status])

  console.log('Uploaded Document Fields : ', getUploadedDocumentField.data);

  return (
    <div className="-mx-5">

      <div className="flex justify-end pb-5 pr-5">
        <Button
          text="Add Remark"
          icon={<MdMessage className="h-4 w-4 mr-1.5" />}
          classname="[&]:rounded-full [&]:px-5 [&]:py-2.5 flex items-center"
        />
      </div>

      <div className="grid grid-cols-5 text-black-default bg-black-100 px-5 py-3">
        {['Document', 'Document Name', 'Date', 'Status', 'Actions'].map((header) => {
          return(
            <div key={header} className="text-base font-medium leading-5">{header}</div>
          )
        })}
      </div>

      {/* Student Data -1 */}
      <StudentsDocumentData
        document="/assets/images/default-applicants-image.jpeg"
        name="NEET PG-2024 Admit Card"
        date="23 June 2022"
      />

    </div>
  );
};

export default ApplicationDocument;
