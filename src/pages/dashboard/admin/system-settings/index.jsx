import { useContext, useEffect } from "react";
import { UserContext } from "../../../../context/UserContext";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { LuMail } from "react-icons/lu";
import { MdOutlineCached } from "react-icons/md";
import UseAxios from "../../../../hooks/UseAxios"
import UseTab from "../../../../hooks/UseTab";
import General from "./general";
import Notification from "./notification";
import Mail from "./mail";
import Cache from "./cache";

const SystemSettings = () => {

  const { userData } = useContext(UserContext);

  const systemSettings = UseAxios('/settings', 'get', { headers: { Authorization: `Bearer ${userData.token}` } })
  const systemSettingsData = systemSettings.data;

  useEffect(() => {
    const fetchSystemSettings = async () => {
      await systemSettings.fetchData()
    };
    fetchSystemSettings();
  }, []);

  // Extract children data based on the `key`
  const getChildrenByKey = (key) => {
    return systemSettingsData?.find(item => item.key === key)?.children || [];
  };

  const tabsData = [
    {
      label: {
        icon: <FaRegUser />,
        text: "General",
      },
      content: ({activeTab, setActiveTab}) => (
        <General activeTab={activeTab} setActiveTab={setActiveTab} data={getChildrenByKey("general_settings")} />
      ),
    },
    {
      label: {
        icon: <MdOutlineNotificationsNone size={20} />,
        text: "Notifications",
      },
      content: ({activeTab, setActiveTab}) => (
        <Notification activeTab={activeTab} setActiveTab={setActiveTab} />
      ),
    },
    {
      label: {
        icon: <LuMail size={18} />,
        text: "Mail",
      },
      content: ({activeTab, setActiveTab}) => (
        <Mail activeTab={activeTab} setActiveTab={setActiveTab} data={getChildrenByKey("mail_settings")} />
      ),
    },
    {
      label: {
        icon: <MdOutlineCached size={20} />,
        text: "Cache",
      },
      content: ({activeTab, setActiveTab}) => (
        <Cache activeTab={activeTab} setActiveTab={setActiveTab} data={getChildrenByKey("cache_settings")} />
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
