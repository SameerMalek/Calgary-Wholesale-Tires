// import {createContext, useEffect, useState} from 'react';

// export const AuthContext = createContext();

// export const AuthContextProvider = ({children}) => {
//     const [currentUser, setCurrentUser] = useState(() => {
//         try {
//             const userData = localStorage.getItem("user");
//             return userData ? JSON.parse(userData) : null;
//         } catch(e) {
//             console.log("Failed to parse user data from localStorage:", e);
//             return null;
//         }
//     });

//     const updateUser = (data) => {
//         setCurrentUser(data);
//     };

//     useEffect(() => {
//         if (currentUser === null) {
//             localStorage.removeItem("user");
//         } else {
//             localStorage.setItem("user", JSON.stringify(currentUser));
//         }
//     }, [currentUser]);
    
//     return (
//         <AuthContext.Provider value={{currentUser, updateUser}}>
//             {children}
//         </AuthContext.Provider>
//     )
// };

import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

// Context provider for authentication
export const AuthContextProvider = ({children}) => {
    // const [currentUser, setCurrentUser] = useState(null);
    const [email, setEmail] = useState("");
   
    const [currentUser, setCurrentUser] = useState(() => {
        try {
            const userData = localStorage.getItem("user");
            console.log("User Data:",userData);
            // Ensure userData is a valid JSON string before parsing
            return userData && userData !== "undefined" ? JSON.parse(userData) : null;
        } catch(e) {
            console.log("Failed to parse user data from localStorage:", e);
            return null;
        }
        
    });

  const updateUser = (data) => {
    console.log("Updating user:", data);
    setCurrentUser(data);
    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
    } else {
      localStorage.removeItem("user");
    }
  };

    useEffect(() => {
        if (currentUser === null) {
            localStorage.removeItem("user");
        } else {
            localStorage.setItem("user", JSON.stringify(currentUser));
        }
    }, [currentUser]);
    
    return (
        <AuthContext.Provider value={{currentUser, updateUser, email, setEmail}}>
            {children}
        </AuthContext.Provider>
    )
};
