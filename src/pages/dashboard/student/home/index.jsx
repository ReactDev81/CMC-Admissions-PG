import { useContext, useEffect } from "react";
import { LuUser } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { GoChecklist } from "react-icons/go";
import { HiOutlineDocumentDuplicate } from "react-icons/hi2";
import { UserContext } from "../../../../context/UserContext";
import useAxios from "../../../../hooks/UseAxios";
import Title from "../../../../components/ui/Title";
import UserCard from "./UserCard";
import ResetPassword from "./ResetPassword";
import Loader from "../../../../components/ui/Loader";

const UserHome = () => {

    const {userData} = useContext(UserContext);
    var passwordReset = userData.userDetails.password_changed;

    const PaymentDetails = useAxios('/pages/2', 'get', { headers: { Authorization: `Bearer ${userData.token}` } })

    useEffect(() => {
        PaymentDetails.fetchData();
    }, [])

    return (
        <>
            {!passwordReset ? <ResetPassword /> :
                <>
                    <div className="flex items-center justify-between bg-parrotgreen-200 px-5 py-2.5 rounded-full border border-parrotgreen-default mb-5">
                        <p className="text-parrotgreen-default">
                            Lorem ipsum dolor sit amet consectetur adipiscing elit etiam ac
                            nunc gravida, vel vitae varius purus sapien facilisis netus eros
                        </p>
                        <RxCross2 className="text-parrotgreen-default" />
                    </div>

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
                            <div className="text-black-default p-5">
                                {PaymentDetails.loading ? Loader : <div dangerouslySetInnerHTML={{ __html: PaymentDetails.data?.content }}></div>}
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
};

export default UserHome;
