import { useContext, useEffect } from "react";
import { toast } from 'react-toastify';
import { MdNotifications } from "react-icons/md";
import { UserContext } from "../../../context/UserContext";
import UseAxios from "../../../hooks/UseAxios";
import Button from "../../../components/ui/Button";

const Notifications = () => {

    const { userData } = useContext(UserContext);
    const isPasswordReset = userData.userDetails.password_changed;
    const { data, loading, fetchData } = UseAxios('/notifications', 'get', { headers: { Authorization: `Bearer ${userData.token}` } });
    const readNotifications = UseAxios(null, 'post', { headers: { Authorization: `Bearer ${userData.token}` } });

    const handleReadNotification = async (notificationId) => {
        await readNotifications.fetchData({ 
            url: `/notifications/${notificationId}/read` 
        });
        fetchData();
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

    return(
        <div>
            <ul>
                {loading ? 
                    <div className="flex justify-center items-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                :
                isPasswordReset && data && data.map(notification => (
                    <li className="mx-4" key={notification.id}>
                        <div className={`flex items-center gap-4 py-3 px-4 my-3 bg-white-default rounded-md justify-between`}>
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
                            {
                                !notification.read_at &&
                                <Button 
                                    onclick={() => handleReadNotification(notification.id)}
                                    classname="[&]:py-2 [&]:rounded-full [&]:bg-success-300 [&]:text-success-default [&]:border-success-default"
                                    text="Mark Read"  
                                />
                            }
                        </div>
                    </li>
                ))}
            </ul>   
        </div>
    )
}

export default Notifications;