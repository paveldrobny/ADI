import React from "react";
import "./Inputs.css"

const Input = ({ title, type, value, onChange }) => {
  return (
    <div className="input-container">
      <input className="input" type={type} value={value} onChange={onChange} />
      <label className="input-title">{title}</label>
    </div>
  );
};

export default Input;
