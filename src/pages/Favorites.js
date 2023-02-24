import React from "react";
import ListButton from "../components/Buttons/ListButton";
import students from "../image/undraw_team_page_re_cffb.svg";
import "./page.css";

function Favorites() {
  const [favoritesData, setFavoritesData] = React.useState([]);
  const [title, setTitle] = React.useState("Ваши избранные профили");
  const [btnText, setBtnText] = React.useState("Очистить список");
  const [emptyDataText, setEmptyDataText] = React.useState(
    "Подсказка: В понравившемся профиле нажмите 'В избранное'."
  );

  React.useEffect(() => {
    getValue();
  }, []);

  const deleteFavorites = () => {
    localStorage.removeItem("favoritesData");
    setFavoritesData([]);
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
    <div className="page min">
      <div className="favorites">
        <div className="groups pHorizontal space">
          <div className="img-row">
            <h1 className="undraw-title">{title}</h1>
            <img
              className="undraw-img"
              src={students}
              style={{ objectPosition: "center" }}
              alt="..."
              width={210}
              height={135}
            />
          </div>
        </div>
        <div className="groups noPadding noBG">
          <button className="favorites-btn-delete" onClick={deleteFavorites}>
            {btnText}
          </button>
          <div className="groups-search">
            {favoritesData.length > 0 ? (
              favoritesData.map((data) => {
                return <ListButton path={`/profile/${data}`} title={data} />;
              })
            ) : (
              <div className="favorites-list-empty">{emptyDataText}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Favorites;
