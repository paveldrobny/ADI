import React from "react";
import { NavLink } from "react-router-dom";

const SettingsMenu = ({
  isSettingShow,
  isDarkTheme,
  isSaveProfiles,
  changeTheme,
  changeFavorites,
}) => {
  const [themeTitle, setThemeTitle] = React.useState("Темная тема");
  const [themeDesc, setThemeDesc] = React.useState("Сменить оформление");
  const [favoritesTitle, setFavoritesTitle] =
    React.useState("Избранные профили");
  const [favoritesDesc, setFavoritesDesc] = React.useState(
    "Профили будут сохранятся локально в браузере"
  );
  const [favoritesLinkTitle, setFavoritesLinkTitle] =
    React.useState("Показать избранное");
  const [favoritesLinkDesc, setFavoritesLinkDesc] = React.useState(
    "Ваши избранные профили"
  );

  return (
    <div className={`${isSettingShow ? "show" : ""}`} id="settings-menu">
      <div className="header-settings-item" onClick={changeTheme}>
        <div className="settings-item-content">
          <div className="settings-item-title">{themeTitle}</div>
          <div
            className={`settings-item-toggle ${isDarkTheme ? "" : "active"}`}
          ></div>
        </div>
        <div className="settings-item-desc">{themeDesc}</div>
      </div>

      <div className="header-settings-item" onClick={changeFavorites}>
        <div className="settings-item-content">
          <div className="settings-item-title">{favoritesTitle}</div>
          <div
            className={`settings-item-toggle ${isSaveProfiles ? "" : "active"}`}
          ></div>
        </div>
        <div className="settings-item-desc">{favoritesDesc}</div>
      </div>
      <NavLink to={"/favorites"} className="header-settings-item">
        <div className="settings-item-content">
          <div className="settings-item-title">{favoritesLinkTitle}</div>
          <i className="fas fa-external-link-alt"></i>
        </div>
        <div className="settings-item-desc">{favoritesLinkDesc}</div>
      </NavLink>
    </div>
  );
};
export default SettingsMenu;
