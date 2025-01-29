import { useEffect, useContext } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6"; 
import { BsBarChartLine } from "react-icons/bs";
import { MdPendingActions } from "react-icons/md";
import { BiTask } from "react-icons/bi";
import { LuClipboardList } from "react-icons/lu";
import { UserContext } from "../../../../context/UserContext";
import useAxios from "../../../../hooks/UseAxios";
import Calender from "./Calender";
import Cards from "./Cards"; 
import DisableApplicants from "./DisableApplicants";
import RecentApplications from "./RecentApplications";


const Dashboard = () => {

  const { userData } = useContext(UserContext);
  const {data, loading, fetchData} = useAxios(`/dashboard`, 'get', {headers: {Authorization: `Bearer ${userData.token}`}})

  useEffect(() => {
    const getApplicationInfo = async () => {
        await fetchData();
    };
    getApplicationInfo();
  }, [])

  return (
    <div className="flex flex-wrap">
      <div className="flex-[0_0_75%] pr-5">
        <div className="flex flex-wrap gap-5 mb-6">
            {loading ? Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="animate-pulse flex flex-col justify-between flex-1 p-5 bg-white-default rounded-[10px] shadow-flex">
                  <div className="h-2.5 bg-gray-200 rounded-full w-full mb-2"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-2"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full w-40"></div>
                  <div className="flex items-center justify-between">
                      <div>
                          <div className="w-40 h-2 bg-gray-200 rounded-full mb-2"></div>
                          <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
                      </div>
                      <svg className="w-14 h-14 ml-3 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                      </svg>
                  </div>
                </div>
            )) : data && data.map((application, index) => {

                const colors = ['#EAB300', '#C95E9E', '#48A3D7'];
                const bgColor = colors[index % colors.length];

                const roundedicon = application.id === "total_applications"
                    ? <LuClipboardList />
                    : application.id === "completed_applications"
                    ? <BiTask />
                    : application.id === "pending_applications"
                    ? <MdPendingActions />
                    : <BsBarChartLine />;

                const isNegative = parseFloat(application.percentage_change) < 0;
                const arrowIcon = isNegative ? <FaArrowDown className="text-danger-default" /> : <FaArrowUp className="text-success-default" />;
                const numberColor = isNegative ? "text-danger-default" : "text-success-default";
                const arrowbgColor = isNegative ? "bg-danger-300" : "bg-success-300";

                return(
                  <Cards
                    key={index}
                    count={application.count}
                    title={application.title}
                    numbertext={application.percentage_change}
                    roundedicon={roundedicon}
                    roundedIconBgColor={bgColor}
                    arrowicon={arrowIcon}
                    arrowbgColor={arrowbgColor}
                    numbercolor={numberColor}
                  />
                )
            })
          }
        </div>
        <RecentApplications />
      </div>
      <div className="flex-[0_0_25%]">
        <div>
          <Calender />
          <DisableApplicants />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
