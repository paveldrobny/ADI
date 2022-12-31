import React from "react";
import "./Buttons.css"

function SelectedButton({ setID, isActive, title, size = "" }) {
  return (
    <button
      onClick={setID}
      className={`select-table-btn ${size} ${isActive ? "is-active" : ""}`}
    >
      {title}
    </button>
  );
}

export default SelectedButton;
