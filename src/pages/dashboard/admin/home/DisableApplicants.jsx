import { useState } from "react";
import Title from "../../../../components/ui/Title";
import Searchbar from "../../../../components/ui/Searchbar"; 
import disableApplicants from "../../../../fake-api/DisableApplicants"
import OutlineButton from "../../../../components/ui/OutlineButton"; 
import { RiArrowDownSLine } from "react-icons/ri"; 

const DisableApplicants = () => {

  const [open, setOpen] = useState(true);

  return (
    <div className="bg-white-default rounded-lg shadow-flex">

      <div 
        className="flex flex-wrap items-center justify-between p-5 pb-3.5 cursor-pointer" 
        aria-expanded={open} 
        onClick={() => setOpen(!open)}
      >
        <Title title="Disable Applicants" />
        <RiArrowDownSLine color="#1F1E1E" size={28} />
      </div>

      {open && 
        <div className='p-5 pt-0'>
          <div className="pt-4 border-t">
            <Searchbar placeholder="Enter applicant name to disable..." />
          </div>
          {disableApplicants.map((applicant, index) => {
              return (
                <div key={index} className="text-black-default flex flex-wrap justify-between items-center pt-4">
                  <div className="flex flex-wrap items-center">
                    <img
                      src={applicant.image}
                      alt={applicant.name}
                      className="h-10 w-10 object-cover rounded-full mr-[10px]"
                    />
                    <div className="flex flex-col">
                      <h5 className="font-normal">{applicant.name}</h5>
                      <h6 className="font-normal text-info-default">{applicant.application_id}</h6>
                    </div>
                  </div>
                  <OutlineButton text="Remove" />
                </div>
              )
          })}
        </div>
      } 
    </div>
  );
};
export default DisableApplicants;