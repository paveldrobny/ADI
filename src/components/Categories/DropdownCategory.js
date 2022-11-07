import React from "react";
import "./Categories.css";

function DropdownCategory({ title, groupList, setFilter }) {
  const [label, setLabel] = React.useState("Выбрать...");
  const [isShowList, setShowList] = React.useState(false);
  const action = (group) => {
    setFilter(group);
    setLabel(group);
    setShowList(false);
  };

  const reset = () => {
    setFilter("");
    setLabel("Выбрать...");
    setShowList(false);
  };

  return (
    <div className="tabs-nav">
      <div className="tabs-nav-left">{title}:</div>
      <div className="tabs-nav-right min">
        <button
          onClick={() => setShowList(!isShowList)}
          className="enrollment-tabs max active"
        >
          {label}
        </button>
        <div className={`enrollment-list-content ${isShowList ? "" : "hide"}`}>
          <ul className="enrollment-list">
            <li className="enrollment-list-item reset" onClick={reset}>
              СБРОС
            </li>
            {groupList.map((group) => {
              return (
                <li
                  key={group}
                  className="enrollment-list-item"
                  onClick={() => action(group)}
                >
                  {group}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DropdownCategory;