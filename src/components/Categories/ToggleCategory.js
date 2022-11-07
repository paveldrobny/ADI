import React from "react";
import "./Categories.css";

function ToogleCategory({
  title,
  buttonOne,
  buttonTwo,
  setFilter,
  defaultValue,
}) {
  const [buttons, setButtons] = React.useState([
    { id: 0, name: buttonOne, value: false },
    { id: 1, name: buttonTwo, value: true },
  ]);
  const [active, setActive] = React.useState(buttons[defaultValue].name);
  const action = (button) => {
    setFilter(button.name);
    setActive(button.name);
  };

  return (
    <div className="tabs-nav">
      <div className="tabs-nav-left">{title}:</div>
      <div className="tabs-nav-right">
        {buttons.map((button) => {
          return (
            <button
              key={button.id}
              className={`enrollment-tabs ${
                active === button.name ? "active" : ""
              }`}
              onClick={() => action(button)}
            >
              {button.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ToogleCategory;
