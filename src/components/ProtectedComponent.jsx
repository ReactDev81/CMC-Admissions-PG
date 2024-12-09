import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const ProtectedComponent = ({ permissionKey, children }) => {
    const { userData } = useContext(UserContext);

    if (userData.permissions[permissionKey]) {
        return <>{children}</>;
    }
    return null;
};

export default ProtectedComponent;
