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

  // values
  const [valueDateDocument, setValueDateDocument] = useState("");
  const [valueDataID, setValueDataID] = useState("");
  const [valueName, setValueName] = useState("");
  const [valueAdress, setValueAdress] = useState("");
  const [valueBirthday, setValueBirthday] = useState("");
  const [valueICode, setValueICode] = useState("");
  const [valueIdentityDocument, setValueIdentityDocument] = useState("");
  const [valuePreviouslyEducation, setValuePreviouslyEducation] = useState("");
  const [valueAverageScoreCertificate, setValueAverageScoreCertificate] =
    useState(0);
  const [valueScoreRussian, setValueScoreRussian] = useState(0);
  const [valueScoreMath, setValueScoreMath] = useState(0);
  const [valueProfileSubject, setValueProfileSubject] = useState("");
  const [valueScoreProfileSubject, setValueScoreProfileSubject] = useState(0);
  const [valueAverageScoreDegree, setValueAverageScoreDegree] = useState(0);
  const [valueScoreGIA, setValueScoreGIA] = useState(0);
  const [valueScoreForeign, setValueScoreForeign] = useState(0);
  const [valueAverageScoreMiddle, setValueAverageScoreMiddle] = useState(0);
  const [valueExtraScore, setValueExtraScore] = useState(0);
  const [valueScore, setValueScore] = useState(0);
  const [valueFaculty, setValueFaculty] = useState("");
  const [valueForm, setValueForm] = useState("");
  const [valueGroup, setValueGroup] = useState("");
  const [valueProgram, setValueProgram] = useState("");
  const [valuePlan, setValuePlan] = useState("");
  const [valuePrivileges, setValuePrivileges] = useState("");
  const [valuePrimary, setValuePrimary] = useState("");
  const [valueForeignLang, setValueForeignLang] = useState("");
  const [valuePhone, setValuePhone] = useState("");
  const [valueParent, setValueParent] = useState("");
  const [valueStatus, setValueStatus] = useState("");

  // List
  const [programList, setProgramList] = useState([
    "Бакалавриат",
    "Магистратура",
    "Специалитет",
  ]);
  const [facultyList, setFacultyList] = useState(["ДТ", "ТиИТ"]);
  const [formList, setFormList] = useState(["Очная", "Заочная"]);
  const [planList, setPlanList] = useState(["Бюджет", "Контракт"]);
  const [groupList, setGroupList] = useState([
    "23.03.01 «Технология транспортных процессов ОПУТ»",
    "23.03.03 «Эксплуатация транспортно-технологических машин и комплексов»",
    "23.03.01 «Технология транспортных процессов ОБД",
    "38.03.02 «Менеджмент»",
    "38.03.05 «Бизнес-информатика»",
    "20.03.01 «Техносферная безопасность»",
    "23.05.01 «Наземные транспортно-технологические средства»",
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
  const [otherLangList, setOtherLangList] = useState([
    "Английский",
    "Французский",
    "Немецкий",
  ]);
  const [profileSubjectList, setProfileSubjectList] = useState([
    "Информатика и ИКТ",
    "Иностранный язык",
    "История",
  ]);

  useEffect(() => {
    fetchStudents();
    fetchGroupSize();
  }, []);

  const clearInputData = () => {
    setValueDateDocument("");
    setValueDataID("");
    setValueName("");
    setValueAdress("");
    setValueBirthday("");
    setValueICode("");
    setValueIdentityDocument("");
    setValuePreviouslyEducation("");
    setValueAverageScoreCertificate(0);
    setValueScoreRussian(0);
    setValueScoreMath(0);
    setValueProfileSubject("");
    setValueScoreProfileSubject(0);
    setValueAverageScoreDegree(0);
    setValueScoreGIA(0);
    setValueScoreForeign(0);
    setValueAverageScoreMiddle(0);
    setValueExtraScore(0);
    setValueScore(0);
    setValueFaculty("");
    setValueForm("");
    setValueGroup("");
    setValueProgram("");
    setValuePlan("");
    setValuePrivileges("");
    setValuePrimary("");
    setValueForeignLang("");
    setValuePhone("");
    setValueParent("");
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
        person.set("documentsDate", valueDateDocument);
        person.set("personalID", valueDataID);
        person.set("name", valueName);
        person.set("adress", valueAdress);
        person.set("birthday", valueBirthday);
        person.set("icode", valueICode);
        person.set("identityDocument", valueIdentityDocument);
        person.set("previouslyEducation", valuePreviouslyEducation);
        person.set("averageScoreCertificate", valueAverageScoreCertificate);
        person.set("scoreRussian", valueScoreRussian);
        person.set("scoreMath", valueScoreMath);
        person.set("profileSubject", valueProfileSubject);
        person.set("scoreProfileSubject", valueScoreProfileSubject);
        person.set("averageScoreDegree", valueAverageScoreDegree);
        person.set("scoreGIA", valueScoreGIA);
        person.set("scoreForeign", valueScoreForeign);
        person.set("averageScoreMiddle", valueAverageScoreMiddle);
        person.set("extraScore", valueExtraScore);
        person.set("score", valueScore);
        person.set("faculty", valueFaculty);
        person.set("formEducation", valueForm);
        person.set("category", valueGroup);
        person.set("program", valueProgram);
        person.set("plan", valuePlan);
        person.set("privileges", valuePrivileges);
        person.set("primary", valuePrimary);
        person.set("foreignLang", valueForeignLang);
        person.set("phone", valuePhone);
        person.set("parent", valueParent);
        person.set("status", valueStatus);

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
      person.set("documentsDate", valueDateDocument);
      person.set("personalID", valueDataID);
      person.set("name", valueName);
      person.set("adress", valueAdress);
      person.set("birthday", valueBirthday);
      person.set("icode", valueICode);
      person.set("identityDocument", valueIdentityDocument);
      person.set("previouslyEducation", valuePreviouslyEducation);
      person.set("averageScoreCertificate", Number(valueAverageScoreCertificate));
      person.set("scoreRussian", Number(valueScoreRussian));
      person.set("scoreMath", Number(valueScoreMath));
      person.set("profileSubject", valueProfileSubject);
      person.set("scoreProfileSubject", Number(valueScoreProfileSubject));
      person.set("averageScoreDegree", Number(valueAverageScoreDegree));
      person.set("scoreGIA", Number(valueScoreGIA));
      person.set("scoreForeign", Number(valueScoreForeign));
      person.set("averageScoreMiddle", Number(valueAverageScoreMiddle));
      person.set("extraScore", Number(valueExtraScore));
      person.set("score", Number(valueScore));
      person.set("faculty", valueFaculty);
      person.set("formEducation", valueForm);
      person.set("category", valueGroup);
      person.set("program", valueProgram);
      person.set("plan", valuePlan);
      person.set("privileges", valuePrivileges);
      person.set("primary", valuePrimary);
      person.set("foreignLang", valueForeignLang);
      person.set("phone", valuePhone);
      person.set("parent", valueParent);
      person.set("status", valueStatus);
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
      valueDateDocument !== "" &&
      valueDataID !== "" &&
      valueName !== "" &&
      valueAdress !== "" &&
      valueBirthday !== "" &&
      valueICode !== "" &&
      valueIdentityDocument !== "" &&
      valuePreviouslyEducation !== "" &&
      valueFaculty !== "" &&
      valueGroup !== "" &&
      valueProgram !== "" &&
      valuePlan !== "" &&
      valueForeignLang !== "" &&
      valuePhone !== "" &&
      valueStatus !== ""
    );
  };

  async function addPerson() {
    let person = new Parse.Object("Person");
    if (isEmpty() && isGroupFreeSize()) {
      person.set("documentsDate", valueDateDocument);
      person.set("personalID", valueDataID);
      person.set("name", valueName);
      person.set("adress", valueAdress);
      person.set("birthday", valueBirthday);
      person.set("icode", valueICode);
      person.set("identityDocument", valueIdentityDocument);
      person.set("previouslyEducation", valuePreviouslyEducation);
      person.set("averageScoreCertificate", Number(valueAverageScoreCertificate));
      person.set("scoreRussian", Number(valueScoreRussian));
      person.set("scoreMath", Number(valueScoreMath));
      person.set("profileSubject", valueProfileSubject);
      person.set("scoreProfileSubject", Number(valueScoreProfileSubject));
      person.set("averageScoreDegree", Number(valueAverageScoreDegree));
      person.set("scoreGIA", Number(valueScoreGIA));
      person.set("scoreForeign", Number(valueScoreForeign));
      person.set("averageScoreMiddle", Number(valueAverageScoreMiddle));
      person.set("extraScore", Number(valueExtraScore));
      person.set("score", Number(valueScore));
      person.set("faculty", valueFaculty);
      person.set("formEducation", valueForm);
      person.set("category", valueGroup);
      person.set("program", valueProgram);
      person.set("plan", valuePlan);
      person.set("privileges", valuePrivileges);
      person.set("primary", valuePrimary);
      person.set("foreignLang", valueForeignLang);
      person.set("phone", valuePhone);
      person.set("parent", valueParent);
      person.set("status", valueStatus);

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
      alert(
        "Должны быть заполнены поля:\n-Дата подачи документов\n-№ личного дела\n-ФИО\n-Адрес проживания\n-Дата рождения\n-ИНН\n-Данные документа удостоверяющего личность\n-Данные документа о ранее полученном образовании\n-Факультет\n-Форма обучения\n-Специальность\n-Образовательная программа\n-План\n-Инностранный язык, который изучался\n-Телефон для связи\n-Статус"
      );
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
        alert(
          `Теперь в ${groupSize.get(
            "groupName"
          )} кол-во мест: ${currentGroupSizeID} шт.`
        );
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
    <div className="page max">
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

      <div className="admin-groups left">
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
          title="Дата подачи документов"
          type="date"
          maxLength={15}
          value={valueDateDocument}
          onChange={(e) => setValueDateDocument(e.target.value)}
        />
        <Input
          title="№ личного дела"
          type="text"
          maxLength={9}
          value={valueDataID}
          onChange={(e) => setValueDataID(e.target.value)}
        />
        <Input
          title="ФИО"
          type="text"
          maxLength={64}
          value={valueName}
          onChange={(e) => setValueName(e.target.value)}
        />
        <Input
          title="Адрес проживания"
          type="text"
          maxLength={200}
          value={valueAdress}
          onChange={(e) => setValueAdress(e.target.value)}
        />
        <Input
          title="Дата рождения"
          type="date"
          maxLength={15}
          value={valueBirthday}
          onChange={(e) => setValueBirthday(e.target.value)}
        />
        <Input
          title="ИНН"
          type="text"
          maxLength={12}
          value={valueICode}
          onChange={(e) => setValueICode(e.target.value)}
        />
        <Input
          title="Данные документа удостоверяющего личность"
          type="text"
          maxLength={220}
          value={valueIdentityDocument}
          onChange={(e) => setValueIdentityDocument(e.target.value)}
        />
        <Input
          title="Данные документа о ранее полученном образовании"
          type="text"
          maxLength={220}
          value={valuePreviouslyEducation}
          onChange={(e) => setValuePreviouslyEducation(e.target.value)}
        />
        <Input
          title="Средний балл аттестата"
          type="number"
          value={valueAverageScoreCertificate}
          onChange={(e) => setValueAverageScoreCertificate(e.target.value)}
        />
        <Input
          title="Балл по русскому языку"
          type="number"
          value={valueScoreRussian}
          onChange={(e) => setValueScoreRussian(e.target.value)}
        />
        <Input
          title="Балл по математике"
          type="number"
          value={valueScoreMath}
          onChange={(e) => setValueScoreMath(e.target.value)}
        />
        <Dropdown
          title="Профильный предмет"
          size={"min"}
          list={profileSubjectList}
          isShowLabel={true}
          setFilter={setValueProfileSubject}
          value={valueProfileSubject}
          onChange={(e) => setValueProfileSubject(e.target.value)}
        />
        <Input
          title="Балл по проф предмету"
          type="number"
          value={valueScoreProfileSubject}
          onChange={(e) => setValueScoreProfileSubject(e.target.value)}
        />
        <Input
          title="Средний балл диплома бакалавра / специалиста"
          type="number"
          value={valueAverageScoreDegree}
          onChange={(e) => setValueAverageScoreDegree(e.target.value)}
        />
        <Input
          title="Балл по ГИА"
          type="number"
          value={valueScoreGIA}
          onChange={(e) => setValueScoreGIA(e.target.value)}
        />
        <Input
          title="Балл по иностранному"
          type="number"
          value={valueScoreForeign}
          onChange={(e) => setValueScoreForeign(e.target.value)}
        />
        <Input
          title="Средний балл диплома специалиста среднего звена"
          type="number"
          value={valueAverageScoreMiddle}
          onChange={(e) => setValueAverageScoreMiddle(e.target.value)}
        />
        <Input
          title="Дополнительный балл/ причины начисления"
          type="number"
          value={valueExtraScore}
          onChange={(e) => setValueExtraScore(e.target.value)}
        />
        <Input
          title="Конкурсный балл"
          type="number"
          value={valueScore}
          onChange={(e) => setValueScore(e.target.value)}
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
          title="Специальность"
          size={"max"}
          list={groupList}
          isShowLabel={true}
          setFilter={setValueGroup}
          value={valueGroup}
          onChange={(e) => setValueGroup(e.target.value)}
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
          title="План"
          size={"min"}
          list={planList}
          isShowLabel={true}
          setFilter={setValuePlan}
          value={valuePlan}
          onChange={(e) => setValuePlan(e.target.value)}
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
        <Dropdown
          title="Иностранный язык, который изучался"
          size={"min"}
          list={otherLangList}
          isShowLabel={false}
          setFilter={setValueForeignLang}
          value={valueForeignLang}
          onChange={(e) => setValueForeignLang(e.target.value)}
        />
        <Input
          title="Телефоны для связи"
          type="text"
          maxLength={20}
          value={valuePhone}
          onChange={(e) => setValuePhone(e.target.value)}
        />
        <Input
          title="Сведения о родителях"
          type="text"
          maxLength={120}
          value={valueParent}
          onChange={(e) => setValueParent(e.target.value)}
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
                  )}`}
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
