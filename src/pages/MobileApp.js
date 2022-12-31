import React from "react";
import mobileApp from "../image/undraw_mobile_app_re_catg.svg";
import download from "../image/undraw_cloud_files_wmo8.svg";
import "./page.css";

function MobileApp() {
  const [title, setTitle] = React.useState(
    "Мобильное приложение 'Абитуриент АДИ'"
  );
  const [downloadText, setDownloadText] = React.useState(
    "Загрузить для Android"
  );
  const [description, setDescription] = React.useState("Загрузить для IOS");
  const [privilegeList, setPrivilegeList] = React.useState([
    "узнайте, что необходимо для поступления",
    "следите за последними новостями",
    "проматривайте списки поступивших",
    "профиль поступающего",
  ]);

  return (
    <div className="page min">
      <div className="groups pHorizontal space">
        <div className="img-row">
          <h1 className="undraw-title">{title}</h1>
          <img
            className="undraw-img"
            src={download}
            style={{ objectPosition: "center" }}
            alt="..."
            width={300}
            height={120}
          />
        </div>
      </div>
      <div id="mobile-app-content">
        <div id="mobile-content-left">
          <div id="mobile-download">
            <a href="">
              {downloadText}
              <i style={{ margin: "0 5px" }} className="fas fa-download"></i>
            </a>
          </div>
          <div>
            <div id="mobile-desc">{description}</div>
          </div>
          <div id="list-content">
            {privilegeList.map((list) => {
              return (
                <div key={list} className="list">
                  {list}
                </div>
              );
            })}
          </div>
        </div>
        <div id="mobile-content-right">
          <img
            className="undraw-img"
            src={mobileApp}
            style={{ objectPosition: "top" }}
            alt="..."
            width={320}
            height={300}
          />
        </div>
      </div>
    </div>
  );
}

export default MobileApp;
