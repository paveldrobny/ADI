import React from "react";
import { NavLink } from "react-router-dom";
import "./page.css";

function NotFound() {
  return <div className="page min">
    <div id="not-found">
        <div id="not-found-title">Страница не найденна</div>
        <div id="not-found-text">404</div>
        <NavLink to="/" id="not-found-btn">Вернуться на главную</NavLink>
    </div>
  </div>;
}
export default NotFound;
