import React, { useEffect, useState } from "react";
import Parse from "parse/dist/parse.min.js";
import ListButton from "../components/Buttons/ListButton";
import data from "../data/studentsData";
import Input from "../components/Inputs/Input";
import ToogleCategory from "../components/Categories/ToggleCategory";
import Dropdown from "../components/Inputs/Dropdown";
import DropdownMulti from "../components/Inputs/DropdownMulti";
import AdminListButton from "../components/Buttons/AdminListButton";
import InputDefault from "../components/Inputs/InputDefault";

function Admin() {
  const [studentsData, setStudentsData] = useState([]);
  const [valueICode, setValueICode] = useState("");
  const [valueName, setValueName] = useState("");
  const [valueSex, setValueSex] = useState("");
  const [valueProgram, setValueProgram] = useState("");
  const [valueFaculty, setValueFaculty] = useState([]);
  const [valueForm, setValueForm] = useState("");
  const [valuePlan, setValuePlan] = useState("");
  const [valueGroup, setValueGroup] = useState([]);
  const [valuePrivileges, setValuePrivileges] = useState("");
  const [valuePrimary, setValuePrimary] = useState("");
  const [valueDocumentNum, setValueDocumentNum] = useState("");
  const [valueScore, setValueScore] = useState("");
  const [valueStatus, setValueStatus] = useState("");
  const [valueDateDocument, setValueDateDocument] = useState("");

  const [selectBlock, setSelectBlock] = useState("Студенты");

  // List

  const [sexList, setSexList] = useState(["Муж.", "Жен."]);
  const [programList, setProgramList] = useState([
    "Бакалавриат",
    "Магистратура",
  ]);
  const [facultyList, setFacultyList] = useState(["ДТ", "ТиИТ"]);

  const [formList, setFormList] = useState(["Очная", "Заочная"]);

  const [planList, setPlanList] = useState(["Бюджет", "Контракт"]);

  const [groupList, setGroupList] = useState([
    "ЭТТМиК-23",
    "ЭТТМиК (маг.)",
    "ЭТТМиК (заоч.)",
    "Менеджмент-23",
    "Менеджмент (маг.)",
    "Менеджмент (заоч.)",
    "ТСБ-23",
    "ТСБ-23 (маг.)",
    "ТСБ-23 (заоч.)",
    "ИСиТ-23",
    "ИСиТ-23 (маг.)",
    "ИСиТ-23 (заоч.)",
    "БИ-23",
    "БИ-23 (маг.)",
    "БИ-23 (заоч.)",
  ]);

  const [statusList, setStatusList] = useState(["Зачисляется", "Поступил"]);

  const [yesNoList, setYesNoList] = useState(["Да", "Нет"]);

  // Pages
  const [pages, setPages] = useState([
    { name: "Новости" },
    { name: "Студенты" },
  ]);

  // console.log(valueICode === "");
  // console.log(valueName === "");
  // console.log(valueSex === "");
  // console.log(valueProgram === "");
  // console.log(valueFaculty === "");
  // console.log(valueForm === "");
  // console.log(valueGroup === "");
  // console.log(valuePrivileges === "");
  // console.log(valuePrimary === "");
  // console.log(valueDocumentNum === "");
  // console.log(valueScore === "");
  // console.log(valueStatus === "");
  // console.log(valueDateDocument === "");

  useEffect(() => {
    fetchStudents();
  }, []);

  const onEditConfirm = async function (id) {};

  const onEditUser = async function (id) {
    if (
      window.confirm(`Редактировать студента?\nИНН: ${data.id},\n${data.name}`)
    ) {
      let person = new Parse.Object("Person");
      setValueICode(person.get("icode"));
      setValueName(person.get("icode"));
      setValueSex(person.get("icode"));
      setValueProgram(person.get("icode"));
      setValueFaculty(person.get("icode"));
      setValueForm(person.get("icode"));
      setValuePlan(person.get("icode"));
      setValueGroup(person.get("icode"));
      setValuePrivileges(person.get("icode"));
      setValuePrimary(person.get("icode"));
      setValueDocumentNum(person.get("icode"));
      setValueScore(data.score);
      setValueStatus(data.status);
      setValueDateDocument(data.documentsDate);

      try {
        await person.save();
        alert("Данные обновлены");
        fetchStudents();
        return true;
      } catch (error) {
        alert(`Ошибка! ${error.message}`);
        return false;
      }
    }
  };

  const onDeleteUser = async function (id) {
    let person = new Parse.Object("Person");
    person.set("objectId", id);
    try {
      await person.destroy();
      alert("Студент удален");
      return true;
    } catch (error) {
      alert(`Ошибка! ${error.message}`);
      return false;
    }
  };

  const isEmpty = () => {
    return (
      valueICode === "" &&
      valueName === "" &&
      valueSex === "" &&
      valueProgram === "" &&
      valueFaculty === "" &&
      valueForm === "" &&
      valueGroup === "" &&
      valuePrivileges === "" &&
      valuePrimary === "" &&
      valueDocumentNum === "" &&
      valueScore === "" &&
      valueStatus === "" &&
      valueDateDocument === ""
    );
  };

  async function addPerson() {
    let person = new Parse.Object("Person");
    if (!isEmpty()) {
      person.set("icode", valueICode);
      person.set("name", valueName);
      person.set("sex", valueSex);
      person.set("program", valueProgram);
      person.set("faculty", valueFaculty);
      person.set("formEducation", valueForm);
      person.set("plan", valuePlan);
      person.set("category", valueGroup);
      person.set("privileges", valuePrivileges);
      person.set("primary", valuePrimary);
      person.set("documentsSeries", valueDocumentNum);
      person.set("score", valueScore);
      person.set("status", valueStatus);
      person.set("documentsDate", valueDateDocument);

      try {
        await person.save();
        alert("Студент добавлен");
        return true;
      } catch (error) {
        alert(`ОШИБКА! ${error.message}`);
        return false;
      }
    } else {
      alert("Не все поля заполнены");
    }
  }

  async function fetchStudents() {
    const query = new Parse.Query("Person");

    try {
      let data = await query.find();
      setStudentsData(data);
      console.log(studentsData);
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

      {/* <div id="admin-top-menu">
        <ToogleCategory
          title={"Блок"}
          buttonOne={pages[0].name}
          buttonTwo={pages[1].name}
          setFilter={setSelectBlock}
        />
      </div> */}

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
        <h3 className="admin-groups-title">Добавить / редактировать данные</h3>
        <Input
          title="ИНН"
          type="text"
          maxLength={12}
          value={valueICode}
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
          title="Пол"
          size={"min"}
          list={sexList}
          isShowLabel={false}
          value={valueSex}
          setFilter={setValueSex}
          onChange={(e) => setValueSex(e.target.value)}
        />
        <Dropdown
          title="Образовательная программа"
          size={"min"}
          isShowLabel={false}
          list={programList}
          value={valueProgram}
          setFilter={setValueProgram}
          onChange={(e) => setValueProgram(e.target.value)}
        />
        <DropdownMulti
          title="Факультет"
          size={"min-multi"}
          list={facultyList}
          setFilter={setValueFaculty}
          value={valueFaculty}
          onChange={(e) => setValueFaculty(e.target.value)}
        />
        <Dropdown
          title="Форма обучения"
          size={"min"}
          list={formList}
          isShowLabel={false}
          setFilter={setValueForm}
          value={valueForm}
          onChange={(e) => setValueForm(e.target.value)}
        />
        <Dropdown
          title="*План"
          size={"min"}
          list={planList}
          isShowLabel={true}
          setFilter={setValuePlan}
          value={valuePlan}
          onChange={(e) => setValuePlan(e.target.value)}
        />
        <DropdownMulti
          title="Группа"
          size={"max-multi"}
          list={groupList}
          setFilter={setValueGroup}
          value={valueGroup}
          onChange={(e) => setValueGroup(e.target.value)}
        />
        <Dropdown
          title="Наличие льгот"
          size={"min"}
          list={yesNoList}
          isShowLabel={true}
          setFilter={setValuePrivileges}
          value={valuePrivileges}
          onChange={(e) => setValuePrivileges(e.target.value)}
        />
        <Dropdown
          title="Преим. право зачисления"
          size={"min"}
          list={yesNoList}
          isShowLabel={true}
          setFilter={setValuePrimary}
          value={valuePrimary}
          onChange={(e) => setValuePrimary(e.target.value)}
        />
        <Input
          title="Номер документа"
          type="text"
          maxLength={15}
          value={valueDocumentNum}
          onChange={(e) => setValueDocumentNum(e.target.value)}
        />
        <Input
          title="Конкурсный балл"
          type="text"
          maxLength={3}
          value={valueScore}
          onChange={(e) => setValueScore(e.target.value)}
        />
        <Dropdown
          title="**Статус"
          size={"min"}
          list={statusList}
          isShowLabel={true}
          setFilter={setValueStatus}
          value={valueStatus}
          onChange={(e) => setValueStatus(e.target.value)}
        />
        <Input
          title="Дата подачи документов"
          type="date"
          maxLength={15}
          value={valueDateDocument}
          onChange={(e) => setValueDateDocument(e.target.value)}
        />
        <div className="admin-add-note">* можно оставить пустым</div>
        <div className="admin-add-note">
          ** при статусе "Поступил", у студента не может быть больше чем 1
          пункта, в категориях: Факультет, План, Группа.
        </div>
        <button id="admin-add-new" onClick={addPerson}>
          Добавить студента
        </button>
        <button id="admin-add-new">Редактировать данные</button>
      </div>

      <div className="admin-groups">
        <div className="admin-update-btn-cont">
          <button id="admin-update-list" onClick={fetchStudents}>
            Обновить список
          </button>
        </div>
        <div>Кол-во студентов: {studentsData.length}</div>
        {studentsData.length > 0
          ? studentsData.map((data, value) => {
              return (
                <AdminListButton
                  key={value}
                  title={`${value + 1}. ${data.get("name")}`}
                  onEditUser={() => onEditUser(data.id)}
                  onDeleteUser={() => onDeleteUser(data.id)}
                />
              );
            })
          : "Данных нет"}
      </div>
    </div>
  );
}

export default Admin;
