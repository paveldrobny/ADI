import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "../context";
import "./page.css";
import ProfileInfo from "../components/Profile/ProfileInfo";
import InfoBlock from "../components/Blocks/InfoBlock";
import ProfileAvatar from "../components/Profile/ProfileAvatar";
import Parse from "parse/dist/parse.min.js";

function Profile() {
  const location = useLocation();
  const [favoritesData, setFavoritesData] = React.useState([]);
  const { isSaveProfiles } = useContext(Context);
  const [studentsData, setStudentsData] = React.useState([]);

  const getStudentID = () => {
    let str = location.pathname;
    let newPath = str.replace("/profile/", "");
    return Number(newPath);
  };

  React.useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    const query = new Parse.Query("Person");

    try {
      let data = await query.find();
      setStudentsData(data);
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

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

  const hasOtherCards = (d, data) => {
    return d.get("icode") === data.get("icode");
  };

  return (
    <div className="profile">
      {studentsData !== null &&
      studentsData !== undefined &&
      studentsData.length > 0
        ? studentsData.map((data) => {
            return data.get("personalID") === getStudentID().toString() ? (
              <div key={data.get("personalID")} className="profile-content">
                <div className="profile-img"></div>
                <div className="profile-section">
                  <div className="profile-top">
                    <ProfileAvatar />
                    <div className="profile-id">
                      №{data.get("personalID")}
                      {!isSaveProfiles ? (
                        <div className="profile-btn-content">
                          {!isFavoritesList() ? (
                            <button
                              onClick={() =>
                                addToFavorites(data.get("personalID"))
                              }
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
                    {studentsData
                      .filter((d) => hasOtherCards(d, data))
                      .map((d, index, arr) => {
                        return arr.length - 1 === index &&
                          arr.length - 1 !== 0 ? (
                          <div id="warning" key={index}>
                            <div id="warning-title">
                              <i className="fas fa-exclamation-triangle"></i>У
                              студента есть еще личных дел:{" "}
                              <b>{arr.length - 1} шт.</b>
                            </div>
                          </div>
                        ) : (
                          ""
                        );
                      })}
                    <InfoBlock title={"Статус"} textData={data.get("status")} />
                    <InfoBlock
                      title={"№ личного дела"}
                      textData={data.get("personalID")}
                    />
                    <InfoBlock title={"ИНН"} textData={data.get("icode")} />
                    <InfoBlock title={"ФИО"} textData={data.get("name")} />
                    <InfoBlock title={"Пол"} textData={data.get("sex")} />
                    <InfoBlock
                      title={"Образовательная программа"}
                      textData={data.get("program")}
                    />
                    <InfoBlock
                      title={"Факультет"}
                      textData={data.get("faculty")}
                    />
                    <InfoBlock
                      title={"Форма обучения"}
                      textData={data.get("formEducation")}
                    />
                    <InfoBlock title={"План"} textData={data.get("plan")} />
                    <InfoBlock
                      title={"Специальность"}
                      textData={data.get("category")}
                    />
                    <InfoBlock
                      title={"Наличие льгот"}
                      textData={data.get("privileges")}
                    />
                    <InfoBlock
                      title={"Преимущественное право зачисления"}
                      textData={data.get("primary")}
                    />
                    <InfoBlock
                      title={"Номер документа"}
                      textData={data.get("documentsSeries")}
                    />
                    <InfoBlock
                      title={"Конкурсный балл"}
                      textData={data.get("score")}
                    />
                    <InfoBlock
                      title={"Дата подачи документов"}
                      textData={data.get("documentsDate")}
                    />
                  </div>
                </div>
              </div>
            ) : (
              ""
            );
          })
        : "Данных нет..."}
    </div>
  );
}

export default Profile;
