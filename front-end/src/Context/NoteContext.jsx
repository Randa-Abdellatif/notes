import { createContext, useContext, useState } from "react";

export const NoteContext = createContext({});

export default function NoteContextProvider({children}){
    const [notes, setnotes] = useState([])
    return <NoteContext.Provider value={{notes, setnotes}}>
        {children}
    </NoteContext.Provider>
}