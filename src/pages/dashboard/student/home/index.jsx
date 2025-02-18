import { useContext, useEffect, useState } from "react";
import { LuUser } from "react-icons/lu";
import { GoChecklist } from "react-icons/go";
import { HiOutlineDocumentDuplicate } from "react-icons/hi2";
import { UserContext } from "../../../../context/UserContext";
import { ApplicationContext } from "../../../../context/ApplicationContext";
import useAxios from "../../../../hooks/UseAxios";
import Button from "../../../../components/ui/Button";
import UserCard from "./UserCard";
import ResetPassword from "./ResetPassword";
import Loader from "../../../../components/ui/Loader";
import ApplicantRemark from "./popup/ApplicantRemark";

const formatDocumentName = (name) => {
    return name
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase()); 
};

const UserHome = () => {

    const { userData } = useContext(UserContext);
    const { applicationInfo } = useContext(ApplicationContext);
    const [isRemarkOpen, setIsRemarkOpen] = useState(false);
    var passwordReset = userData.userDetails.password_changed;

    const PaymentDetails = useAxios('/pages/2', 'get');
    const GetAllRemark = useAxios(`/applications/${applicationInfo.application_id}/remarks`, 'get', {headers: { Authorization: `Bearer ${userData.token}` }});
    const DashboardWidget = useAxios('/dashboard', 'get', {headers: { Authorization: `Bearer ${userData.token}` }});

    useEffect(() => {
        Promise.all([
            PaymentDetails.fetchData(),
            GetAllRemark.fetchData(),
            DashboardWidget.fetchData()
        ]);
    }, [])

    const hasPending = passwordReset ? GetAllRemark.data && GetAllRemark.data.some(remark => remark.status === "pending") : '';

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
                        {DashboardWidget.loading ? <Loader /> : DashboardWidget.data &&
                            DashboardWidget.data.map((widget, index) => {

                                const iconMap = {
                                    'profile': <LuUser size={60} className="text-info-default" />,
                                    'application': <GoChecklist size={60} className="text-purple-default" />,
                                    'documents': <HiOutlineDocumentDuplicate size={60} className="text-warning-default" />
                                };

                                const iconBgColor = {
                                    'profile': "bg-info-100",
                                    'application': "bg-purple-100",
                                    'documents': "bg-warning-300"
                                };

                                const statusStyles = {
                                    profile: {
                                        active: { text: "text-success-default", bg: "bg-success-300" },
                                        inactive: { text: "text-danger-default", bg: "bg-danger-300" }
                                    },
                                    application: {
                                        draft: { text: "text-black-default", bg: "bg-black-100" },
                                        submitted: { text: "text-info-default", bg: "bg-info-100" },
                                        changes_requested: { text: "text-warning-default", bg: "bg-warning-300" },
                                        approved: { text: "text-success-default", bg: "bg-success-300" },
                                        rejected: { text: "text-danger-default", bg: "bg-danger-300" }
                                    },
                                    documents: {
                                        pending: { text: "text-warning-default", bg: "bg-warning-300" },
                                        complete: { text: "text-success-default", bg: "bg-success-300" }
                                    }
                                };

                                const statusBgColor = statusStyles[widget.id]?.[widget.status].bg || { bg: "bg-gray-200" };
                                const statusTextColor = statusStyles[widget.id]?.[widget.status].text || { text: "text-gray-700" };

                                return(
                                    <UserCard
                                        key={index}
                                        className={iconBgColor[widget.id]}
                                        icon={iconMap[widget.id] || null}
                                        titletext={widget.title}
                                        linktext={widget.button_text}
                                        link={widget.button_link}
                                        btntext={formatDocumentName(widget.status)}
                                        textcolor={statusTextColor}
                                        bgcolor={statusBgColor}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                <div className="flex flex-1 bg-white-default rounded-xl shadow-flex">
                    <div className="home-content text-black-default p-5">
                        {PaymentDetails.loading ? <Loader /> : <div dangerouslySetInnerHTML={{ __html: PaymentDetails.data?.content }}></div>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserHome;
