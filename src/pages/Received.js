import React from "react";
import DefaultGroups from "../components/Groups/DefaultGroups";
import data from "../data/studentsData";

const Received = () => {
  const [groups, setGroups] = React.useState(data);

  const unique = (array) => {
    return array.filter((item, index) => {
      return array.indexOf(item) === index;
    });
  };
  const categories = unique(groups.map((group) => group.category));

  return (
    <div className="page">
      <div id="groups">
        {categories.map((value, index) => {
          return <DefaultGroups key={index} value={value} groups={groups} />;
        })}
      </div>
    </div>
  );
};

export default Received;
