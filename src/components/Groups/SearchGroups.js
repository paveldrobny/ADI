import React from "react";
import ListButton from "../Buttons/ListButton";
import "./Groups.css";

function SearchGroups({ filter, query }) {
  return (
    <div id="group-search">
      <div className={`group-result ${filter.length > 0 ? "" : "hide"}`}>
        Найдено совпадений:
        <span className="group-result-text">{filter.length}</span>
      </div>
      <div className={`group-result ${filter.length <= 0 ? "" : "hide"}`}>
        По запросу
        <span className="group-result-text">{query}</span>
        ничего не найдено
      </div>

      {filter.map((group, value) => {
        return (
          <ListButton
            key={group.get("personalID")}
            path={`/profile/${group.get("personalID")}`}
            title={`${value + 1}. ${group.get("icode")}, №${group.get(
              "personalID"
            )} (${group.get("category")})`}
          />
        );
      })}
    </div>
  );
}

export default SearchGroups;
