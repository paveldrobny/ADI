import React from "react";
import "./Inputs.css";

const Dropdown = ({
  title,
  isShowLabel,
  size,
  list,
  value,
  setFilter,
  onChange,
}) => {
  const [label, setLabel] = React.useState(title);
  const [isShowList, setShowList] = React.useState(false);

  const action = (group) => {
    if (isShowLabel) {
      setFilter(group);
      setShowList(false);
    } else {
      setFilter(group);
      setShowList(false);
    }
  };

  return (
    <div className="input-container">
      <div
        tabIndex={1}
        className={`input dropdown ${isShowList ? "is-active" : ""}`}
        // onClick={() => setShowList(!isShowList)}
      >
        <label className="input-title is-active">{label}</label>
        <input
          className="dropdown-title"
          value={`${value.length > 0 ? value : ""}`}
          onChange={onChange}
        />
        <i className="fas fa-caret-down"></i>
        <div className={`dropdown-list ${size} ${isShowList ? "show" : ""}`}>
          {list.map((group) => {
            return (
              <div
                key={group}
                onClick={() => action(group)}
                className="dropdown-list-item"
              >
                {group}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
