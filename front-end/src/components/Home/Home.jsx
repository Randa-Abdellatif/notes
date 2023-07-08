import React, { useContext, useEffect } from "react";
import style from "./Home.module.css";
import { NoteContext } from "../../Context/NoteContext";
import Loading from "../Loading/Loading.jsx"
import { getNotes, showAddForm } from "../../utils/Note";
import { UserContext } from "../../Context/UserContext";
import Note from "../Note/Note.jsx"

export default function Home() {
  let {notes, setnotes} = useContext(NoteContext);
  const{token,userInfo} = useContext(UserContext);

  // console.log(userInfo)
  // console.log(token)

  useEffect(()=>{
    getNotes({userId:userInfo.id , token, update:setnotes })
  },[])

  return (
    <>
      <h2 className="font-Montserrat h4 heading">
        <i className="bi bi-folder me-2"></i>My Notes
      </h2>

      {/* null => loading || [] => no notes found || [,,,] => display notes */}
      {notes? (notes.length ? (
       <div className={`${style.notes}`}>
        {notes.map((noteInfo,index)=><Note key={index} noteInfo={noteInfo}/>)}
       </div>
        
        )
        :(
          <div
            className={`${style.empty} d-flex flex-column justify-content-center align-items-center`}
          >
            <h2 className="h5 text-muted">
              Your notes will appear here once you start creating them{" "}
              <i className="bi bi-stickies ms-2"></i>
            </h2>
            <button
              className="btn btn-main fit-content text-capitalize my-3"
              onClick={() => {
                showAddForm({ token, userInfo, update: setnotes });
              }}
            >
              <i className="fa-solid fa-plus me-2"></i>New Note
            </button>
          </div>
        )
        ) :
         <Loading/>}
    </> 
  );
}
