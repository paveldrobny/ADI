import React from "react";
import ListButton from "../Buttons/ListButton";
import "./Groups.css";

function DefaultGroups({ value, groups, index }) {
  const groupFilter = (group) => {
    return (
      group.category === value &&
      group.category.length <= 1 &&
      group.isReceived === true
    );
  };

  const isGroupEmpty = groups
    .filter(groupFilter)
    .map((group) => group.category);

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
              path={`/profile/${group.id}`}
              title={`${index + 1}. ` + group.name}
            />
          );
        })}
    </details>
  );
}

export default DefaultGroups;
