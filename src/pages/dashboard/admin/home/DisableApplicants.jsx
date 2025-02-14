import { useState, useContext, useEffect } from "react";
import { RiArrowDownSLine } from "react-icons/ri"; 
import { UserContext } from "../../../../context/UserContext";
import useAxios from  "../../../../hooks/UseAxios";
import DisableApplicantsCard from "../../../../components/Skeleton/DisableApplicantsCard";
import Title from "../../../../components/ui/Title";
import Searchbar from "../../../../components/ui/Searchbar"; 
import OutlineButton from "../../../../components/ui/OutlineButton"; 

const DisableApplicants = () => {

  const [open, setOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { userData } = useContext(UserContext);
  const { data, loading, fetchData } = useAxios('/users/disabled', 'get', {headers: {Authorization: `Bearer ${userData.token}`}});
  const EnableApplicant = useAxios(null, 'post', {headers: {Authorization: `Bearer ${userData.token}`}});

  const enableApplicant = (id) => {
    EnableApplicant.fetchData({
      data: {status: true},
      url: `/users/${id}/status`
    });
  }

  useEffect(() => {
    const getDisableApplicants = async() => {
      await fetchData();
    }
    getDisableApplicants();
  }, [EnableApplicant.status === 201])

  // Filter applicants based on search input
  const filteredApplicants = data?.filter(applicant => 
    applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    applicant.email?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    applicant.applicant_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <Searchbar 
              className="mb-5"
              placeholder="Enter applicant name to disable..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          { loading ? Array.from({length: 5}).map((_, index) => ( <DisableApplicantsCard key={index} /> )) : 
          
            <div className="disable-applicants max-h-80 overflow-y-auto pr-3">
              {filteredApplicants  && filteredApplicants.map((applicant, index) => {
                const firstLetter = applicant.name.charAt(0).toUpperCase();
                const colors = ['#3a6052', '#1ABE17', '#48A3D7', '#C95E9E', '#1ABE17'];
                const color = colors[index % colors.length];
                return(
                  <div key={index} className="text-black-default flex flex-wrap justify-between items-center pt-4">
                    <div className="flex flex-wrap items-center">
                      {!applicant.profile_pic_url == '' ? 
                          <img
                            src={applicant.profile_pic_url}
                            alt={applicant.name}
                            className="h-10 w-10 object-cover rounded-full"
                          />
                        : 
                        <div className="h-10 w-10 rounded-full flex items-center justify-center text-white-default font-semibold"
                            style={{ backgroundColor: color }}
                        >
                            {firstLetter}
                        </div>
                      }
                      <div className="flex flex-col ml-2.5">
                        <h5 className="font-normal">{applicant.name}</h5>
                        <h6 className="font-normal text-info-default">{applicant.applicant_number}</h6>
                      </div>
                    </div>
                    <OutlineButton 
                      onclick={() => enableApplicant(applicant.id)}
                      text="Enable" 
                      className="text-primary-default border-primary-default px-5 py-1.5" 
                    />
                  </div>
                )
              })}
            </div>
          }
        </div>
      } 
    </div>
  );
};
export default DisableApplicants;