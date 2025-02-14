import { useEffect, useContext } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6"; 
import { BsBarChartLine } from "react-icons/bs";
import { MdPendingActions } from "react-icons/md";
import { BiTask } from "react-icons/bi";
import { LuClipboardList } from "react-icons/lu";
import { UserContext } from "../../../../context/UserContext";
import useAxios from "../../../../hooks/UseAxios";
import ApplicationStatusCard from "../../../../components/Skeleton/ApplicationStatusCard";
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
              <ApplicationStatusCard key={index} /> 
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
