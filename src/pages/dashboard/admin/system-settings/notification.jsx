import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { UserContext } from "../../../../context/UserContext";
import UseAxios from "../../../../hooks/UseAxios";
import ToggleButton from "../../../../components/forms/ToggleButton";
import Button from "../../../../components/ui/Button";
import SelectField from "../../../../components/forms/SelectField";

const Notification = () => {

    const { userData } = useContext(UserContext);

    // Fetch user and admin notifications
    const userNotification = UseAxios('/settings/user_notifications', 'get', { headers: { Authorization: `Bearer ${userData.token}` } });
    const userNotificationData = userNotification.data?.data;

    const adminNotification = UseAxios('/settings/admin_notifications', 'get', { headers: { Authorization: `Bearer ${userData.token}` } });
    const adminNotificationData = adminNotification.data?.data;

    const sendNotification = UseAxios('/settings/notifications', 'post', { headers: { Authorization: `Bearer ${userData.token}` } });

    useEffect(() => {
        if (sendNotification.status === 200) {
        toast.success(sendNotification.data.message);
        }
    }, [sendNotification.loading])

    const { register, handleSubmit, setValue, watch, control } = useForm({
        defaultValues: {}, // Initial values for the toggles
    });

    // Fetch notifications on component mount
    useEffect(() => {
        const fetchNotifications = async () => {
            await Promise.all([
                userNotification.fetchData(),
                adminNotification.fetchData(),
            ]);
        };
        fetchNotifications();
    }, []);

    // Set default values for user notifications
    useEffect(() => {
        if (userNotificationData) {
            const defaultStates = userNotificationData.reduce((acc, field) => {
                acc[`user_notifications.${field.key}`] =
                    field.type === "boolean" ? field.value === "1" : field.value; // Convert "1" to true, "0" to false
                return acc;
            }, {});
            Object.entries(defaultStates).forEach(([key, value]) => {
                setValue(key, value);
            });
        }
    }, [userNotificationData, setValue]);


    // Set default values for admin notifications
    useEffect(() => {
        if (adminNotificationData) {
        const defaultStates = adminNotificationData.reduce((acc, field) => {
            acc[`admin_notifications.${field.key}`] = 
                field.type === "boolean" ? field.value === "1" : field.value; // Convert "1" to true, "0" to false
            return acc;
        }, {});
        Object.entries(defaultStates).forEach(([key, value]) => {
            setValue(key, value);
        }); 
        }
    }, [adminNotificationData, setValue]);

    // Handle form submission
    const onSubmit = (formData) => {
        
        // Transform form data to match the API structure
        const transformedData = {
            user_notifications: {},
            admin_notifications: {},
        };

        // Populate user_notifications
        userNotificationData?.forEach((field) => {
            transformedData.user_notifications[field.key] = formData['user_notifications'][field.key];
        });

        // Populate admin_notifications
        adminNotificationData?.forEach((field) => {
            transformedData.admin_notifications[field.key] = formData['admin_notifications'][field.key];
        });

        sendNotification.fetchData({
            data: transformedData
        })

    };

    const Frequency = [
        { value: "once", label: "Once" },
        { value: "daily", label: "Daily" },
        { value: "weekly", label: "Weekly" },
        { value: "monthly", label: "Monthly" },
    ]

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-7">

                {/* User Notifications */}
                <div className="notification-settings basis-1/2 border rounded-md">
                    <div className="p-5">
                        <h2 className="text-black-default mb-2.5">User Notifications</h2>
                        <p className="text-black-300 font-normal">
                            Lorem ipsum dolor sit amet consectetur adipiscing elit dui, mi
                            facilisis malesuada leo sem dictum turpis cursus varius.
                        </p>
                    </div>
                    <div className="grid">
                        {userNotificationData &&
                        userNotificationData.map((field) => (
                            <div key={field.id} className="flex items-center gap-3.5 justify-between border-t p-5">
                            {field.type === "select" ?
                                <SelectField
                                    name={`user_notifications.${field.key}`}
                                    control={control}
                                    label={field.description}
                                    options={Frequency}
                                /> 
                                :
                                <>
                                    <p className="text-black-default font-medium">{field.description}</p>
                                    <ToggleButton
                                        id={`user_notifications.${field.key}`}
                                        value={watch(`user_notifications.${field.key}`)}
                                        onChange={(newValue) => setValue(`user_notifications.${field.key}`, newValue)}
                                        register={register}
                                    />
                                </>
                            }
                            </div>
                        ))}
                    </div>
                </div>

                {/* Admin Notifications */}
                <div className="notification-settings basis-1/2 border rounded-md h-fit">
                    <div className="p-5">
                        <h2 className="text-black-default mb-2.5">Admin Notifications</h2>
                        <p className="text-black-300 font-normal">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit dui, mi
                        facilisis malesuada leo sem.
                        </p>
                    </div>
                    <div className="grid">
                        {adminNotificationData &&
                        adminNotificationData.map((field) => (
                            <div key={field.id} className="flex items-center gap-3.5 justify-between border-t p-5">
                            <p className="text-black-default font-medium">{field.description}</p>
                            <ToggleButton
                                id={`admin_notifications.${field.key}`}
                                value={watch(`admin_notifications.${field.key}`)}
                                onChange={(newValue) => setValue(`admin_notifications.${field.key}`, newValue)}
                                register={register}
                            />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {sendNotification.error && <p className="bg-red-100 py-2.5 px-5 text-red-800 mt-2 rounded-md font-normal" dangerouslySetInnerHTML={{ __html: sendNotification.error }}></p>}

            {/* Save Changes Button */}
            <div className="flex items-center justify-end mt-6 p-5 pb-0 border-t -mx-5">
                <Button
                    text="Save Changes"
                    classname="px-8 py-2.5 [&]:rounded-full border-0"
                />
            </div>
        </form>
    )
}

export default Notification;