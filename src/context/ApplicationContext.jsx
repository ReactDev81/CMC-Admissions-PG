import { createContext, useState, useEffect} from "react";

export const ApplicationContext = createContext();
const ApplicationProvider = ({ children }) => {

    const applicationInformation = {
        application_id: null,
        steps:{
            step_personal: 'pending',
            step_academic: 'pending',
            step_documents: 'pending',
            step_payment: 'pending',
        }
    }

    const [applicationInfo, setApplicationInfo] = useState(() => {
        const savedApplicationInfo = localStorage.getItem('application_information');
        return savedApplicationInfo ? JSON.parse(savedApplicationInfo) : applicationInformation;
    });

    useEffect(() => {
        localStorage.setItem('application_information', JSON.stringify(applicationInfo));
    }, [applicationInfo])

    const updateStepStatus = (stepKey, status) => {
        setApplicationInfo((prevInfo) => ({
            ...prevInfo,
            steps: {
                ...prevInfo.steps,
                [stepKey]: status,
            },
        }))
    } 

    return(
        <ApplicationContext.Provider value={{applicationInfo, setApplicationInfo, updateStepStatus}}>
            {children}
        </ApplicationContext.Provider>
    )
}
export default ApplicationProvider
