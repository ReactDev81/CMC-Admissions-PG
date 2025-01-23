import { FaRegUser } from "react-icons/fa";
import UseTab from "../../../../hooks/UseTab";
import General from "./general";
import Notification from "./notification";
import Mail from "./mail";
import Cache from "./cache";

const SystemSettings = () => {
  const tabsData = [
    {
      label: {
        icon: <FaRegUser />,
        text: "General",
      },
      content: ({activeTab, setActiveTab}) => (
        <General activeTab={activeTab} setActiveTab={setActiveTab} />
      ),
    },
    {
      label: {
        icon: <FaRegUser />,
        text: "Notifications",
      },
      content: ({activeTab, setActiveTab}) => (
        <Notification activeTab={activeTab} setActiveTab={setActiveTab} />
      ),
    },
    {
      label: {
        icon: <FaRegUser />,
        text: "Mail",
      },
      content: ({activeTab, setActiveTab}) => (
        <Mail activeTab={activeTab} setActiveTab={setActiveTab} />
      ),
    },
    {
      label: {
        icon: <FaRegUser />,
        text: "Cache",
      },
      content: ({activeTab, setActiveTab}) => (
        <Cache activeTab={activeTab} setActiveTab={setActiveTab} />
      ),
    },
  ];
  return (
      <div className="shadow-flex rounded-lg bg-white-default">
        <UseTab tabs={tabsData} TabStyle={1} tabClass="p-5 border-b border-solid border-black-100" />
      </div>
  );
};

export default SystemSettings;
