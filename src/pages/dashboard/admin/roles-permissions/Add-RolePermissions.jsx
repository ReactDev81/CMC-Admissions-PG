import UseTab from "../../../../hooks/UseTab";
import Roles from "./add/Roles";
import Permissions from "./add/Permissions";

const AddRolePermissions = () => {
  const tabsData = [
    {
      label: {
        text: "Add Role",
      },
      content: ({activeTab, setActiveTab}) => (
        <Roles activeTab={activeTab} setActiveTab={setActiveTab} />
      ), 
    },
    {
      label: {
        text: "Add Permissions",
      },
      content: ({activeTab, setActiveTab}) => (
        <Permissions activeTab={activeTab} setActiveTab={setActiveTab} />
      ), 
    },
  ];

  return (
    <div className="shadow-flex rounded-lg bg-white-default">
      <UseTab tabs={tabsData} TabStyle={1} tabClass="border-b-0 p-5 pb-0" />
    </div>
  );
};

export default AddRolePermissions;
