import React from "react";
import DefaultGroups from "../components/Groups/DefaultGroups";
import Parse from "parse/dist/parse.min.js";
import list from "../image/undraw_happy_news_re_tsbd.svg";

const Received = () => {
  const [groups, setGroups] = React.useState([]);

  const unique = (array) => {
    return array.filter((item, index) => {
      return array.indexOf(item) === index;
    });
  };

  const category = unique(
    groups
      .filter((f) => f.get("status") === "Зачислен")
      .map(
        (group) =>
          `${group.get("program")} / ${
            group.get("primary") === "Нет" ? group.get("plan") : "Особая квота"
          }`
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
        <div className="groups pHorizontal space">
          <div className="img-row">
            <h1 className="undraw-title">Список зачисленных</h1>
            <img
              className="undraw-img"
              style={{ objectPosition: "top" }}
              width={232}
              src={list}
              alt="..."
              height={150}
            />
          </div>
        </div>
        {category.length > 0 ? (
          category.map((value, index) => {
            return <DefaultGroups key={index} value={value} groups={groups} />;
          })
        ) : (
          <div className="groups">
            <h3>На данный момент зачисленных нет</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Received;
