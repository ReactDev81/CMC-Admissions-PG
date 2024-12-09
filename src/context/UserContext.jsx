import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {

    const [userData, setUserData] = useState(() => {
        const savedUserData = localStorage.getItem('userData');
        return savedUserData ? JSON.parse(savedUserData) : { token: '', role: null, userDetails: {}, permissions: {} };
    });

    useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(userData));
    }, [userData]);

    const updatePermissions = (newPermissions) => {
        setUserData((prev) => ({ ...prev, permissions: newPermissions }));
    };

    return (
        <UserContext.Provider value={{ userData, setUserData, updatePermissions }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;