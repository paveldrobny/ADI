import React from "react";
import "./Inputs.css";

const Dropdown = ({ title, size, groupList, setFilter }) => {
  const [label, setLabel] = React.useState(title);
  const [isShowList, setShowList] = React.useState(false);

  const action = (group) => {
    setFilter(group.name);
    setLabel(group.name);
    setShowList(false);
  };

  return (
    <div className="input-container">
      <div className="input dropdown" onClick={() => setShowList(!isShowList)}>
        <div className="dropdown-title">{label}</div>
        <i className="fas fa-caret-down"></i>
        <div className={`dropdown-list ${size} ${isShowList ? "show" : ""}`}>
          {groupList.map((group) => {
            return (
              <div
                key={group.name}
                onClick={() => action(group)}
                className="dropdown-list-item"
              >
                {group.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
