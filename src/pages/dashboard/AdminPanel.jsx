import React, { useContext, useState } from 'react';
import {UserContext} from '../../context/UserContext';

const AdminPanel = () => {

    const { userData, updatePermissions } = useContext(UserContext);
    const [permissions, setPermissions] = useState(userData.permissions);

    const handlePermissionChange = (key) => {
        setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const savePermissions = () => {
        updatePermissions(permissions);
    };

    return (
        <div className='flex flex-col justify-center items-center gap-y-2.5'>
            <h2>Manage Permissions</h2>
            <label className='flex gap-x-2'>
                <input
                    type="checkbox"
                    checked={permissions.viewComponentA || false}
                    onChange={() => handlePermissionChange('viewComponentA')}
                />
                View Component A
            </label>
            <label className='flex gap-x-2'>
                <input
                    type="checkbox"
                    checked={permissions.editComponentB || false}
                    onChange={() => handlePermissionChange('editComponentB')}
                />
                Edit Component B
            </label>
            <button className='bg-blue-600 px-10 py-3 mt-2' onClick={savePermissions}>Save Permissions</button>
        </div>
    );
};

export default AdminPanel;
