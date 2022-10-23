import React from "react";
import { NavLink } from "react-router-dom";
import "./page.css";

function NotFound() {
  const [title, setTitle] = React.useState("Страница не найденна");
  const [text, setText] = React.useState("404");
  const [btnText, setBtnText] = React.useState("Вернуться на главную");

  return (
    <div className="page min">
      <div id="not-found">
        <div id="not-found-title">{title}</div>
        <div id="not-found-text">{text}</div>
        <NavLink to="/" id="not-found-btn">
          {btnText}
        </NavLink>
      </div>
    </div>
  );
}
export default NotFound;
