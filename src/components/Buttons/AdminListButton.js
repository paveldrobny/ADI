import React from "react";
import "./Buttons.css";

function AdminListButton({ status, title, onEditUser, onDeleteUser }) {
  return (
    <div className="admin-list-button">
      <div>
        {title}
        <span className="admin-list-active">
          {status ? "( ЗАЧИСЛЕН )" : ""}
        </span>
      </div>
      <div className="admin-list-right">
        <button className="admin-list-button-edit" onClick={onEditUser}>
          <i className="fas fa-edit"></i>
        </button>
        <button className="admin-list-button-delete" onClick={onDeleteUser}>
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
}

export default AdminListButton;
