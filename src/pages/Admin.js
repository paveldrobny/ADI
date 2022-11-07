import React, { useEffect, useState } from "react";
import Parse from "parse/dist/parse.min.js";
import data from "../data/studentsData";
import Input from "../components/Inputs/Input";
import ToogleCategory from "../components/Categories/ToggleCategory";
import Dropdown from "../components/Inputs/Dropdown";
import DropdownMulti from "../components/Inputs/DropdownMulti";
import AdminListButton from "../components/Buttons/AdminListButton";
import InputDefault from "../components/Inputs/InputDefault";

function Admin() {
  const [studentsData, setStudentsData] = useState([]);
  const [currentEditID, setCurrentEditID] = useState("");
  const [valueDataID, setValueDataID] = useState("");
  const [valueICode, setValueICode] = useState("");
  const [valueName, setValueName] = useState("");
  const [valueSex, setValueSex] = useState("");
  const [valueProgram, setValueProgram] = useState("");
  const [valueFaculty, setValueFaculty] = useState("");
  const [valueForm, setValueForm] = useState("");
  const [valuePlan, setValuePlan] = useState("");
  const [valueGroup, setValueGroup] = useState("");
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

  const [statusList, setStatusList] = useState(["Конкурс", "Зачислен"]);

  const [yesNoList, setYesNoList] = useState(["Да", "Нет"]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const clearInputData = () => {
    setValueDataID("");
    setValueICode("");
    setValueName("");
    setValueFaculty("");
    setValuePlan("");
    setValueGroup("");
    setValuePrivileges("");
    setValuePrimary("");
    setValueDocumentNum("");
    setValueScore("");
    setValueStatus("");
  };

  const onEditConfirm = async function () {
    if (currentEditID !== "") {
      let person = new Parse.Object("Person");
      person.set("objectId", currentEditID);

      if (
        window.confirm(
          `Применить текущие данные для \nИНН: ${person.get(
            "icode"
          )},\n${person.get("name")}`
        )
      ) {
        person.set("personalID", valueDataID);
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
          clearInputData();
          setCurrentEditID("");
          alert("Данные были изменены, обновите список");
          return true;
        } catch (error) {
          alert(`Ошибка! ${error.message}`);
          return false;
        }
      }
    }
  };

  const onEditUser = async function (id) {
    let person = new Parse.Object("Person");
    person.set("objectId", id);
    setCurrentEditID(id);
    if (
      window.confirm(
        `Редактировать студента?\n № ${person.get(
          "personalID"
        )}, \n ИНН: ${person.get("icode")},\n ${person.get(
          "category"
        )}, \n ${person.get("name")}`
      )
    ) {
      setValueDataID(person.get("personalID"));
      setValueICode(person.get("icode"));
      setValueName(person.get("name"));
      setValueSex(person.get("sex"));
      setValueProgram(person.get("program"));
      setValueFaculty(person.get("faculty"));
      setValueForm(person.get("formEducation"));
      setValuePlan(person.get("plan"));
      setValueGroup(person.get("category"));
      setValuePrivileges(person.get("privileges"));
      setValuePrimary(person.get("primary"));
      setValueDocumentNum(person.get("documentsSeries"));
      setValueScore(person.get("score"));
      setValueStatus(person.get("status"));
      setValueDateDocument(person.get("documentsDate"));
      // clearInputData();
    }
  };

  const onDeleteUser = async function (id) {
    let person = new Parse.Object("Person");
    person.set("objectId", id);

    if (
      window.confirm(
        `Удалить студента?\n № ${person.get(
          "personalID"
        )},\n ИНН: ${person.get("icode")},\n ${person.get("category")},\n ${person.get("name")}`
      )
    ) {
      try {
        await person.destroy();
        clearInputData();
        alert("Студент удален, обновите список");
        return true;
      } catch (error) {
        alert(`Ошибка! ${error.message}`);
        return false;
      }
    }
  };

  const isEmpty = () => {
    return (
      valueDataID !== "" &&
      valueICode !== "" &&
      valueName !== "" &&
      valueSex !== "" &&
      valueProgram !== "" &&
      valuePlan !== "" &&
      valueFaculty !== "" &&
      valueForm !== "" &&
      valueGroup !== "" &&
      valuePrivileges !== "" &&
      valuePrimary !== "" &&
      valueDocumentNum !== "" &&
      valueScore !== "" &&
      valueStatus !== "" &&
      valueDateDocument !== ""
    );
  };

  async function addPerson() {
    let person = new Parse.Object("Person");
    if (isEmpty()) {
      person.set("personalID", valueDataID);
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
        clearInputData();
        alert("Студент добавлен, обновите список");
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

      <div className="admin-groups">
        <h3 className="admin-groups-title">Добавить / редактировать данные</h3>
        <Input
          title="№ личного дела"
          type="text"
          maxLength={9}
          value={valueDataID}
          onChange={(e) => setValueDataID(e.target.value)}
        />
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
        <Dropdown
          title="Факультет"
          size={"min"}
          list={facultyList}
          setFilter={setValueFaculty}
          value={valueFaculty}
          onChange={(e) => setValueFaculty(e.target.value)}
        />
        <Dropdown
          title="Форма обучения"
          size={"min"}
          list={formList}
          isShowLabel={true}
          setFilter={setValueForm}
          value={valueForm}
          onChange={(e) => setValueForm(e.target.value)}
        />
        <Dropdown
          title="План"
          size={"min"}
          list={planList}
          isShowLabel={true}
          setFilter={setValuePlan}
          value={valuePlan}
          onChange={(e) => setValuePlan(e.target.value)}
        />
        <Dropdown
          title="Специальность"
          size={"max"}
          list={groupList}
          isShowLabel={true}
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
          title="Статус"
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
        <button id="admin-add-new" onClick={addPerson}>
          Добавить студента
        </button>
        <button id="admin-add-new" onClick={onEditConfirm}>
          Редактировать данные
        </button>
      </div>

      <div className="admin-groups">
        <div className="admin-update-btn-cont">
          <button id="admin-update-list" onClick={fetchStudents}>
            Обновить список
          </button>
        </div>
        <div id="admin-list-count">Кол-во студентов: {studentsData.length}</div>
        {studentsData !== null &&
        studentsData !== undefined &&
        studentsData.length > 0
          ? studentsData.map((data, value) => {
              return (
                <AdminListButton
                  key={value}
                  title={`${value + 1}. ${data.get("icode")}, №${data.get(
                    "personalID"
                  )}, ${data.get("category")}`}
                  onEditUser={() => onEditUser(data.id)}
                  onDeleteUser={() => onDeleteUser(data.id)}
                />
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default Admin;
