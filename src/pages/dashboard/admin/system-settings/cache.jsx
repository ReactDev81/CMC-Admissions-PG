import Button from "../../../../components/ui/Button";
import OutlineButton from "../../../../components/ui/OutlineButton";

const Cache = ({data}) => {

    return (
    <>
    <div className="border rounded-md text-black-default">
        <div className="p-5">
            <h2 className="mb-2 font-bold">Cache Management Settings</h2>
            <p className="font-normal">Welcome to the Cache Management Settings. Use the tools below to manage and optimize your application's performance by clearing various types of cache.</p>
        </div>

        <div className="p-5 border-t flex items-center justify-between">
            <div>
                <h3 className="mb-3.5">Application Cache</h3>
                <p className="font-normal mb-3.5">Clear the cached application data to ensure your app uses the most recent updates and changes.</p>
                <p className="text-black-300 font-normal"><span className="text-black-300 text-base font-medium capitalize">Last Cleared: </span> (12-10-2024 am) 1 day ago</p>
            </div>
            <OutlineButton text="Clear Application Cache" classname="px-5 py-2.5 border-primary-default text-primary-default" />
        </div>

        <div className="p-5 border-t flex items-center justify-between">
            <div>
                <h3 className="mb-3.5">Configuration Cache</h3>
                <p className="font-normal mb-3.5">Refresh configuration settings to apply any changes made to your configuration files. This is particularly useful for settings stored in the application.</p>
                <p className="text-black-300 font-normal"><span className="text-black-300 text-base font-medium capitalize">Last Cleared: </span> (12-10-2024 am) 1 day ago</p> 
            </div>
            <OutlineButton text="Clear Configuration Cache" classname="px-5 py-2.5 border-primary-default text-primary-default" />
        </div>

        <div className="p-5 border-t flex items-center justify-between">
            <div>
                <h3 className="mb-3.5">Route Cache</h3>
                <p className="font-normal mb-3.5">Optimize and refresh the routing cache to ensure efficient handling of application routes. Use this to reflect updated route definitions.</p>
                <p className="text-black-300 font-normal"><span className="text-black-300 text-base font-medium capitalize">Last Cleared: </span> (12-10-2024 am) 1 day ago</p> 
            </div>
            <OutlineButton text="Clear Route Cache" classname="px-5 py-2.5 border-primary-default text-primary-default" />
        </div>

        <div className="p-5 border-t flex items-center justify-between">
            <div>
                <h3 className="mb-3.5">Clear All Cache</h3>
                <p className="font-normal mb-3.5">To reset all cache types at once, use the Clear All Cache button below. This will ensure that all cached data is removed and the latest updates are applied.</p>
            </div>
            <Button text="Clear All Cache" classname="px-5 py-2.5 border-primary-default text-primary-default [&]:rounded-full" />
        </div>

        <div className="text-danger-default flex gap-2.5 italic p-5 border-t">
            <p className="text-lg">Note: </p>
            <p className="text-lg">Clearing cache is a non-reversible action. Proceed carefully to avoid performance disruptions.</p>
        </div>
      </div>
    </>
  );
};

export default Cache;
