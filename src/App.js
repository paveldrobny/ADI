import "./App.css";
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

const PARSE_APPLICATION_ID = "yxPnWbQX9w1aSveJmbTIEJyWJUO7Lg4emp6rEmSX";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = "7JUESLrz0P2ALkZBtUIPLi1XJ7IN1ItWySclh5lU";
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
  return (
    <div className="App">
      <Header />
      <div id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/enrollment" element={<Enrollment />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/download" element={<MobileApp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
