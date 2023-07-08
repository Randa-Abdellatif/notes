 import { createContext, useState } from "react";

export let UserContext = createContext({});

export default function UserContextProvider({children}){
    const  [token, settoken] = useState(localStorage.getItem("token"));
    const [userInfo, setuserInfo] = useState(
        JSON.parse(localStorage.getItem("userInfo"))
    )

    function logout(){
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        settoken(null);
        setuserInfo(null);
    }

    return <UserContext.Provider value={{token, settoken ,userInfo, setuserInfo, logout}}>
        {children}
        </UserContext.Provider>
}