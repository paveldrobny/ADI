import React from "react";
import ListButton from "../Buttons/ListButton";
import "./Groups.css";

function GroupsSearch({ filter, query, headersSearch }) {
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
            path={`/profile/${group.id}`}
            title={`${value + 1}. ${group.name} (${group.category})`}
          />
        );
      })}

      {/* <table
        className={`groups-table space ${filter.length > 0 ? "" : "hide"}`}
      >
        <thead>
          <tr>
            {headersSearch.map((header) => {
              return <th key={header.name}>{header.name}</th>;
            })}
          </tr>
        </thead>
        {filter.map((group, index) => {
          return (
            <tbody key={group.id}>
              <tr>
                <td>{group.category}</td>
                <td>{group.name}</td>
                <td>{group.formEducation}</td>
                <td>{group.competitiveScore}</td>
                <td>{group.privileges ? "Да" : "Нет"}</td>
                <td>{group.primary ? "Да" : "Нет"}</td>
              </tr>
            </tbody>
          );
        })}
      </table> */}
    </div>
  );
}

export default GroupsSearch;
