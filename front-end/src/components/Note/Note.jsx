import React, { useContext } from "react";
import style from "./Note.module.css";
import { deleteNote, showDeleteWarning, showUpdateWindow } from "../../utils/Note";
import { UserContext } from "../../Context/UserContext";
import { NoteContext } from "../../Context/NoteContext";

export default function Note({noteInfo}) {
  const {token,userInfo} = useContext(UserContext);
  const {setnotes}=useContext(NoteContext)

  return (
    <>
      <div className={`${style.note} note shadow `}>
        <div className="note-body">
          <h2 className="h6 fw-semibold m-0 font-Montserrat ">{noteInfo.title}</h2>
          <p className={`mb-0 mt-2`}>
            {noteInfo.content}
          </p>
        </div>

        <div className="note-footer">
          <i className="fa-solid fa-pen-to-square pointer me-2" onClick={()=>{
            showUpdateWindow({
              prevData:noteInfo,
               NoteID:noteInfo.id,
              token,
              userId:userInfo.id ,
              update:setnotes
            })
          }}></i>

          <i className="bi bi-archive-fill pointer" onClick={()=>{

showDeleteWarning({
               token,
               NoteId:noteInfo.id ,
                userId:userInfo.id,
                 update:setnotes})
          }}></i>
        </div>
      </div>
    </>
  );
}
