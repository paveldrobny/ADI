import React, { useEffect, useState } from "react";
import Parse from "parse/dist/parse.min.js";
import data from "../data/studentsData";
import Input from "../components/Inputs/Input";
import ToogleCategory from "../components/Categories/ToggleCategory";
import Dropdown from "../components/Inputs/Dropdown";
import DropdownMulti from "../components/Inputs/DropdownMulti";
import AdminListButton from "../components/Buttons/AdminListButton";
import InputDefault from "../components/Inputs/InputDefault";
import GroupSize from "../components/Blocks/GroupSize";

function Admin() {
  const [studentsData, setStudentsData] = useState([]);
  const [groupSizeData, setGroupSizeData] = useState([]);
  const [currentGroupSizeID, setCurrentGroupSize] = useState(0);
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
  const [primaryList, setPrimaryList] = useState([
    "Нет",
    "а) дети-сироты и дети, оставшиеся без попечения родителей, а также лица из числа детей-сирот и детей, оставшихся без попечения родителей;",
    "б) дети-инвалиды; инвалиды I и II групп;",
    "в) дети военнослужащих и ополченцев, погибших при исполнении ими обязанностей военной службы или умерших вследствие увечья (ранения, травмы, контузии) либо заболевания, полученных ими при исполнении обязанностей военной службы;",
    "д) инвалиды и участники боевых действий;",
    "е) дети погибших шахтеров;",
    "ж) шахтеры, имеющие непрерывный стаж подземной работы не менее трех лет;",
    "з) лица до 21 года на протяжении трех лет после получения общего среднего образования, родители или один из родителей которых (шахтеры) имеют стаж подземной работы не менее 15 лет или погибли (погиб) в результате несчастного случая на производстве; либо стали (стал) инвалидами I  или II группы вследствие производственных травм или профессиональных заболеваний",
  ]);

  useEffect(() => {
    fetchStudents();
    fetchGroupSize();
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
        `Удалить студента?\n № ${person.get("personalID")},\n ИНН: ${person.get(
          "icode"
        )},\n ${person.get("category")},\n ${person.get("name")}`
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
    if (isEmpty() && isGroupFreeSize()) {
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
    } else if (!isGroupFreeSize()) {
      alert(`В ${valueGroup} все места заполнены`);
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

  async function addGroupSize(id) {
    if (currentGroupSizeID > 0) {
      let groupSize = new Parse.Object("GroupSize");
      groupSize.set("objectId", id);
      groupSize.set("size", Number(currentGroupSizeID));

      try {
        await groupSize.save();
        fetchGroupSize();
        alert(`Теперь в ${groupSize.get("groupName")} кол-во мест: ${currentGroupSizeID} шт.`);
        return true;
      } catch (error) {
        alert(`ОШИБКА! ${error.message}`);
        return false;
      }
    }
  }

  async function fetchGroupSize() {
    const query = new Parse.Query("GroupSize");

    try {
      let data = await query.find();
      setGroupSizeData(data);
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  function getStudentsInGroup(groupName) {
    const studentInGroupCount = studentsData
      .filter((data) => data.get("category") === groupName)
      .map((data) => {
        return data.get("category");
      });

    return studentInGroupCount.length;
  }

  function isGroupFreeSize() {
    const studentInGroupCount = studentsData
      .filter((data) => data.get("category") === valueGroup)
      .map((data) => {
        return data.get("category");
      });

    const groupSizeCount = groupSizeData
      .filter((data) => data.get("groupName") === valueGroup)
      .map((data) => {
        return data.get("size");
      });

    return studentInGroupCount.length < groupSizeCount;
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
        <h3 className="admin-groups-title">Указать кол-во мест</h3>
        <div className="admin-update-btn-cont left">
          <input
            className="admin-group-size-input"
            type={"number"}
            max={50}
            min={1}
            placeholder={"Кол-во мест..."}
            onChange={(e) => setCurrentGroupSize(e.target.value)}
          />
          {/* <div>{currentGroupSizeID}</div> */}
          {/* <button id="admin-update-list" onClick={fetchGroupSize}>
            Обновить
          </button> */}
        </div>

        {groupSizeData.map((list) => {
          return (
            <GroupSize
              key={list.get("groupName")}
              title={list.get("groupName")}
              currentSize={getStudentsInGroup(list.get("groupName"))}
              size={list.get("size")}
              setCurrentGroupSize={setCurrentGroupSize}
              onClick={() => addGroupSize(list.id)}
            />
          );
        })}
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
          size={"max"}
          list={primaryList}
          isShowLabel={false}
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
        <div style={{ width: "100%", textAlign: "center" }}>
          <button id="admin-add-new" onClick={addPerson}>
            Добавить студента
          </button>
          <button id="admin-add-new" onClick={onEditConfirm}>
            Редактировать данные
          </button>
        </div>
      </div>

      <div className="admin-groups">
        <div className="admin-update-btn-cont">
          <button id="admin-update-list" onClick={fetchStudents}>
            Обновить
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
                  status={data.get("status") === "Зачислен"}
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
