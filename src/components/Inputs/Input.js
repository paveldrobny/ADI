import React from "react";
import "./Inputs.css";

const Input = ({ title, type, maxLength, value, onChange, max = 0 }) => {
  const onFocus = () => {
    // setActiveAnim(true);
  };

  const onBlur = () => {
    if (!value.trim()) {
      // setActiveAnim(false);
    } else {
      // setActiveAnim(true);
    }
  };

  return (
    <div className={`${max === 0 ? "input-container " : "input-max"}`}>
      <label className="input-title is-active">{title}:</label>
      <input
        className="input"
        onFocus={onFocus}
        type={type}
        maxLength={maxLength}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
