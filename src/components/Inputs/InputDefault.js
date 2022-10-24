import React from "react";
import "./Inputs.css";

const InputDefault = ({ title, type, maxLength, value, onChange }) => {
  const [labelActive, setLabelActive] = React.useState(true);

  return (
    <div className="input-container">
      <label className={`input-title ${labelActive ? "is-active" : ""}`}>
        {title}:
      </label>
      <input
        className="input"
        type={type}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputDefault;
