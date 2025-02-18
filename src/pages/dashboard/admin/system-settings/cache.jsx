import { useContext, useEffect } from "react";
import { toast } from 'react-toastify';
import { parseISO, format } from "date-fns";
import { UserContext } from "../../../../context/UserContext";
import UseAxios from "../../../../hooks/UseAxios";
import Button from "../../../../components/ui/Button";
import OutlineButton from "../../../../components/ui/OutlineButton";

const getLastClearedDate = (cacheKey) => {
    const cacheItem = getCachedData?.data?.find(item => item.key === cacheKey);
    if (!cacheItem || !cacheItem.value) return "N/A";

    const date = new Date(cacheItem.value);
    return new Intl.DateTimeFormat('en-US', { 
        month: '2-digit', 
        day: '2-digit', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
    }).format(date);
};

const Cache = () => {

    const { userData } = useContext(UserContext);
    const { data, status, loading, fetchData } = UseAxios('/settings/cache', 'post', { headers: { Authorization: `Bearer ${userData.token}` } });
    const getCachedData = UseAxios('/settings/cache_settings', 'get', { headers: { Authorization: `Bearer ${userData.token}` } });

    useEffect(() => {
        getCachedData.fetchData();
    }, [])

    const handleClearCache = async (cacheType) => {
        await fetchData({data: {type: cacheType}});
    };

    useEffect(() => {
        if(status === 200){
            toast.success(data.message);
        }
    }, [loading])

    // Function to get the last cleared date for a specific cache type
    const getLastClearedDate = (cacheKey) => {
        const cacheItem = getCachedData?.data?.data?.find(item => item.key === cacheKey);
        
        if (!cacheItem || !cacheItem.value) return "N/A";
    
        // Convert timestamp to desired format
        return format(parseISO(cacheItem.value), "MM-dd-yyyy hh:mma");
    };

    return(
        <div className="border rounded-md text-black-default">
            <div className="p-5">
                <h2 className="mb-2 font-bold">Cache Management Settings</h2>
                <p className="font-normal">Welcome to the Cache Management Settings. Use the tools below to manage and optimize your application's performance by clearing various types of cache.</p>
            </div>

            <div className="p-5 border-t flex items-center justify-between">
                <div>
                    <h3 className="mb-3.5">Application Cache</h3>
                    <p className="font-normal mb-3.5">Clear the cached application data to ensure your app uses the most recent updates and changes.</p>
                    <p className="text-black-300 font-normal"><span className="text-black-300 text-base font-medium capitalize">Last Cleared: </span> ( {getLastClearedDate('application_cache_cleared')} ) </p>
                </div>
                <OutlineButton 
                    onclick={() => handleClearCache('application')}
                    text="Clear Application Cache" 
                    className="px-5 py-2.5 border-primary-default text-primary-default" 
                />
            </div>

            <div className="p-5 border-t flex items-center justify-between">
                <div>
                    <h3 className="mb-3.5">Configuration Cache</h3>
                    <p className="font-normal mb-3.5">Refresh configuration settings to apply any changes made to your configuration files. This is particularly useful for settings stored in the application.</p>
                    <p className="text-black-300 font-normal"><span className="text-black-300 text-base font-medium capitalize">Last Cleared: </span> ( {getLastClearedDate('config_cache_cleared')} ) </p> 
                </div>
                <OutlineButton 
                    onclick={() => handleClearCache('config')}
                    text="Clear Configuration Cache" 
                    className="px-5 py-2.5 border-primary-default text-primary-default" 
                />
            </div>

            <div className="p-5 border-t flex items-center justify-between">
                <div>
                    <h3 className="mb-3.5">Route Cache</h3>
                    <p className="font-normal mb-3.5">Optimize and refresh the routing cache to ensure efficient handling of application routes. Use this to reflect updated route definitions.</p>
                    <p className="text-black-300 font-normal"><span className="text-black-300 text-base font-medium capitalize">Last Cleared: </span> ( {getLastClearedDate('route_cache_cleared')} ) </p> 
                </div>
                <OutlineButton 
                    onclick={() => handleClearCache('route')}
                    text="Clear Route Cache" 
                    className="px-5 py-2.5 border-primary-default text-primary-default" 
                />
            </div>

            <div className="p-5 border-t flex items-center justify-between">
                <div>
                    <h3 className="mb-3.5">Clear All Cache</h3>
                    <p className="font-normal mb-3.5">To reset all cache types at once, use the Clear All Cache button below. This will ensure that all cached data is removed and the latest updates are applied.</p>
                    <p className="text-black-300 font-normal"><span className="text-black-300 text-base font-medium capitalize">Last Cleared: </span> ( {getLastClearedDate('all_cache_cleared')} ) </p> 
                </div>
                <Button 
                    onclick={() => handleClearCache('all')}
                    text="Clear All Cache" 
                    classname="px-5 py-2.5 border-primary-default text-primary-default [&]:rounded-full" 
                />
            </div>

            <div className="text-danger-default flex gap-2.5 italic p-5 border-t">
                <p className="text-lg">Note: </p>
                <p className="text-lg">Clearing cache is a non-reversible action. Proceed carefully to avoid performance disruptions.</p>
            </div>
        </div>
    )
}

export default Cache