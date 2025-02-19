import { useContext, useEffect } from "react";
import { PiChurch } from "react-icons/pi";
import { ApplicationContext } from "../../../../context/ApplicationContext";
import { UserContext } from "../../../../context/UserContext";
import useAxios from "../../../../hooks/UseAxios";
import Title from "../../../../components/ui/Title";
import ChangePassword from "./ChangePassword";
import Loader from "../../../../components/ui/Loader";

const Profile = () => {

    const { userData } = useContext(UserContext);
    const { applicationInfo } = useContext(ApplicationContext);
    const { data, loading,  fetchData } = useAxios(`/applications/${applicationInfo.application_id}`, 'get', { headers: { Authorization: `Bearer ${userData.token}` } })

    useEffect(() => {
        fetchData();
    }, [])
    
    return (
        <>
            <div className="flex flex-col mb-5 bg-white-default rounded-md">
                <div className="w-full">
                    <img
                        src="/assets/images/profile-bg.png"
                        className="h-[150px] w-full object-cover object-center rounded-t-md"
                        alt="Profile Bg"
                    />
                </div>
                {loading ? <Loader /> : data && 
                    <div className="max-w-[1192px] w-full flex items-center px-5 gap-3.5">
                        <div className="relative -top-9">
                            <img
                                src={data.applicant.profile_pic_url ? data.applicant.profile_pic_url : "/assets/avatars/user-placeholder.png"}
                                className="h-[150px] w-[150px] [&]:max-w-[150px] rounded-full object-cover"
                                alt="User Profile Avatar"
                            />
                        </div>
                        <div className="w-full">
                            <Title
                                title={data.name}
                                classname="text-3xl font-medium mb-2.5"
                            />
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-black-200 mb-3">
                                        Registeration ID : {data.bfuhs_regstration_id}
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <p className="text-black-200 flex items-center">
                                            <PiChurch className="mr-1.5" />
                                            {data.body_church_cmc_ludhiana ? data.body_church_cmc_ludhiana : ''}
                                        </p>
                                        <span className="text-black-200">|</span>
                                        <p className="text-black-200 flex items-center">
                                            <PiChurch className="mr-1.5" />
                                            {data.correspondence_address}, {data.city}.
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-black-200 mb-3">
                                        Date of Birth : {data.dob}
                                    </p>
                                    <p className="text-black-200 capitalize">Gender : {data.gender}</p>
                                </div>
                                <div>
                                    <p className="text-black-200 mb-3">
                                        Phone Number : {data.mobile_1}
                                    </p>
                                    <p className="text-black-200">
                                        Email : {data.applicant.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <ChangePassword />
        </>
    );
};
export default Profile;