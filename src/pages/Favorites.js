import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import ListButton from "../components/Buttons/ListButton";
import { Context } from "../context";
import "./page.css";

function Favorites() {
  const location = useLocation();
  const [favoritesData, setFavoritesData] = React.useState([]);

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
        <div className="favorites-title">Ваши избранные профили</div>
        <button className="favorites-btn-delete" onClick={deleteFavorites}>
          Удалить все профили
        </button>
        {favoritesData.length > 0 ? (
          favoritesData.map((data) => {
            return <ListButton path={`/profile/${data}`} title={data} />;
          })
        ) : (
          <div className="favorites-list-empty">Список избранных пуст</div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
