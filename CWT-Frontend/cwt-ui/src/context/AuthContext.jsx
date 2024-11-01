import {createContext, useEffect, useState} from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(() => {
        try {
            const userData = localStorage.getItem("user");
            return userData ? JSON.parse(userData) : null;
        } catch(e) {
            console.log("Failed to parse user data from localStorage:", e);
            return null;
        }
    });

    const updateUser = (data) => {
        setCurrentUser(data);
    };

    useEffect(() => {
        if (currentUser === null) {
            localStorage.removeItem("user");
        } else {
            localStorage.setItem("user", JSON.stringify(currentUser));
        }
    }, [currentUser]);
    
    return (
        <AuthContext.Provider value={{currentUser, updateUser}}>
            {children}
        </AuthContext.Provider>
    )
};