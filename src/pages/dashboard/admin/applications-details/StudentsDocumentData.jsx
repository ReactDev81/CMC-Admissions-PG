import OutlineButton from '../../../../components/ui/OutlineButton' 
const StudentsDocumentData = ({document, name, date}) => {
  return (
      <div className="grid grid-cols-5 border-b px-5 py-3 items-center">
        <div className="text-base text-black-default font-medium leading-5">
          {/* <img
            src={document}
            className="h-[87px] w-[75px] object-contain rounded-md"
            alt="document-image"
          /> */}
          {document}
        </div>
        <div className="text-base text-black-default font-medium leading-5">
          {name}
        </div>
        <div className="text-base text-black-default font-medium leading-5">
          {date}
        </div>
        <div className="text-base text-black-default font-normal leading-5 flex flex-wrap group items-center">
          <select name="status" className='block w-full border rounded-md pl-4 pr-10 py-3 text-base font-normal text-black-300 relative'>
            <option value="verified">Verified</option>
            <option value="unverified">Unverified</option>
          </select>
        </div>
        <div className="text-right flex flex-wrap gap-1.5 justify-end">
          <OutlineButton
            text="change"
            className="border-primary-default text-base text-primary-default py-1 px-4"
          />
          <OutlineButton
            text="remove"
            className="border-danger-default text-base text-danger-default py-1 px-4"
          />
          <OutlineButton
            text="Upload"
            className="border-primary-default text-base text-primary-default py-1 px-4"
          />
        </div>
      </div>
  );
};

export default StudentsDocumentData;
