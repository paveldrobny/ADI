import React from "react";
import "./Buttons.css"

function SelectedButton({ setID, isActive, title, align }) {
  return (
    <button
      onClick={setID}
      className={`select-table-btn ${align} ${isActive ? "is-active" : ""}`}
    >
      {title}
    </button>
  );
}

export default SelectedButton;
