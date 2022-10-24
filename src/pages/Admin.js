import React from "react";
import Parse from "parse/dist/parse.min.js";
import ListButton from "../components/Buttons/ListButton";
import data from "../data/studentsData";
import Input from "../components/Inputs/Input";
import ToogleCategory from "../components/Categories/ToggleCategory";
import Dropdown from "../components/Inputs/Dropdown";

function Admin() {
  const [studentsData, setStudentsData] = React.useState(data);
  const [valueICode, setValueICode] = React.useState("");
  const [valueName, setValueName] = React.useState("");
  const [valueProgram, setValueProgram] = React.useState("");
  const [valueFaculty, setValueFaculty] = React.useState("");
  const [selectBlock, setSelectBlock] = React.useState("Студенты");

  // List
  const [programList, setProgramList] = React.useState([
    {
      name: "Бакалавриат",
    },
    {
      name: "Магистратура",
    },
  ]);
  const [facultyList, setFacultyList] = React.useState([
    {
      name: "ДТ",
    },
    {
      name: "ТиИТ",
    },
  ]);

  // Pages
  const [pages, setPages] = React.useState([
    { name: "Новости" },
    { name: "Студенты" },
  ]);

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

  return (
    <div className="page">
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

      <div id="admin-top-menu">
        <ToogleCategory
          title={"Блок"}
          buttonOne={pages[0].name}
          buttonTwo={pages[1].name}
          setFilter={setSelectBlock}
        />
      </div>

      {/* <div
        className={`admin-groups ${
          selectBlock === pages[0].name ? "" : "hide"
        }`}
      >
        <div id="admin-news">
          <h3 id="admin-news-title">Титулка</h3>
          <div id="admin-news-text">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
            aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
            imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
            mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum
            semper nisi. Aenean vulputate eleifend tellus.
          </div>
          <div id="admin-news-date">23.10.2022</div>
        </div>

        <button id="admin-add-new">Добавить запись</button>
      </div> */}

      <div className="admin-groups">
        <Input
          title="ИНН"
          type="text"
          value={valueICode}
          maxLength={12}
          onChange={(e) => setValueICode(e.target.value)}
        />
        <Input
          title="ФИО"
          type="text"
          maxLength={64}
          value={valueName}
          onChange={(e) => setValueName(e.target.value)}
        />
        <Dropdown
          title="Образовательная программа"
          size={"min"}
          groupList={programList}
          setFilter={setValueProgram}
        />
        <Dropdown
          title="Факультет"
          size={"min"}
          groupList={facultyList}
          setFilter={setValueFaculty}
        />

        {/*
        <Input
          title="Факультет"
          type="text"
          maxLength={64}
          value={valueName}
          onChange={(e) => setValueName(e.target.value)}
        />
        <Input
          title="Форма обучения"
          type="number"
          value={valueICode}
          maxLength={12}
          onChange={(e) => setValueICode(e.target.value)}
        />
        <Input
          title="План"
          type="text"
          maxLength={64}
          value={valueName}
          onChange={(e) => setValueName(e.target.value)}
        />
        <Input
          title="Группа"
          type="text"
          maxLength={64}
          value={valueName}
          onChange={(e) => setValueName(e.target.value)}
        />
        <Input
          title="Наличие льгот"
          type="text"
          maxLength={64}
          value={valueName}
          onChange={(e) => setValueName(e.target.value)}
        />
        <Input
          title="Преимущественное право зачисления"
          type="text"
          maxLength={64}
          value={valueName}
          onChange={(e) => setValueName(e.target.value)}
        />
        <Input
          title="Номер документа"
          type="number"
          maxLength={10}
          value={valueName}
          onChange={(e) => setValueName(e.target.value)}
        />
        <Input
          title="Конкурсный балл"
          type="number"
          maxLength={5}
          value={valueName}
          onChange={(e) => setValueName(e.target.value)}
        />
        <Input
          title="Статус"
          type="text"
          maxLength={64}
          value={valueName}
          onChange={(e) => setValueName(e.target.value)}
        /> */}
        <button id="admin-add-new">Добавить студента</button>
      </div>

      {/* <div className="admin-groups">
        {studentsData.map((data, value) => {
          return (
            <ListButton
              path={"SD"}
              setID={data.setID}
              title={`${value + 1}. ${data.name}`}
            />
          );
        })}
      </div> */}
    </div>
  );
}

export default Admin;
