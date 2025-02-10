import { useContext, useEffect, useState } from "react";
import { LuUser } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { GoChecklist } from "react-icons/go";
import { HiOutlineDocumentDuplicate } from "react-icons/hi2";
import { UserContext } from "../../../../context/UserContext";
import { ApplicationContext } from "../../../../context/ApplicationContext";
import useAxios from "../../../../hooks/UseAxios";
import Title from "../../../../components/ui/Title";
import Button from "../../../../components/ui/Button";
import UserCard from "./UserCard";
import ResetPassword from "./ResetPassword";
import Loader from "../../../../components/ui/Loader";
import ApplicantRemark from "./popup/ApplicantRemark";

const UserHome = () => {

    const { userData } = useContext(UserContext);
    const { applicationInfo } = useContext(ApplicationContext);
    const [isRemarkOpen, setIsRemarkOpen] = useState(false);
    var passwordReset = userData.userDetails.password_changed;

    const PaymentDetails = useAxios('/pages/2', 'get');
    const getAllRemark = useAxios(`/applications/${applicationInfo.application_id}/remarks`, 'get', {headers: { Authorization: `Bearer ${userData.token}` },});

    useEffect(() => {
        PaymentDetails.fetchData();
        getAllRemark.fetchData();
    }, [])

    const hasPending = getAllRemark.data?.some(remark => remark.status === "pending");

    return (
        !passwordReset ? <ResetPassword /> :
        <>
            {hasPending && 
                <>
                    <div className="border border-danger-default rounded-3xl bg-danger-300 p-5 mb-5">
                        <p className="text-danger-default mb-4">Some Changes has been asked by the Administration. Please fulfill them to make your application approve.</p>
                        <Button 
                            onclick={() => setIsRemarkOpen(true)}
                            text="Provide Changes" 
                            classname="[&]:rounded-full [&]:px-7" 
                        />
                    </div>

                    {isRemarkOpen && (
                        <div className="fixed inset-0 bg-black bg-[#1f1e1e80] flex items-start justify-end z-50">
                            <ApplicantRemark onClose={() => setIsRemarkOpen(false)} />
                        </div>
                    )}
                </>
            }

            <div className="flex">
                <div className="min-w-[406px] pr-5">
                    <div className="flex flex-col gap-5">
                        <UserCard
                            className="bg-info-100"
                            icon={
                                <LuUser className="size-[60px] text-info-default" />
                            }
                            titletext={
                                <Title
                                    title="Aisha Sharma"
                                    classname="font-medium [&]:text-black-300 capitalize"
                                />
                            }
                            textlink="View Profile"
                            btntext="Active"
                            textcolor="text-parrotgreen-default"
                            bgcolor="bg-parrotgreen-200"
                        />

                        <UserCard
                            className="bg-purple-100"
                            icon={
                                <GoChecklist className="size-[60px] text-purple-default" />
                            }
                            titletext={
                                <Title
                                    title="Application"
                                    classname="font-medium [&]:text-black-300 capitalize"
                                />
                            }
                            textlink="2024-1234"
                            btntext="Completed"
                            textcolor="text-parrotgreen-default"
                            bgcolor="bg-parrotgreen-200"
                        />

                        <UserCard
                            className="bg-warning-300"
                            icon={
                                <HiOutlineDocumentDuplicate className="size-[60px] text-warning-default" />
                            }
                            titletext={
                                <Title
                                    title="Documents"
                                    classname="font-medium [&]:text-black-300 capitalize"
                                />
                            }
                            textlink="8 Documents"
                            btntext="Pending"
                            textcolor="text-warning-default"
                            bgcolor="bg-warning-300"
                        />
                    </div>
                </div>
                <div className="flex flex-1 bg-white-default rounded-xl shadow-flex">
                    <div className="home-content text-black-default p-5">
                        {PaymentDetails.loading ? Loader : <div dangerouslySetInnerHTML={{ __html: PaymentDetails.data?.content }}></div>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserHome;
