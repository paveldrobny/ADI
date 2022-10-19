import React, { useContext } from "react";
import logo from "../../image/zeropoint_logo.jpg";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { Context } from "../../context";

export const Header = ({ changeTheme, changeFavorites }) => {
  const [links, setLinks] = React.useState([
    { name: "Главная", route: "/", icon: "fa-home" },
    { name: "Зачисление", route: "/enrollment", icon: "fa-list-alt" },
    { name: "Об институте", route: "/about", icon: "fa-info-circle" },
    { name: "", route: "/admin", icon: "fa-user-shield" },
  ]);

  const [isSettingShow, setSettingsShow] = React.useState(false);
  const { isDarkTheme, isSaveProfiles } = useContext(Context);

  return (
    <header id="header">
      <div className="header-banner">
        <img src={logo} alt="logo" />
        <div id="logo-name">Абитуриент АДИ</div>
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
                  <i className={`fas ${link.icon}`}></i>
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
      <div className={`${isSettingShow ? "show" : ""}`} id="settings-menu">
        <div className="header-settings-item" onClick={changeTheme}>
          <div className="settings-item-content">
            <div className="settings-item-title">Темная тема</div>
            <div
              className={`settings-item-toggle ${isDarkTheme ? "" : "active"}`}
            ></div>
          </div>
          <div className="settings-item-desc">Сменить оформление</div>
        </div>

        <div className="header-settings-item" onClick={changeFavorites}>
          <div className="settings-item-content">
            <div className="settings-item-title">Избранные профили</div>
            <div
              className={`settings-item-toggle ${
                isSaveProfiles ? "" : "active"
              }`}
            ></div>
          </div>
          <div className="settings-item-desc">
            Профили будут сохранятся локально в браузере
          </div>
        </div>
        <NavLink to={"/favorites"} className="header-settings-item">
          <div className="settings-item-content">
            <div className="settings-item-title">Показать избранное</div>
            <i className="fas fa-external-link-alt"></i>
          </div>
          <div className="settings-item-desc">Ваши избранные профили</div>
        </NavLink>
      </div>
    </header>
  );
};
