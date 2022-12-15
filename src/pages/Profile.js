import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "../context";
import "./page.css";
import ProfileInfo from "../components/Profile/ProfileInfo";
import InfoBlock from "../components/Blocks/InfoBlock";
import ProfileAvatar from "../components/Profile/ProfileAvatar";
import Parse from "parse/dist/parse.min.js";
import students from "../image/undraw_wall_post_re_y78d.svg";

function Profile() {
  const location = useLocation();
  const [favoritesData, setFavoritesData] = React.useState([]);
  const { isSaveProfiles } = useContext(Context);
  const [studentsData, setStudentsData] = React.useState([]);
  const [studentInfo, setStudentsInfo] = React.useState([
    { name: "Статус", key: "status" },
    { name: "№ личного дела", key: "personalID" },
    { name: "Конкурсный балл", key: "score" },
    { name: "ИНН", key: "icode" },
    { name: "ФИО", key: "name" },
    { name: "Факультет", key: "faculty" },
    { name: "Форма обучения", key: "formEducation" },
    { name: "Специальность", key: "category" },
    { name: "Образовательная программа", key: "program" },
    { name: "План", key: "plan" },
    { name: "Наличие льгот", key: "privileges" },
    { name: "Преим. право зачисления", key: "primary" },
  ]);

  const [studentAdditionInfo, setStudentAdditionInfo] = React.useState([
    { name: "Дата подачи документов", key: "documentsDate" },
    { name: "Балл по русскому языку", key: "scoreRussian" },
    { name: "Балл по математике", key: "scoreMath" },
    { name: "Балл по иностранному", key: "scoreForeign" },
    { name: "Профильный предмет", key: "profileSubject" },
    { name: "Балл по проф. предмету", key: "scoreProfileSubject" },
    { name: "Балл по ГИА", key: "scoreGIA" },
    { name: "Средний балл аттестата", key: "averageScoreCertificate" },
    {
      name: "Средний балл диплома бакалавра / специалиста",
      key: "averageScoreDegree",
    },
    {
      name: "Средний балл диплома специалиста среднего звена",
      key: "averageScoreMiddle",
    },
    { name: "Дополнительный балл / причины начисления", key: "extraScore" },
    { name: "Иностранный язык, который изучался", key: "foreignLang" },
    { name: "Дата рождения", key: "birthday" },
    { name: "Телефон для связи", key: "phone" },
  ]);

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
                <div className="groups space">
                  <div className="img-row">
                    <h1 className="undraw-title">№{data.get("personalID")}</h1>
                    <img
                      className="undraw-img"
                      src={students}
                      style={{ objectPosition: "top" }}
                      alt="..."
                      width={350}
                      height={120}
                    />
                  </div>
                </div>
                <div className="profile-section">
                  <div className="profile-top">
                    <ProfileAvatar />
                    <div className="profile-id">
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
                            <div id="profile-in-favorites">В избранном</div>
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
                              студента есть еще личных дел:
                              <b>{arr.length - 1} шт.</b>
                            </div>
                          </div>
                        ) : (
                          ""
                        );
                      })}

                    {studentInfo.map((info) => {
                      return (
                        <InfoBlock
                          key={info.name}
                          title={info.name}
                          textData={data.get(info.key)}
                        />
                      );
                    })}

                    <div className="category-title no-space">
                      Дополнительная информация
                    </div>

                    {studentAdditionInfo
                      .filter(
                        (f) => data.get(f.key) !== "" && data.get(f.key) !== 0
                      )
                      .map((info) => {
                        return (
                          <InfoBlock
                            key={info.name}
                            title={info.name}
                            textData={data.get(info.key)}
                          />
                        );
                      })}
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
