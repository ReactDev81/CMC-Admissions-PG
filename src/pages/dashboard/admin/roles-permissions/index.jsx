import AddRolePermissions from "./Add-RolePermissions";
import ControlRolesAndPermissions from "./Control-RolesPermissions";

const RolesAndPermissions = () => {
  return (
    <div>
      <div className="flex gap-5">
        <div className="basis-1/2">
          <ControlRolesAndPermissions />
        </div>
        <div className="basis-1/2">
          <AddRolePermissions />
        </div>
      </div>
    </div>
  );
};

export default RolesAndPermissions;
