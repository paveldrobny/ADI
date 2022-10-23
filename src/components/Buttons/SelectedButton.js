import React from "react";
import "./Buttons.css"

function SelectedButton({ setID, isActive, title }) {
  return (
    <button
      onClick={setID}
      className={`select-table-btn ${isActive ? "is-active" : ""}`}
    >
      {title}
    </button>
  );
}

export default SelectedButton;
