import PersonalInformation from "./PersonalInformation";
import AcademicDetail from "./academic-details/index";
import ApplicationDocument from "./ApplicationDocument";
import TransactionDetail from "./TransactionDetail";
import ApplicationDetailCard from "./ApplicationDetailCard";
import { FaRegUser } from "react-icons/fa";
import UseTab from "../../../../hooks/UseTab";

const ApplicationDetails = () => {

  const tabsData = [
    {
      label: {
        icon: <FaRegUser />,
        text: "Personal Information",
      },
      content: ({activeTab, setActiveTab}) => (
        <PersonalInformation activeTab={activeTab} setActiveTab={setActiveTab} />
      ),
    },
    {
      label: {
        icon: <FaRegUser />,
        text: "Academic Details",
      },
      content: ({activeTab, setActiveTab}) => (
        <AcademicDetail activeTab={activeTab} setActiveTab={setActiveTab} />
      ),
    },
    {
      label: {
        icon: <FaRegUser />,
        text: "Documents",
      },
      content: ({activeTab, setActiveTab}) => (
        <ApplicationDocument activeTab={activeTab} setActiveTab={setActiveTab} />
      ),
    },
    {
      label: {
        icon: <FaRegUser />,
        text: "Transaction Details",
      },
      content: ({activeTab, setActiveTab}) => (
        <TransactionDetail activeTab={activeTab} setActiveTab={setActiveTab} />
      )
    },
  ];
  return (
    <div className="flex flex-wrap gap-5">
      <div className="flex flex-wrap max-w-96 w-full">
        <ApplicationDetailCard />
      </div>
      <div className="flex flex-col flex-1 shadow-flex rounded-lg bg-white-default">
        <UseTab tabs={tabsData} TabStyle={1} tabClass="p-5 border-b border-solid border-black-100" />
      </div>
    </div>
  );
};

export default ApplicationDetails;

