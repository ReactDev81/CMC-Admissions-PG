import OutlineButton from '../../../../components/ui/OutlineButton' 
const StudentsDocumentData = ({document, name, date, status, isUploaded, id, documentId, onVerifyStatus, onRemove, onUpload}) => {

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    if (onVerifyStatus) {
      onVerifyStatus(documentId, newStatus);
    }
  }

  return (
      <div className="grid grid-cols-5 border-b px-5 py-3 items-center" id={id}>

        <div className="text-base text-black-default font-medium leading-5">
          {document}
        </div>

        <div className="text-base text-black-default font-medium leading-5">
          {name}
        </div>

        <div className="text-base text-black-default font-medium leading-5">
          {date}
        </div>
        
        <div className="text-base text-black-default font-normal leading-5 flex flex-wrap group items-center">
          {isUploaded ? 
            <select 
              name="status" 
              value={status}
              onChange={handleStatusChange} 
              className="block w-full border rounded-md pl-4 pr-10 py-3 text-base font-normal text-black-300 relative"
            >
              <option value="verified">Verified</option>
              <option value="unverified">Unverified</option>
            </select>
          : 'Not Uploaded'}
        </div>

        <div className="text-right flex flex-wrap gap-1.5 justify-end">
          {isUploaded ? (
            <>
              <OutlineButton
                text="Change"
                onclick={onUpload}
                className="border-primary-default text-base text-primary-default py-1 px-4"
              />
              <OutlineButton
                text="Remove"
                onclick={onRemove}
                className="border-danger-default text-base text-danger-default py-1 px-4"
              />
            </>
          ) : (
            <OutlineButton
              text="Upload"
              onclick={onUpload}
              className="border-primary-default text-base text-primary-default py-1 px-4"
            />
          )}
        </div>

      </div>
  );
};

export default StudentsDocumentData;
