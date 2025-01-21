import { useContext, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import tailwindConfig from "../../tailwind.config";
import resolveConfig from 'tailwindcss/resolveConfig';
import useAxios from "../hooks/UseAxios";
import { ApplicationContext } from "../context/ApplicationContext";
import { UserContext } from "../context/UserContext";


const fullConfig = resolveConfig(tailwindConfig);

const StatusTextColor = {
    draft: fullConfig.theme.colors.black.default,
    submitted: fullConfig.theme.colors.info.default,
    changes_requested: fullConfig.theme.colors.warning.default,
    approved: fullConfig.theme.colors.success.default,
    rejected: fullConfig.theme.colors.danger.default,
};

const StatusBgColor = {
    draft: fullConfig.theme.colors.black['100'],
    submitted: fullConfig.theme.colors.info['100'],
    changes_requested: fullConfig.theme.colors.warning['300'],
    approved: fullConfig.theme.colors.success['300'],
    rejected: fullConfig.theme.colors.danger['300'],
};

const SelectStatus = () => {

    const { applicationInfo } = useContext(ApplicationContext);
    const { userData } = useContext(UserContext);
    const { data, loading, fetchData } = useAxios(`applications/${applicationInfo?.application_id}`, 'get', { headers: {Authorization: `Bearer ${userData.token}`} })
    const UpdateStatus = useAxios(`applications/${applicationInfo?.application_id}/approve`, 'post', { headers: {Authorization: `Bearer ${userData.token}`} })

    useEffect(() => {
        const getApplicationData = async () => {
            await fetchData();
        };
        getApplicationData();
    }, []);

    const updateStatus = async (value) => {
        await UpdateStatus.fetchData({ data: {"status" : value} });
        fetchData();
    }

    return(
        <>
            {
                loading ? <div className="text-primary-default">Loading...</div> :
                <div className="group relative cursor-pointer">
                    <div 
                        className="text-base font-medium leading-5 text-center py-2 px-5 rounded-full capitalize flex items-center"
                        style={{color: StatusTextColor[data?.status], backgroundColor: StatusBgColor[data?.status]}}
                    >
                        {data?.status}
                        <IoIosArrowDown 
                            className={`ml-2 ease-linear duration-300 group-hover:rotate-180`} 
                            color={StatusTextColor[data?.status]}
                        />
                    </div>
                    <div className="invisible opacity-0 translate-y-4 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 bg-white-default w-max absolute shadow-md top-10 right-0 rounded-md z-50 ease-linear duration-300">
                        <ul className="transition-all text-black-default py-2 px-4">
                            {['draft', 'submitted', 'changes_requested', 'approved', 'rejected'].map((status) => {
                                return(
                                    <li key={status} className="py-1" onClick={() => updateStatus(status)}>
                                        <span className="capitalize text-base font-medium text-black-300 hover:text-primary-default">{status}</span>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            }
        </>
    )
}

export default SelectStatus;