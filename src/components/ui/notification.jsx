import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { RxCross2 } from "react-icons/rx"; 
import { IoNotifications } from "react-icons/io5";
import { RiZzzFill } from "react-icons/ri";
import { MdNotifications } from "react-icons/md";
import { UserContext } from "../../context/UserContext";
import UseAxios from "../../hooks/UseAxios";
import Button from "../../components/ui/Button";

const Notification = () => {

    const { userData } = useContext(UserContext);
    const navigate  = useNavigate();
    const isPasswordReset = userData.userDetails.password_changed;
    const {data, fetchData} = UseAxios('/notifications', 'get', { headers: { Authorization: `Bearer ${userData.token}` } });
    const readNotifications = UseAxios(null, 'post', { headers: { Authorization: `Bearer ${userData.token}` } });

    const handleReadNotification = async (notificationId) => {
        await readNotifications.fetchData({ 
            url: `/notifications/${notificationId}/read` 
        });
    }

    useEffect(() => {
        if (readNotifications.status === 200) {
            toast.success(readNotifications.data.message);
        }
    }, [readNotifications.loading]);
    
    useEffect(() => {
        const getNotificationData = async () => {
            await fetchData();
        };
        getNotificationData();
    }, [])

    // console.log('data', data);

    return (
        <div className="invisible opacity-0 translate-y-[30px] group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 bg-white-default absolute shadow-md w-80 top-12 -right-5 rounded-md z-50 ease-linear duration-300">
            <ul className="transition-all text-black-default">
                <div className="border-dotted border-b-2 px-5 py-3.5">
                    <h1 className="text-black-default text-center text-xl font-medium">
                        Notifications
                    </h1>
                </div>

                {isPasswordReset && Array.isArray(data) && (() => {
                    const unreadNotifications = data.filter(notification => !notification.read_at);
                    if (unreadNotifications.length === 0) {
                        return(
                            <div className="flex flex-col justify-center items-center text-center p-5">
                                <div className="relative bg-white-300 rounded-full p-4">
                                    <IoNotifications
                                        size={100}
                                        color="#92929242"
                                    />
                                    <RiZzzFill className="absolute size-12 top-1 -left-2" color="#92929242" />
                                    <div className="h-8 w-8 bg-black-default text-white-default justify-center items-center rounded-full flex absolute top-[30px] right-6">0</div>
                                </div>
                                <p className="text-black-default font-semibold text-xl pt-4 pb-2">
                                    Currently, nothing to report!
                                </p>
                                <p className="text-gray-500">
                                    This area will light up with new notifications once there's
                                    activity in your workspaces.
                                </p>
                            </div>
                        )
                    }
                    const visibleNotifications = unreadNotifications.slice(0, 3);
                    return (
                        <>
                            {visibleNotifications.map(notification => (
                                <li className="mx-4" key={notification.id}>
                                    <div className="flex items-center gap-4 py-3 px-4 my-3 bg-white-300 rounded-md justify-between">
                                        <div className="flex gap-2.5">
                                            <span className="bg-purple-100 p-2 rounded-full self-center">
                                                <MdNotifications size={20} className="text-purple-default" />
                                            </span>
                                            <div>
                                                <p className="text-base font-medium text-black-default uppercase">
                                                    {notification.data.title}
                                                </p>
                                                <span className="text-sm break-all text-black-200 line-clamp-1">
                                                    {notification.data.body}
                                                </span>
                                            </div>
                                        </div>
                                        <span className="text-black-default cursor-pointer" onClick={() => handleReadNotification(notification.id)}>
                                            <RxCross2 />
                                        </span>
                                    </div>
                                </li>
                            ))}

                            {unreadNotifications.length > 3 && (
                                <div className="m-4">
                                    <Button 
                                        onclick={() => navigate(userData.role === "student" ? '/student/notifications' : '/admin/notifications')} 
                                        text='View All' 
                                        classname="w-full [&]:bg-primary-300 [&]:py-2" 
                                    />
                                </div>
                            )}
                        </>
                    );
                })()}
            </ul>
        </div>
    );
};

export default Notification;
