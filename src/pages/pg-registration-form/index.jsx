import PersonalInfo from "./PersonalInfo";
import AcademicInfo from "./AcademicInfo";
import Document from "./Document";
import Payment from "./Payment";
import StudentHeader from "../../components/common/StudentHeader";
import { FaRegUser } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import UseTab from "../../hooks/UseTab";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { ApplicationContext } from "../../context/ApplicationContext";
import useAxios from "../../hooks/UseAxios";
import { useEffect } from "react";

const RegistrationForm = () => {

  const { userData } = useContext(UserContext);
  const { applicationInfo, setApplicationInfo } = useContext(ApplicationContext);

  const Token = userData.token;
  const ApplicationId = applicationInfo.application_id;

  const { data, fetchData, status } = useAxios(`/applications/${ApplicationId}`, 'get', { headers: {Authorization: `Bearer ${Token}`} });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if([200, 201, 202].includes(status)) {
      setApplicationInfo(() => ({
        application_id: data.id,
        steps:{
          step_personal: data.steps?.step_personal ? data.steps.step_personal : 'pending',
          step_academic: data.steps?.step_academic ? data.steps.step_academic : 'pending',
          step_documents: data.steps?.step_documents ? data.steps.step_documents : 'pending',
          step_payment: data.steps?.step_payment ? data.steps.step_payment : 'pending',
        },
      }))
    }
  }, [status]);

  const tabsData = [
    {
      label: {
        icon: <FaRegUser />,
        text: "Personal Info",
      },
      content: ({activeTab, setActiveTab}) => (
        <PersonalInfo activeTab={activeTab} setActiveTab={setActiveTab}  />
      ),
    },
    {
      label: {
        icon: <HiOutlineAcademicCap size={24} />,
        text: "Academic Info",
      },
      content: ({activeTab, setActiveTab}) => (
        <AcademicInfo activeTab={activeTab} setActiveTab={setActiveTab} />
      ),
    },
    {
      label: {
        icon: <IoDocumentTextOutline size={22} />,
        text: "Documents",
      },
      content: ({activeTab, setActiveTab}) => (
        <Document activeTab={activeTab} setActiveTab={setActiveTab} />
      ), 
    },
    {
      label: {
        icon: <MdOutlinePayment size={22} />,
        text: "Payments",
      },
      content: ({activeTab, setActiveTab}) => (
        <Payment activeTab={activeTab} setActiveTab={setActiveTab} />
      )
    },
  ];

  return (
    <>
      {userData.token === '' && <StudentHeader />}
      
      <div className="w-full">
        <div className="py-12">
          <h1 className="text-center text-black-default">PG Registration form</h1>
        </div>
        <div className="shadow-flex rounded-lg max-w-lg w-full bg-white-default mx-auto mb-10">
          <UseTab 
            tabs={tabsData} 
            TabStyle={2} 
            className="py-5" 
            tabClass="[&&]:gap-x-20 justify-center py-6 before:content-[''] before:absolute before:top-12 before:w-[45%] before:h-px before:bg-black-100" 
          />
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;
