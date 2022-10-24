import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import studentsData from "../data/studentsData";
import { Context } from "../context";
import "./page.css";
import ProfileInfo from "../components/Profile/ProfileInfo";
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
                <ProfileInfo title={"ФИО"} text={data.name} />
                <ProfileInfo title={"Группа"} text={data.category} />
                <ProfileInfo title={"Факультет"} text={data.faculty} />
                <ProfileInfo
                  title={"  Образовательная программа"}
                  text={data.program}
                />
                <ProfileInfo title={"План"} text={data.plan} />
                <ProfileInfo
                  title={"Форма обучения"}
                  text={data.formEducation}
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
