import Button from "../../../components/ui/Button"; // Button
import OutlineButton from "../../../components/ui/OutlineButton"; // Outline Button
import { PiChurch } from "react-icons/pi"; // Church icon
import { CiLocationOn } from "react-icons/ci"; // Location

const ApplicationDetailCard = () => {
  return (
    <div className="bg-white-default rounded-md w-full shadow-flex h-fit">
      <div className="flex flex-wrap">
        <div className="p-5 border-b">
          <div className="flex flex-wrap items-center">
            <img
              className="h-[177px] w-[138px] object-cover rounded-md"
              src="/assets/images/default-applicants-image.jpeg"
              alt=""
            />
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
        <div className="p-5">
          <div className="flex flex-wrap mb-1">
            <h1 className="text-black-default flex-1">Anisha Sandalas</h1>
            <Button
              text="Active"
              classname="[&]:py-0 [&]:px-5 [&]:rounded-full border-0 [&]:text-parrotgreen-default [&]:bg-parrotgreen-200"
            />
          </div>
          <div className="mb-8">
            <p className="text-black-default">Registeration ID:</p>
            <p className="text-black-default">PGM24-05</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-black-default text-2xl bg-black-100 rounded-full p-1">
              <PiChurch />
            </span>
            <p className="text-black-200">Church of south india</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="text-black-default text-2xl bg-black-100 rounded-full p-1">
              <CiLocationOn />
            </span>
            <p className="text-black-200">15-55A, Raj cottage, Chemponvilai.</p>
          </div>
          <div className="flex justify-center">
            <Button text="Download Application" classname="[&]:rounded-full w-full"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailCard;
