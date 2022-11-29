import React from "react";
import "./GroupSize.css";

function GroupSize({ title, currentSize, size, setCurrentGroupSize, onClick }) {
  return (
    <div className="admin-group-size">
      <div className="admin-group-size-title">{title}</div>
      <div className="admin-group-size-count">
        Студентов: {currentSize}/{size}
      </div>
      <hr />
      <button className="admin-group-size-btn" onClick={onClick}>
        Применить
      </button>
    </div>
  );
}

export default GroupSize;
