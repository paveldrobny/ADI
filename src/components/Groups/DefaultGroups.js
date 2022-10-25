import React from "react";
import ListButton from "../Buttons/ListButton";
import "./Groups.css";

function DefaultGroups({ value, groups, index }) {
  const groupFilter = (group) => {
    return (
     group.get("category") === value &&
      group.get("faculty").length <= 1 &&
      group.get("category").length <= 1 &&
      group.get("status") === "Поступил"
    );
  };

  const isGroupEmpty = groups
    .filter(groupFilter)
    .map((group) => group.get("category"));

  return (
    <details
      className={`details ${
        value.indexOf(isGroupEmpty.toString()) ? "hide" : ""
      }`}
      key={index}
    >
      <summary className="details-title">{value}</summary>
      {groups
        .filter((group) => groupFilter(group))
        .map((group, index) => {
          return (
            <ListButton
              key={index}
              path={`/profile/${group.get("icode")}`}
              title={`${index + 1}. ` + group.get("name")}
            />
          );
        })}
    </details>
  );
}

export default DefaultGroups;
