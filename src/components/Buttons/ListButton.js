import React from "react";
import { NavLink } from "react-router-dom";
import "./Buttons.css"

function ListButton({ setID, path, title }) {
  return (
    <NavLink to={path} onClick={setID} className="list-button">
      {title}
      <i className="fas fa-external-link-alt"></i>
    </NavLink>
  );
}

export default ListButton;
