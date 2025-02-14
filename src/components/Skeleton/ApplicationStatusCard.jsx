const ApplicationStatusCard = () => {
    return(
        <div className="animate-pulse flex flex-col justify-between flex-1 p-5 bg-white-default rounded-[10px] shadow-flex">
            <div className="h-2.5 bg-gray-200 rounded-full w-full mb-2"></div>
            <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-2"></div>
            <div className="h-2.5 bg-gray-200 rounded-full w-40"></div>
            <div className="flex items-center justify-between">
                <div>
                    <div className="w-40 h-2 bg-gray-200 rounded-full mb-2"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
                </div>
                <svg className="w-14 h-14 ml-3 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                </svg>
            </div>
        </div>
    )
}

export default ApplicationStatusCard;