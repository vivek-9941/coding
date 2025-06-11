import React , {createContext, useContext , useEffect , useState} from "react";
const UserContext= createContext();

export const UserProvider = ({children}) =>{
    const [user , setUser] =  useState(() =>{
        const storeduser = localStorage.getItem("user");
        return storeduser ? JSON.parse(storeduser) : null;

    })

    const saveUser = (userData) =>{
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);

    }
    const logoutUser  = () =>{
        localStorage.removeItem("user");
        setUser(null);
    }
    return (
        <UserContext.Provider value={{user, saveUser,logoutUser}}>
            {children}
        </UserContext.Provider>
    )
}
export const useUser = () => useContext(UserContext);