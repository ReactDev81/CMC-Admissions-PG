import Button from "../../../components/ui/Button";
import { FaPenClip } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6";

const ChruchMembersBodies = () => {
    return(
        <div className="px-8 py-6 max-w-[650px] w-full bg-white-default rounded-lg shadow-flex">
          <h2 className="text-black-default capitalize mb-9">Church Member Bodies</h2>

          <div className="flex justify-between border border-primary-default rounded-full mb-6">
            <input 
              type="text"
              className="text-black-200 w-full px-5 py-2.5 bg-transparent"
              placeholder="Enter church body name here..."
            />
            <Button text="Add" classname="[&]:px-6 [&]:py-2.5 [&]:rounded-full border-0" />
          </div>

          <div className="px-1.5 py-2.5 flex items-center justify-between border-b">
            <span className="text-black-300 text-base font-normal ">SYNODICAL BOARD OF HEALTH SERVICES CHURCH OF NORTH INDIA</span>
            <span className="flex items-center gap-2.5">
              <FaPenClip  className="text-black-default"/>
              <FaTrashCan  className="text-black-default"/>
            </span>
          </div>

          <div className="px-1.5 py-2.5 flex items-center justify-between border-b">
            <span className="text-black-300 text-base font-normal ">CHURCH OF SOUTH INDIA</span>
            <span className="flex items-center gap-2.5">
              <FaPenClip  className="text-black-default"/>
              <FaTrashCan  className="text-black-default"/>
            </span>
          </div>

          <div className="px-1.5 py-2.5 flex items-center justify-between border-b">
            <span className="text-black-300 text-base font-normal ">COUNCIL OF BAPTIST CHURCHES IN NORTH EAST INDIA</span>
            <span className="flex items-center gap-2.5">
              <FaPenClip  className="text-black-default"/>
              <FaTrashCan  className="text-black-default"/>
            </span>
          </div>

          <div className="px-1.5 py-2.5 flex items-center justify-between border-b">
            <span className="text-black-300 text-base font-normal ">COUNCIL OF MEDICAL WORK, METHODIST CHURCH IN INDIA</span>
            <span className="flex items-center gap-2.5">
              <FaPenClip  className="text-black-default"/>
              <FaTrashCan  className="text-black-default"/>
            </span>
          </div>

          <div className="px-1.5 py-2.5 flex items-center justify-between border-b">
            <span className="text-black-300 text-base font-normal ">DIOCESE OF AMRITSAR (CNI)</span>
            <span className="flex items-center gap-2.5">
              <FaPenClip  className="text-black-default"/>
              <FaTrashCan  className="text-black-default"/>
            </span>
          </div>

          <div className="px-1.5 py-2.5 flex items-center justify-between border-b">
            <span className="text-black-300 text-base font-normal ">DIOCESE OF CHANDIGARH (CNI)</span>
            <span className="flex items-center gap-2.5">
              <FaPenClip  className="text-black-default"/>
              <FaTrashCan  className="text-black-default"/>
            </span>
          </div>

          <div className="px-1.5 py-2.5 flex items-center justify-between border-b">
            <span className="text-black-300 text-base font-normal ">EASTERN REGIONAL BOARD OF HEALTH SERVICES (CNI)</span>
            <span className="flex items-center gap-2.5">
              <FaPenClip  className="text-black-default"/>
              <FaTrashCan  className="text-black-default"/>
            </span>
          </div>

          <div className="px-1.5 py-2.5 flex items-center justify-between border-b">
            <span className="text-black-300 text-base font-normal ">EMMANUEL HOSPITAL ASSOCIATION</span>
            <span className="flex items-center gap-2.5">
              <FaPenClip  className="text-black-default"/>
              <FaTrashCan  className="text-black-default"/>
            </span>
          </div>
          
        </div>
    )
}

export default ChruchMembersBodies;