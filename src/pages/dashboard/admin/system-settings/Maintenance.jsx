import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../../../../context/UserContext";
import useAxios from "../../../../hooks/UseAxios";
import ToggleButton from "../../../../components/forms/ToggleButton";

const Maintenance = () => {

    const { userData } = useContext(UserContext);
    const [isToogleEnabled, setToogleValue] = useState(false);
    const getMaintenanceValue = useAxios('/settings/maintenance_settings', 'get', { headers: { Authorization: `Bearer ${userData.token}` } });
    const sendMaintenanceValue = useAxios('/settings/maintenance', 'post', { headers: { Authorization: `Bearer ${userData.token}` } });

    useEffect(() => {
        getMaintenanceValue.fetchData();
    }, [])

    useEffect(() => {
        if (getMaintenanceValue.status === 200) {
            setToogleValue(getMaintenanceValue.data.data[0].value);
            toast.success(getMaintenanceValue.data.message);
        }
    }, [getMaintenanceValue.loading])

    useEffect(() => {
        if (sendMaintenanceValue.status === 200) {
            toast.success(sendMaintenanceValue.data.message);
        }
    }, [sendMaintenanceValue.loading])

    const handleSubmit = async (toogleValue) => {
        setToogleValue(toogleValue);
        await sendMaintenanceValue.fetchData({data: { status: toogleValue }});
    }

    return(
        <div className="border rounded-md text-black-default flex items-center justify-between p-5">
            <div>
                <h2 className="mb-2 font-bold">Maintenance Mode Status.</h2>
                <p className="font-normal">Users will not be able to access the frontend forms and their dashboards while maintenance mode is on.</p>
            </div>
            <div>
                <ToggleButton 
                    value={isToogleEnabled === "0" ? false : true}
                    onChange={(newValue) => handleSubmit(newValue)}
                />
            </div>
        </div>
    )
}

export default Maintenance