import { PiUserCircleDuotone } from "react-icons/pi";

const ApplicationInfoCard = () => {
    return(
        <div className="w-full h-max p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
            <div className="flex items-center mb-4">
                <PiUserCircleDuotone className="text-black-default" size={140} />
                <div>
                    <div className="h-7 w-20 rounded-full mb-3 border border-primary-default"></div>
                    <div className="h-7 w-20 rounded-full bg-primary-200"></div>
                </div>
            </div>
            <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full"></div>
            <div className="h-8 w-full mt-4 rounded-full bg-primary-200"></div>
        </div>
    )
}

export default ApplicationInfoCard;