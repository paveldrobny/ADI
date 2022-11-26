import React from "react";
import DefaultGroups from "../components/Groups/DefaultGroups";
import Parse from "parse/dist/parse.min.js";

const Received = () => {
  const [groups, setGroups] = React.useState([]);

  const unique = (array) => {
    return array.filter((item, index) => {
      return array.indexOf(item) === index;
    });
  };

  const category = unique(
    groups.map(
      (group) =>
        `${group.get("program")} / ${
          group.get("primary") === "Нет" ? group.get("plan") : "Особая квота"
        } / ${group.get("faculty")}`
    )
  );

  React.useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    const query = new Parse.Query("Person");
    try {
      let data = await query.find();
      setGroups(data);
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  return (
    <div className="page">
      <div id="groups">
        <h3 style={{ padding: 10 }}>Список поступивших</h3>
        {category.map((value, index) => {
          return <DefaultGroups key={index} value={value} groups={groups} />;
        })}
      </div>
    </div>
  );
};

export default Received;
