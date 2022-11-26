import React from "react";
import ListButton from "../components/Buttons/ListButton";
import "./page.css";

function Favorites() {
  const [favoritesData, setFavoritesData] = React.useState([]);
  const [title, setTitle] = React.useState("Ваши избранные профили");
  const [btnText, setBtnText] = React.useState("Удалить все профили");
  const [emptyDataText, setEmptyDataText] = React.useState(
    "Подсказка: В нужном профиле нажмите 'В избранное'."
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
        <div className="favorites-title">{title}</div>
        <button className="favorites-btn-delete" onClick={deleteFavorites}>
          {btnText}
        </button>
        {favoritesData.length > 0 ? (
          favoritesData.map((data) => {
            return <ListButton path={`/profile/${data}`} title={data} />;
          })
        ) : (
          <div className="favorites-list-empty">{emptyDataText}</div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
