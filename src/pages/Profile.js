import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import studentsData from "../data/studentsData";
import { Context } from "../context";
import "./page.css";
import ProfileInfo from "../components/Profile/ProfileInfo";
import InfoBlock from "../components/Blocks/InfoBlock";
import ProfileAvatar from "../components/Profile/ProfileAvatar";

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

  const addToFavorites = (id) => {
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
          <div key={data.id} className="profile-content">
            <div className="profile-img"></div>
            <div className="profile-section">
              <div className="profile-top">
                <ProfileAvatar />
                <div className="profile-id">
                  {data.id}
                  {!isSaveProfiles ? (
                    <div className="profile-btn-content">
                      {!isFavoritesList() ? (
                        <button
                          onClick={() => addToFavorites(data.id)}
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
                <InfoBlock title={"Статус"} textData={data.status} />
                <InfoBlock title={"ИНН"} textData={data.id} />
                <InfoBlock title={"ФИО"} textData={data.name} />
                <InfoBlock title={"Пол"} textData={data.sex} />
                <InfoBlock
                  title={"Образовательная программа"}
                  textData={data.program}
                />
                <InfoBlock title={"Факультет"} textData={data.faculty} />
                <InfoBlock
                  title={"Форма обучения"}
                  textData={data.formEducation}
                />
                <InfoBlock title={"План"} textData={data.plan} />
                <InfoBlock title={"Группа"} textData={data.category} />
                <InfoBlock title={"Наличие льгот"} textData={data.privileges} />
                <InfoBlock
                  title={"Преимущественное право зачисления"}
                  textData={data.primary}
                />
                <InfoBlock
                  title={"Номер документа"}
                  textData={data.documentsSeries}
                />
                <InfoBlock title={"Конкурсный балл"} textData={data.score} />
                <InfoBlock
                  title={"Дата подачи документов"}
                  textData={data.documentsDate}
                />
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
