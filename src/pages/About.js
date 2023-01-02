import React from "react";
import InfoBlock from "../components/Blocks/InfoBlock";
import students from "../image/undraw_educator_re_ju47.svg";
import { YMaps, Map, Placemark, ZoomControl } from "@pbe/react-yandex-maps";
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
      content: ["priyomADI2023@yandex.ru"],
    },
  ]);
  const defaultState = {
    center: [48.299503, 38.002891],
    zoom: 17,
  };

  return (
    <div className="page">
      <div className="groups noPadding noBG">
        <h3 style={{ marginTop: 0 }}>{title}</h3>
        <img
          id="about-img"
          src={require("../image/ProfileBG.png")}
          alt="banner"
        />
        {/* <div className="groups">
          <img className="undraw-img max" style={{obje}} height={400} src={students} alt="..." />
        </div> */}
        <div>
          {aboutData.map((data) => {
            return (
              <InfoBlock
                key={data.title}
                title={data.title}
                textData={data.content}
              />
            );
          })}
        </div>

        <div className="separator"></div>
        <div className="groups noMargin">
          <YMaps className="ymap">
            <Map
              style={{
                width: "100%",
                minHeight: "250px",
                maxHeight: "350px",
                borderRadius: 12,
                overflow: "hidden",
              }}
              defaultState={defaultState}
            >
              <Placemark geometry={[48.299503, 38.002891]} />
              <ZoomControl />
            </Map>
          </YMaps>
        </div>
      </div>
    </div>
  );
}

export default About;
