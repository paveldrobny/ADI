import React from "react";
import ListButton from "../Buttons/ListButton";
import "./Groups.css";

function GroupsDefault({ value, groups, index }) {
  return (
    <details className="details" key={index}>
      <summary className="details-title">{value}</summary>
      {groups
      .filter(group => group.category === value)
      .map((group, index) => {
        return (
          <ListButton
            key={index}
            path={`/profile/${group.id}`}
            title={`${index + 1}. ` + group.name}
          />
        );
      })}
      {/* <div className="table-scroll">
        <table className="groups-table">
          <thead>
            <tr>
              {headers.map((header) => {
                return <th key={header.name}>{header.name}</th>;
              })}
            </tr>
          </thead>
          {groups
            .filter((group) => group.category === value)
            .map((group, index) => {
              return (
                <tbody key={group.id}>
                  <tr className="redirect-row">
                    <td>{index + 1}</td>
                    <td>{group.id}</td>
                    <td>{group.name}</td>
                    <td>{group.documentsSeries}</td>
                    <td>{group.competitiveScore}</td>
                    <td>{group.privileges ? "Да" : "Нет"}</td>
                    <td>{group.primary ? "Да" : "Нет"}</td>
                  </tr>
                </tbody>
              );
            })}
        </table>
      </div> */}
    </details>
  );
}

export default GroupsDefault;
