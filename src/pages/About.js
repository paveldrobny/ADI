import React from "react";
import InfoBlock from "../components/Blocks/InfoBlock";
import "./page.css";

function About() {
  const [title, setTitle] = React.useState(
    "Автомобильно-дорожный институт Государственного образовательного учреждения высшего профессионального образования «Донецкий национальный технический университет»"
  );
  const [aboutData, setAboutData] = React.useState([
    {
      title: "Дата создания образовательной организации",
      content: ["09.08.1959 г."],
    },
    {
      title: "Адрес",
      content: [
        "84646, Донецкая Народная Республика, г. Горловка, улица Кирова, 51",
      ],
    },
    {
      title: "Приём документов",
      content: ["г.Горловка, ДНР, Кирова 51, 2 этаж, аудитория 1-225/1-220"],
    },
    {
      title: "Контактные телефоны",
      content: [
        "Феникс: +38071-31-48-610, +7949-31-48-610",
        "Городской: +38(0624)-55-36-25",
      ],
    },
    {
      title: "Эл. почта для подачи документов",
      content: ["priyomADI2022@yandex.ru"],
    },
  ]);

  return (
    <div className="page">
      <div id="about">
        <div id="about-img"></div>
        <div id="about-title">{title}</div>
        <div>
          {aboutData.map((data) => {
            return <InfoBlock title={data.title} textData={data.content} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default About;
