import { FaHome } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import UseTab from "../../../../hooks/UseTab";
import HomeInstructions from "./HomeInstructions";
import PaymentDetails from "./PaymentDetails";

const tabsData = [
    {
        label: {
            icon: <FaHome />,
            text: 'Home Instructions',
        },
        content: ({activeTab, setActiveTab}) => (
            <HomeInstructions activeTab={activeTab} setActiveTab={setActiveTab} />
        )
    },
    {
        label: {
            icon: <MdOutlinePayment size={18} />,
            text: 'Payment Details',
        },
        content: ({activeTab, setActiveTab}) => (
            <PaymentDetails activeTab={activeTab} setActiveTab={setActiveTab} />
        )
    }
]

const Pages = () => {
    return(
        <div className="shadow-flex rounded-lg bg-white-default">
            <UseTab tabs={tabsData} tabClass="p-5 border-b border-solid border-black-100" />
        </div>
    )
}

export default Pages;