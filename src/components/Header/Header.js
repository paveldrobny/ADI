import React from "react";
import logo from "../../image/zeropoint_logo.jpg";
import { NavLink } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  const [links, setLinks] = React.useState([
    { name: "Главная", route: "/", icon: "fa-home" },
    { name: "Зачисление", route: "/enrollment", icon: "fa-list-alt" },
    { name: "Об институте", route: "/about", icon: "fa-info-circle" },
    { name: "", route: "/admin", icon: "fa-user-shield" },
  ]);

  const [isDarkTheme, setDarkTheme] = React.useState(
    localStorage.getItem("isDarkTheme") ? true : false
  );

  React.useEffect(() => {
    getValue();
  });

  const changeTheme = () => {
    store();
    getValue();
  };

  const store = () => {
    localStorage.setItem("isDarkTheme", isDarkTheme);
  };

  const getValue = () => {
    let bodyClass = document.body.classList,
      htmlClass = document.documentElement.classList;

    if (!localStorage.isDarkTheme) {
      store();
    }
    if (localStorage.getItem("isDarkTheme") === "true") {
      bodyClass.add("dark-theme");
      htmlClass.add("dark-theme");
      setDarkTheme(false);
    } else if (localStorage.getItem("isDarkTheme") === "false") {
      bodyClass.remove("dark-theme");
      htmlClass.remove("dark-theme");
      setDarkTheme(true);
    }
  };

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

          <li onClick={changeTheme} id="theme-btn" className="app-link">
            <i className={`fas ${isDarkTheme ? "fa-moon" : "fa-sun"}`}></i>
          </li>
        </ul>
      </div>
    </header>
  );
};
