import React from "react";
import Parse from "parse/dist/parse.min.js";
import ListButton from "../components/Buttons/ListButton";
import data from "../data/studentsData";
import Input from "../components/Inputs/Input";

function Admin() {
  const [studentsData, setStudentsData] = React.useState([]);
  const [valueICode, setValueICode] = React.useState("");
  const [valueName, setValueName] = React.useState("");

  async function addPerson() {
    try {
      // create a new Parse Object instance
      const Person = new Parse.Object("Person");
      // define the attributes you want for your Object
      Person.set("ICode", valueICode);
      Person.set("name", valueName);

      await Person.save();
      // fetchStudents();
    } catch (error) {
      console.log("Error saving new person: ", error);
    }
  }

  async function fetchStudents() {
    const query = new Parse.Query("Person");

    try {
      let data = await query.find();
      setStudentsData(data);
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  console.log(studentsData);

  return (
    <div className="page min">
      <div id="admin-secure">
        <div id="admin-sign-in">Админ-панель</div>
        <div className="admin-input-content">
          <label>Логин</label>
          <input type="text"></input>
        </div>
        <div className="admin-input-content">
          <label>Пароль</label>
          <input type="password"></input>
        </div>
        <button id="test-btn-admin">Войти</button>
      </div>

      <Input
        title="ИНН студента"
        type="number"
        value={valueICode}
        onChange={(e) => setValueICode(e.target.value)}
      />

      <Input
        title="ФИО студента"
        type="text"
        value={valueName}
        onChange={(e) => setValueName(e.target.value)}
      />

      {/* <button onClick={addPerson}>ДОБАВИТЬ</button>
      <button onClick={fetchStudents}>ВЫВОД</button> */}

      {studentsData.length > 0
        ? studentsData.map((data) => {
            return (
              <ListButton
                path={"/sad"}
                key={data.id}
                setID={data.id}
                title={data.id}
              />
            );
          })
        : ""}
    </div>
  );
}

export default Admin;
