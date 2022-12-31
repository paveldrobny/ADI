import React from "react";
import ListButton from "../Buttons/ListButton";
import "./Groups.css";

function DefaultGroups({ value, groups, index }) {
  const groupFilter = (group) => {
    return (
      `${group.get("program")} / ${
        group.get("primary") === "Нет" ? group.get("plan") : "Особая квота"
      }` === value && group.get("status") === "Зачислен"
    );
  };

  const isGroupEmpty = groups
    .filter(groupFilter)
    .map((group) => group.get("category"));

  return (
    <details
      className={`details ${!isGroupEmpty.toString() ? "hide" : ""}`}
      key={index}
    >
      <summary className="details-title">{value}</summary>
      <div className="groups-search small">
        {groups
          .sort((a, b) => b.get("score") - a.get("score"))
          .filter((group) => groupFilter(group))
          .map((group, index) => {
            return (
              <ListButton
                key={index}
                path={`/profile/${group.get("personalID")}`}
                title={`${index + 1}) №${group.get(
                  "personalID"
                )}, ${group.get("icode")}`}
              />
            );
          })}
      </div>
    </details>
  );
}

export default DefaultGroups;
