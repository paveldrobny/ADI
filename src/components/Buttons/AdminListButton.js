import React from "react";
import "./Buttons.css";

function AdminListButton({ title, onEditUser, onDeleteUser }) {
  return (
    <div className="admin-list-button">
      {title}
      <div>
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
