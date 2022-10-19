import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import studentsData from "../studentsData";
import { Context } from "../context";
import "./page.css";

function Profile() {
  const location = useLocation();
  const [favoritesData, setFavoritesData] = React.useState([]);
  const { isSaveProfiles } = useContext(Context);

  const getStudentID = () => {
    let str = location.pathname;
    let newPath = str.replace("/profile/", "");
    return Number(newPath);
  };

  React.useEffect(() => {
    getValue();
  }, []);

  const isFavoritesList = () => {
    if (
      localStorage.getItem("favoritesData") !== null &&
      localStorage.getItem("favoritesData") !== ""
    ) {
      return (
        JSON.parse(
          localStorage.getItem("favoritesData").indexOf(getStudentID())
        ) > -1
      );
    }
  };

  const addTest = (id) => {
    if (localStorage.getItem("favoritesData") === null) {
      const newArray = [];
      newArray.push(id);
      setFavoritesData(newArray);
      localStorage.setItem("favoritesData", JSON.stringify(newArray));
    }
    if (localStorage.getItem("favoritesData") !== null) {
      const newArray = [...favoritesData, id];
      setFavoritesData(newArray);
      localStorage.setItem("favoritesData", JSON.stringify(newArray));
    }
  };

  const getValue = () => {
    if (
      localStorage.getItem("favoritesData") !== null &&
      localStorage.getItem("favoritesData") !== ""
    ) {
      const value = JSON.parse(localStorage.getItem("favoritesData"));
      setFavoritesData(value);
    }
  };

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
                  <div className="profile-id">
                    {data.id}
                    {!isSaveProfiles ? (
                      <div className="profile-btn-content">
                        {!isFavoritesList() ? (
                          <button
                            onClick={() => addTest(data.id)}
                            className="profile-button"
                          >
                            В избранное
                          </button>
                        ) : (
                          <div id="profile-in-favorites">Уже в избранном</div>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
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
                    <div>{data.faculty}</div>
                  </div>
                  <div className="profile-info">
                    <div className="profile-info-title">
                      Образовательная программа
                    </div>
                    <div>{data.program}</div>
                  </div>
                  <div className="profile-info">
                    <div className="profile-info-title">План</div>
                    <div>{data.plan}</div>
                  </div>
                  <div className="profile-info">
                    <div className="profile-info-title">Форма обучения</div>
                    <div>{data.formEducation}</div>
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
