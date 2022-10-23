import React from "react";
import ListButton from "../Buttons/ListButton";
import "./Groups.css";

function DefaultGroups({ value, groups, index }) {
  return (
    <details className="details" key={index}>
      <summary className="details-title">{value}</summary>
      {groups
        .filter((group) => group.category === value)
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
