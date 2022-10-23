import React from "react";
import "./page.css";

function MobileApp() {
  const [title, setTitle] = React.useState(
    "Мобильное приложение 'Абитуриент АДИ'"
  );
  const [downloadText, setDownloadText] = React.useState("Загрузить");
  const [description, setDescription] = React.useState(
    "Доступно на Android и IOS"
  );
  const [privilegeList, setPrivilegeList] = React.useState([
    "узнайте, что нужно для поступления",
    "следите за последними новостями",
    "проматривайте списки поступивших",
    "профиль поступающего",
  ]);

  return (
    <div className="page min">
      <div id="mobile-app-content">
        <div id="mobile-content-left">
          <div id="mobile-title">{title}</div>
          <div id="mobile-download">
            <a href="">
              {downloadText}
              <i style={{ margin: "0 5px" }} className="fas fa-download"></i>
            </a>
          </div>
          <div id="mobile-desc">{downloadText}</div>
          <div id="test-content">
            <div id="test">узнайте, что нужно для поступления</div>
            <div id="test">следите за последними новостями</div>
            <div id="test">проматривайте списки поступивших</div>
            <div id="test">профиль поступающего</div>
          </div>
        </div>
        <div id="mobile-content-right">
          <div id="mobile">
            <div id="mobile-status-bar">
              <div id="mobile-bar-clock"></div>
              <div id="mobile-bar-content">
                <div id="mobile-bar-power"></div>
                <div id="mobile-bar-percent"></div>
              </div>
            </div>
            <div id="mobile-routing"></div>
            <div id="mobile-content">
              <div className="mobile-list"></div>
              <div className="mobile-list"></div>
              <div className="mobile-list"></div>
              <div className="mobile-list"></div>
              <div className="mobile-list"></div>
              <div className="mobile-list"></div>
              <div className="mobile-list"></div>
              <div className="mobile-list"></div>
              <div className="mobile-list"></div>
            </div>
            <div id="mobile-nav-bar">
              <div id="mobile-bar-btn"></div>
              <div id="mobile-bar-btn"></div>
              <div id="mobile-bar-btn"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileApp;
