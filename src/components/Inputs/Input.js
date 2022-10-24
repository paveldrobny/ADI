import React from "react";
import "./Inputs.css";

const Input = ({ title, type, maxLength, value, onChange }) => {
  const [labelActive, setLabelActive] = React.useState(false);

  const onFocus = () => {
    setLabelActive(true);
  };

  const onBlur = () => {
    if (!value.trim()) {
      setLabelActive(false);
    } else {
      setLabelActive(true);
    }
  };

  return (
    <div className="input-container">
      <label className={`input-title ${labelActive ? "is-active" : ""}`}>
        {title}:
      </label>
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
