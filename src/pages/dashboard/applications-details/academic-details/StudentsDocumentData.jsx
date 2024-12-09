import OutlineButton from '../../../../components/ui/OutlineButton' 
const StudentsDocumentData = ({documentsrc, documentname, date, verified}) => {
  return (
      <div className="grid grid-rows-1 border-b">
        <div className="grid grid-cols-5 px-5 py-3 items-center">
          <div className="text-base text-black-default font-medium leading-5">
            <img
              src={documentsrc}
              className="h-[87px] w-[75px] object-contain rounded-md"
              alt="document-image"
            />
          </div>
          <div className="text-base text-black-default font-medium leading-5">
            {documentname}
          </div>
          <div className="text-base text-black-default font-medium leading-5">
            {date}
          </div>
          <div className="text-base text-black-default font-normal leading-5 flex flex-wrap group items-center">
              {verified}
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
      </div>
  );
};

export default StudentsDocumentData;
