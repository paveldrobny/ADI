import React, { useContext } from "react";
import logo from "../../image/zeropoint_logo.jpg";
import { NavLink } from "react-router-dom";
import { Context } from "../../context";
import SettingsMenu from "./SettingsMenu";
import "./Header.css";

const Header = ({ changeTheme, changeFavorites }) => {
  const [title, setTitle] = React.useState("Абитуриент АДИ");
  const [links, setLinks] = React.useState([
    { name: "Главная", route: "/", icon: "fa-home" },
    { name: "Конкурс", route: "/enrollment", icon: "fa-list-alt" },
    { name: "Зачисление", route: "/received", icon: "fa-check-square" },
    { name: "Об институте", route: "/about", icon: "fa-info-circle" },
    { name: "", route: "/admin", icon: "fa-user-shield" },
  ]);

  const [isSettingShow, setSettingsShow] = React.useState(false);
  const { isDarkTheme, isSaveProfiles } = useContext(Context);

  return (
    <header id="header">
      <div className="header-banner">
        <img src={logo} alt="logo" />
        <div id="logo-name">{title}</div>
      </div>
      <div className="header-nav-btn">
        <ul>
          {links.map((link) => {
            return (
              <li key={link.name}>
                <NavLink
                  end
                  to={link.route}
                  className={({ isActive }) =>
                    isActive ? "app-link selected" : "app-link"
                  }
                >
                  <i className={`fa ${link.icon}`}></i>
                  <div className="nav-text">{link.name}</div>
                </NavLink>
              </li>
            );
          })}

          <li
            onClick={() => setSettingsShow(!isSettingShow)}
            id="settings-btn"
            className={`app-link ${isSettingShow ? "active" : ""}`}
          >
            <i className="fas fa-cog"></i>
          </li>
        </ul>
      </div>
      <SettingsMenu
        isSettingShow={isSettingShow}
        isDarkTheme={isDarkTheme}
        isSaveProfiles={isSaveProfiles}
        changeTheme={changeTheme}
        changeFavorites={changeFavorites}
      />
    </header>
  );
};

export default Header;
