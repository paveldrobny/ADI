import React from "react";
import "./GroupSize.css";

function GroupSize({ title, size }) {
  return (
    <div className="admin-group-size">
      <div className="admin-group-size-title">{title}</div>
      <div className="admin-group-size-count">Студентов: 5/{size}</div>
      <hr />
      <input
        className="admin-group-size-input"
        type={"number"}
        max={size}
        min={1}
      ></input>
      <button className="admin-group-size-btn">Применить</button>
    </div>
  );
}

export default GroupSize;
