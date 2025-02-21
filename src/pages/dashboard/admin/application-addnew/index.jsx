import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import UseTab from "../../../../hooks/UseTab";
import PersonalInfo from "./PersonalInfo";
import AcademicDetails from "./AcademicDetails";
import Documents from "./Documents";
import TransactionDetails from "./TransactionDetails";

const AddNewApplication = () => {

    const [applicationId, setApplicationId] = useState(null);

    const tabsData = [
        {
            label: {
                icon: <FaRegUser />,
                text: "Personal Information",
            },
            content: ({activeTab, setActiveTab}) => (
                <PersonalInfo activeTab={activeTab} setActiveTab={setActiveTab} setApplicationId={setApplicationId} />
            ),
        },
        {
            label: {
                icon: <HiOutlineAcademicCap size={20} />,
                text: "Academic Details",
            },
            content: ({activeTab, setActiveTab}) => (
                <AcademicDetails activeTab={activeTab} setActiveTab={setActiveTab} applicationId={applicationId} />
            ),
        },
        {
            label: {
                icon: <IoDocumentTextOutline size={20} />,
                text: "Documents",
            },
            content: ({activeTab, setActiveTab}) => (
                <Documents activeTab={activeTab} setActiveTab={setActiveTab} applicationId={applicationId} />
            ),
        },
        {
            label: {
                icon: <MdOutlinePayment size={20} />,
                text: "Transaction Details",
            },
            content: ({activeTab, setActiveTab}) => (
                <TransactionDetails activeTab={activeTab} setActiveTab={setActiveTab} applicationId={applicationId} />
            )
        },
    ];

    return(
        <div className="flex flex-col flex-1 shadow-flex rounded-lg bg-white-default">
            <UseTab tabs={tabsData} TabStyle={1} tabClass="p-5 border-b border-solid border-black-100" />
        </div>
    )
}

export default AddNewApplication;