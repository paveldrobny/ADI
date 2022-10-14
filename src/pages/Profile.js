import React from "react";
import { useLocation } from "react-router-dom";
import studentsData from "../studentsData";
import "./page.css";

function Profile() {
  const location = useLocation();

  const getStudentID = () => {
    let str = location.pathname;
    let newPath = str.replace("/profile/", "");
    return Number(newPath);
  };

  console.log(getStudentID());

  return (
    <div className="profile">
      {studentsData.map((data) => {
        return data.id === getStudentID() ? (
          <div key={data.id}>
            <div className="profile-bg">
              <div className="profile-img"></div>
            </div>
            <div className="profile-content">
              <div className="profile-parallax">
                <div className="profile-top">
                  <div className="profile-avatar">
                    <i className="fas fa-user" />
                  </div>
                  <div className="profile-id">{data.id}</div>
                </div>
                <div className="profile-main">
                <div className="profile-info">
                    <div className="profile-info-title">ФИО</div>
                    <div>{data.name}</div>
                  </div>
                  <div className="profile-info">
                    <div className="profile-info-title">Группа</div>
                    <div>{data.category}</div>
                  </div>
                  <div className="profile-info">
                    <div className="profile-info-title">Факультет</div>
                    <div>ТиИТ</div>
                  </div>
                  <div className="profile-info">
                    <div className="profile-info-title">
                      Образовательная программа
                    </div>
                    <div>Бакалавриат</div>
                  </div>
                  <div className="profile-info">
                    <div className="profile-info-title">План</div>
                    <div>Бюджет</div>
                  </div>
                  <div className="profile-info">
                    <div className="profile-info-title">Форма обучения</div>
                    <div>Очная</div>
                  </div>
                  <div className="profile-info">
                    <div className="profile-info-title">№ личного дела</div>
                    <div>9644</div>
                  </div>
                  <div className="profile-info">
                    <div className="profile-info-title">Серия документа</div>
                    <div>3565434</div>
                  </div>
                  <div className="profile-info">
                    <div className="profile-info-title">Конкурсный балл</div>
                    <div>95</div>
                  </div>
                  <div className="profile-info">
                    <div className="profile-info-title">Наличие льгот</div>
                    <div>Да</div>
                  </div>
                  <div className="profile-info">
                    <div className="profile-info-title">
                      Преимущественное право зачисления
                    </div>
                    <div>Да</div>
                  </div>
                  <div className="profile-info">
                    <div className="profile-info-title">
                      Дата подачи документов
                    </div>
                    <div>05.05.2022</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        );
      })}
    </div>
  );
}

export default Profile;
