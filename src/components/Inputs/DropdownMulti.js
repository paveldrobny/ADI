import React from "react";
import "./Inputs.css";

const DropdownMulti = ({ title, size, list, setFilter, value, onChange }) => {
  const [label, setLabel] = React.useState(title);
  const [selectLabel, setSelectLabel] = React.useState(value);
  const [isShowList, setShowList] = React.useState(false);

  const action = (group) => {
    if (value.length < 2) {
      const array = [...value, group];
      setFilter(array);
      setSelectLabel(array);
      setShowList(false);
    }
  };

  const deleteLastEl = () => {
    const array = [...value];
    array.pop();
    setFilter(array);
    setSelectLabel(array);
    setShowList(false);
  };

  return (
    <div className="input-container">
      <div
        tabIndex={1}
        className={`input dropdown ${isShowList ? "is-active" : ""}`}
        // onClick={() => setShowList(!isShowList)}
      >
        <input
          className="dropdown-title"
          value={`${label}: ${value}`}
          onChange={onChange}
        />
        <i className="fas fa-caret-down"></i>
        <div className={`dropdown-list ${size} ${isShowList ? "show" : ""}`}>
          <div className="dropdown-list-item-content">
            <div className="dropdown-list-item delete" onClick={deleteLastEl}>
              Удалить последний элемент
            </div>
          </div>
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

export default DropdownMulti;
