import React from "react";
import ListButton from "../Buttons/ListButton";
import "./Groups.css";

function FilterGroups({ filter, myGroup }) {
  return (
    <div id="group-search">
      <div className={`group-result ${filter.length > 0 ? "" : "hide"}`}>
        Найдено совпадений (Категории):
        <span className="group-result-text">{filter.length}</span>
      </div>
      <div className={`group-result ${filter.length <= 0 ? "" : "hide"}`}>
        Ничего не найдено (Категории)
      </div>
      {filter.map((group, index) => {
        return (
          <ListButton
            key={index}
            path={`/profile/${group.id}`}
            title={`${index + 1}. ${group.name} ${
              myGroup === "" ? `(${group.category})` : ""
            }`}
          />
        );
      })}
    </div>
  );
}

export default FilterGroups;
