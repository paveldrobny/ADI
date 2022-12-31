import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";
import Header from "./components/Header";
import Home from "./pages/Home";
import Enrollment from "./pages/Enrollment";
import Profile from "./pages/Profile";
import MobileApp from "./pages/MobileApp";
import About from "./pages/About";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import { Context } from "./context";
import Favorites from "./pages/Favorites";
import Received from "./pages/Received";

const PARSE_APPLICATION_ID = "yxPnWbQX9w1aSveJmbTIEJyWJUO7Lg4emp6rEmSX";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = "7JUESLrz0P2ALkZBtUIPLi1XJ7IN1ItWySclh5lU";
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  const [isDarkTheme, setDarkTheme] = React.useState(
    localStorage.getItem("isDarkTheme") ? true : false
  );
  const [isSaveProfiles, setSaveProfiles] = React.useState(
    localStorage.getItem("isFavoritesProfiles") ? false : true
  );

  const changeTheme = () => {
    localStorage.setItem("isDarkTheme", isDarkTheme);
    getThemeValue();
  };

  const changeFavorites = () => {
    localStorage.setItem("isFavoritesProfiles", isSaveProfiles);
    getValueFavorites();
  };

  const getThemeValue = () => {
    let bodyClass = document.body.classList,
      htmlClass = document.documentElement.classList;

    if (!localStorage.isDarkTheme) {
      localStorage.setItem("isDarkTheme", isDarkTheme);
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

  const getValueFavorites = () => {
    if (!localStorage.isFavoritesProfiles) {
      localStorage.setItem("isFavoritesProfiles", isSaveProfiles);
    }
    if (localStorage.getItem("isFavoritesProfiles") === "true") {
      setSaveProfiles(false);
    } else if (localStorage.getItem("isFavoritesProfiles") === "false") {
      setSaveProfiles(true);
    }
  };

  React.useEffect(() => {
    getThemeValue();
    getValueFavorites();

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <Context.Provider value={{ isDarkTheme, isSaveProfiles }}>
      <div className="App">
        <Header changeTheme={changeTheme} changeFavorites={changeFavorites} />
        {width > 279 ? (
          <div id="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/enrollment" element={<Enrollment />} />
              <Route path="/received" element={<Received />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/about" element={<About />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/download" element={<MobileApp />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        ) : (
          <div className="message-warning">Маленькая ширина экрана</div>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
