import React from "react";
import { NavLink } from "react-router-dom";
import "./page.css";
import notFound from "../image/undraw_page_not_found_re_e9o6.svg";

function NotFound() {
  const [title, setTitle] = React.useState("Страница не найденна");
  const [btnText, setBtnText] = React.useState("Вернуться на главную");

  return (
    <div className="page min">
      <div id="not-found">
        <div className="groups space">
          <div className="img-row">
            <h1 className="undraw-title">{title}</h1>
          </div>
        </div>
        <div style={{ textAlign: "center", padding: "15px 0 20px" }}>
          <img
            className="undraw-img"
            style={{ objectPosition: "top" }}
            src={notFound}
            alt="..."
            height={200}
          />
        </div>

        <NavLink to="/" id="not-found-btn">
          {btnText}
        </NavLink>
      </div>
    </div>
  );
}
export default NotFound;
