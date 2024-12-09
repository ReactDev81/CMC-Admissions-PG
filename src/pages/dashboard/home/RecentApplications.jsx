import OutlineButton from "../../../components/ui/OutlineButton"; 
import { BsThreeDots } from "react-icons/bs";
import Applications from "../../../assets/api/RecentApplications"

import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../../../tailwind.config';

const fullConfig = resolveConfig(tailwindConfig);

const StatusColors = {
    progress: fullConfig.theme.colors.warning.default,
    completed: fullConfig.theme.colors.success.default,
    canceled: fullConfig.theme.colors.danger.default,
};

const StatusLightColors = {
    progress: fullConfig.theme.colors.warning['300'],
    completed: fullConfig.theme.colors.success['300'],
    canceled: fullConfig.theme.colors.danger['300'],
};

const RecentApplications = () => {

    return (
        <div className="recent-applications bg-white-default rounded-[10px] boxShadow-1x">
            <div className="flex justify-between items-center bg-white-default p-5 rounded-lg">
                <h2 className="text-black-default">Recent Applications</h2>
                <OutlineButton
                    text="View All"
                    className="text-primary-default border-primary-default px-6 py-2"
                />
            </div>
            <table className="w-full">
                <thead className="bg-primary-100">
                    <tr>
                        <th className="text-black-default text-base font-medium px-5 py-3 text-left">Application Name</th>
                        <th className="text-black-default text-base font-medium px-5 py-3 text-left">Email</th>
                        <th className="text-black-default text-base font-medium px-5 py-3 text-left">Progress</th>
                        <th className="text-black-default text-base font-medium px-5 py-3 text-left">Status</th>
                        <th className="text-black-default text-base font-medium px-5 py-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Applications && 
                        Applications.map((application, index) => {
                            return(
                                <tr key={index} className={`${Applications.length === index + 1 ? 'border-0' : 'border-b'}`}>
                                    <td className="text-black-default text-left text-base font-medium px-5 py-3.5">
                                        <div className="flex flex-wrap items-center gap-2.5 ">
                                            <img
                                                src={application.image}
                                                className="h-10 w-10 object-cover rounded-full"
                                                alt=""
                                            />
                                            <p className="text-black-default text-left text-base font-medium">{application.name}</p>
                                        </div>
                                    </td>
                                    <td className="text-black-default text-base font-normal px-5 py-3.5">{application.email}</td>
                                    <td className="px-5 py-3.5">
                                        <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-yellow-500" 
                                                style={{
                                                    width: application.progress_value + '%', 
                                                    backgroundColor: StatusColors[application.status]
                                                }}
                                            ></div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <div className="rounded-full w-fit" style={{backgroundColor: StatusLightColors[application.status]}}>
                                            <p className="capitalize text-base font-medium px-4 py-1.5" style={{color: StatusColors[application.status]}}>{application.status}</p>
                                        </div>
                                    </td>
                                    <td className="text-base text-left font-normal text-black-default px-5 py-3.5">
                                        <BsThreeDots className="text-black-200 text-2xl" />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};
export default RecentApplications;