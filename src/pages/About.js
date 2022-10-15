import React from "react";
import InfoBlockDefault from "../components/InfoBlocks/InfoBlockDefault";
import "./page.css";

function About() {
  return (
    <div className="page">
      <div id="about">
        <div id="about-img"></div>
        <div id="about-title">
          Автомобильно-дорожный институт Государственного образовательного
          учреждения высшего профессионального образования «Донецкий
          национальный технический университет»
        </div>
        <div>
          <InfoBlockDefault
            title="Дата создания образовательной организации"
            textData={["09.08.1959 г."]}
          />
          <InfoBlockDefault
            title="Адрес"
            textData={[
              "84646, Донецкая Народная Республика, г. Горловка, улица Кирова, 51",
            ]}
          />
          <InfoBlockDefault
            title="Приём документов"
            textData={[
              "г.Горловка, ДНР, Кирова 51, 2 этаж, аудитория 1-225/1-220",
            ]}
          />
          <InfoBlockDefault
            title="Контактные телефоны"
            textData={[
              "Феникс: +38071-31-48-610, +7949-31-48-610",
              "Городской: +38(0624)-55-36-25",
            ]}
          />
          <InfoBlockDefault
            title="Эл. почта для подачи документов"
            textData={["priyomADI2022@yandex.ru"]}
          />
        </div>
      </div>
    </div>
  );
}

export default About;
