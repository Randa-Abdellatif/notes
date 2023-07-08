import React, { useContext } from "react";
import style from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import { showAddForm } from "../../utils/Note";
import { UserContext } from "../../Context/UserContext";
import { NoteContext } from "../../Context/NoteContext";

export default function Sidebar() {
  let {notes, setnotes} = useContext(NoteContext);
  const{token,userInfo,logout} = useContext(UserContext)
  return (
    <>
      <nav className={`${style.nav} shadow-sm`}>
        <button className="btn btn-main text-capitalize w-100 mb-3" onClick={()=>{
          showAddForm({ userID:userInfo.id , token, update:setnotes });
        }}>
          <i className="fa-solid fa-plus me-2"></i>
          New Note
        </button>
        <ul className="list-unstyled">
          <li>
            <NavLink to="/">
              <i className="bi bi-house-heart me-2"></i>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/search">
              <i className="bi bi-search me-2"></i> Search
            </NavLink>
          </li>
          <li>
            <span className="pointer" onClick={logout}>
              <i className="bi bi-box-arrow-left me-2"></i>
              Log Out
            </span>
          </li>
        </ul>
        <div className={`${style.change} shadow pointer`}>
          <i className={`fa-solid fa-chevron-right `}></i>
        </div>
      </nav>
    </>
  );
}
