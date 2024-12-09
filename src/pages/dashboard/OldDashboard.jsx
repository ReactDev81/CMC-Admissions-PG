import ProtectedComponent from "../../components/ProtectedComponent";

const OldDashboard = () => {
    return(
        <div className="flex flex-col gap-10 py-10">
            <h1 className="text-3xl font-bold text-center">Dashboard</h1>
            <div className="flex flex-col items-center">
                <ProtectedComponent permissionKey="viewComponentA">
                    <div>Component A - Visible to authorized users</div>
                </ProtectedComponent>
                <ProtectedComponent permissionKey="editComponentB">
                    <div>Component B - Editable by authorized users</div>
                </ProtectedComponent>
            </div>
        </div>
    )
}

export default OldDashboard;