import Cards from "./Cards"; 
import DisableApplicants from "./DisableApplicants";
import Calender from "./Calender";
import RecentApplications from "./RecentApplications";
import { FaArrowDown } from "react-icons/fa6"; 
import { BsBarChartLine } from "react-icons/bs";
const Dashboard = () => {
  return (
    <div className="flex flex-wrap">
      <div className="flex-[0_0_75%] pr-5">
        <div className="flex flex-wrap gap-5 mb-6">
          <Cards
            title="128"
            subtitle="Applications Complete"
            downarrowicon={<FaArrowDown />}
            numbertext="- 17.06%"
            text="than last 6 month"
            roundedicon={<BsBarChartLine />}
            classname="bg-warning-default"
            arrowbg="bg-danger-300"
            arrowicon="text-danger-default"
            numbercolor="text-danger-default" 
          />
          <Cards
            title="72"
            subtitle="total applications"
            downarrowicon={<FaArrowDown />}
            numbertext="- 17.06%"
            text="than last 6 month"
            roundedicon={<BsBarChartLine />}
            classname="bg-purple-default"
            arrowbg="bg-parrotgreen-200"
            arrowicon="text-parrotgreen-default" 
            numbercolor="text-parrotgreen-default" 
          />
          <Cards
            title="40%"
            subtitle="Pending Applications"
            downarrowicon={<FaArrowDown />}
            numbertext="- 17.06%"
            text="than last 6 month"
            roundedicon={<BsBarChartLine />}
            classname="bg-info-default"
            arrowbg="bg-danger-300"
            arrowicon="text-danger-default" 
            numbercolor="text-danger-default" 
          />
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
