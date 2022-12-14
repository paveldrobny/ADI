import React from "react";
import SelectedButton from "../components/Buttons/SelectedButton";
import TableMain from "../components/Table/TableMain";
import { NavLink } from "react-router-dom";
import banner from "../image/banner.jpg";
import devices from "../image/undraw_mobile_re_q4nk.svg";
import "./page.css";

const Home = () => {
  const [headers, setHeaders] = React.useState([
    { name: "Этапы вступительной кампании" },
    { name: "Сроки проведения этапов вступительной кампании" },
  ]);
  const [tableOne, setTableOne] = React.useState([
    {
      left: "Приём заявлений и докементов от лиц которые поступают на соновании оценов из Сертификатов (ГИА, ЕГЭ, ВНО) и (или) оценок из документа об образовании, на основании которого осуществляется поступление",
      right: "01 сентября - 14 сентября 2023 г. (не позднее 16:00)",
    },
    {
      left: "Сроки приема заявлений о согласии на зачисление",
      right: "01 сентября - 14 сентября 2023 г. (не позднее 16:00)",
    },
    {
      left: "Зачисление на места в рамках контрольных цифр приема",
      right: "15 сентября 2023 г. (не позднее 18:00)",
    },
    {
      left: "Зачисление на места, финансируемые за счет средств физических и (или) юридических лиц",
      right: "15 сентября 2023 г. (не позднее 18:00)",
    },
  ]);
  const [tableTwo, setTableTwo] = React.useState([
    {
      left: "Сроки приёма заявлений и документов для лиц, поступающих по направлениям подготовки, которые входят в одну укрупненную группу напрявлений подготовки",
      right: "01 сентября - 14 сентября 2023 г. (не позднее 16:00)",
    },
    {
      left: "Сроки приема заявлений и документов для лиц, поступающих по направлениям подготовки, которые не входят в одну укрупненную группу подготовки",
      right: "01 сентября - 14 сентября 2023 г. (не позднее 16:00)",
    },
    {
      left: "Сроки проведения вступительных испытаний",
      right: "13 сентября - 13 сентября 2023 г.",
    },
    {
      left: "Зачисление на места в рамках контрольных цифр приема",
      right: "15 сентября 2023 г. (не позднее 18:00)",
    },
    {
      left: "Зачисление на места, финансируемые за счет средств физических и (или) юридических лиц",
      right: "15 сентября 2023 г. (не позднее 18:00)",
    },
  ]);
  const [tableData, setTableData] = React.useState([tableOne, tableTwo]);
  const [selectedButtons, setSelectedButtons] = React.useState([
    { name: "Бакалавриат" },
    { name: "Магистратура" },
  ]);
  const [selectID, setSelectID] = React.useState(0);

  return (
    <div className="page">
      <div id="banner-content">
        <div className="groups space">
          <div className="img-row wrap">
            <h1 className="undraw-title size">ВСТУПИТЕЛЬНАЯ КАМПАНИЯ</h1>
            <div className="date">2023</div>
          </div>
        </div>
        {/* <div className="groups">
          <img id="banner" src={require("../image/banner.jpg")} alt="banner" />
        </div> */}
        <div className="groups">
          <div className="groups-title">
            Сроки вступительной компании в рамках дополнительного приема на
            обучение с 01 по 15 сентября 2023. Для поступающих по
            образовательным программам:
          </div>
          <div className="select-table-content">
            {selectedButtons.map((button, index) => {
              return (
                <SelectedButton
                  key={index}
                  title={button.name}
                  isActive={index === selectID}
                  align={button.align}
                  setID={() => setSelectID(index)}
                />
              );
            })}
          </div>
          {tableData.map((data, index) => {
            return (
              <TableMain
                key={index}
                isShow={index === selectID}
                headers={headers}
                tableData={data}
              />
            );
          })}
        </div>

        <div className="groups">
          <div className="img-row">
            <NavLink to="/download" className="tiles one space">
              <div className="tiles-flex">
                <div className="tiles-title">
                  Мобильное приложение "Абитуриент АДИ"
                  <i className="fas fa-external-link-alt"></i>
                </div>
                {/* <div className="tiles-text">Доступно на Android и IOS</div> */}
              </div>
            </NavLink>
            <img
              className="undraw-img"
              src={devices}
              style={{ objectPosition: "top" }}
              alt="..."
              height={155}
            />
          </div>
        </div>
        <div className="groups">
          <div className="img-row">
            <NavLink to="/received" className="tiles space">
              <div className="tiles-flex">
                <div className="tiles-title">
                  Список зачисленных
                  <i className="fas fa-external-link-alt"></i>
                </div>
                {/* <div className="tiles-text">Доступно на Android и IOS</div> */}
              </div>
            </NavLink>
            <NavLink to="/about" className="tiles">
              <div className="tiles-flex">
                <div className="tiles-title">
                  Об институте
                  <i className="fas fa-external-link-alt"></i>
                </div>
                {/* <div className="tiles-text">Доступно на Android и IOS</div> */}
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
