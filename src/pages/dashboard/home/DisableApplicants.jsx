import Title from "../../../components/ui/Title";
import OutlineButton from "../../../components/ui/OutlineButton"; 
import { RiArrowDownSLine } from "react-icons/ri"; 
import Searchbar from "../../../components/ui/Searchbar"; 
const DisableApplicants = () => {
  return (
    <div className="bg-white-default p-5 rounded-lg shadow-flex">
      <div className="flex flex-wrap items-center justify-between pb-3.5 border-b">
        <Title title="Disable Applicants" />
        <span className="text-black-default text-[28px]">
          <RiArrowDownSLine />
        </span>
      </div>
      <div className="pt-4">
        <Searchbar placeholder="Enter applicant name to disable..." />
      </div>
      <div className="text-black-default flex flex-wrap justify-between items-center pt-4">
        <div className="flex flex-wrap items-center">
          <img
            src="src/assets/images/default-applicants-image.jpeg"
            alt=""
            className="h-10 w-10 object-cover rounded-full mr-[10px]"
          />
          <div className="flex flex-col">
            <h5 className="font-normal">Henry Woris</h5>
            <h6 className="font-normal text-info-default">2024-1024</h6>
          </div>
        </div>
        <OutlineButton text="Remove" />
      </div>
      <div className="text-black-default flex flex-wrap justify-between items-center pt-4">
        <div className="flex flex-wrap items-center">
          <img
            src="src/assets/images/default-applicants-image.jpeg"
            alt=""
            className="h-10 w-10 object-cover rounded-full mr-[10px]"
          />
          <div className="flex flex-col">
            <h5 className="font-normal">Henry Woris</h5>
            <h6 className="font-normal text-info-default">2024-1024</h6>
          </div>
        </div>
        <OutlineButton text="Remove" />
      </div>
      <div className="text-black-default flex flex-wrap justify-between items-center pt-4">
        <div className="flex flex-wrap items-center">
          <img
            src="src/assets/images/default-applicants-image.jpeg"
            alt=""
            className="h-10 w-10 object-cover rounded-full mr-[10px]"
          />
          <div className="flex flex-col">
            <h5 className="font-normal">Henry Woris</h5>
            <h6 className="font-normal text-info-default">2024-1024</h6>
          </div>
        </div>
        <OutlineButton text="Remove" />
      </div>
      <div className="text-black-default flex flex-wrap justify-between items-center pt-4">
        <div className="flex flex-wrap items-center">
          <img
            src="src/assets/images/default-applicants-image.jpeg"
            alt=""
            className="h-10 w-10 object-cover rounded-full mr-[10px]"
          />
          <div className="flex flex-col">
            <h5 className="font-normal">Henry Woris</h5>
            <h6 className="font-normal text-info-default">2024-1024</h6>
          </div>
        </div>
        <OutlineButton text="Remove" />
      </div>
    </div>
  );
};
export default DisableApplicants;