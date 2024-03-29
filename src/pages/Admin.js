import React, { useEffect, useState } from "react";
import Parse from "parse/dist/parse.min.js";
import { initializeParse, useParseQuery } from "@parse/react";
import data from "../data/studentsData";
import Input from "../components/Inputs/Input";
import ToogleCategory from "../components/Categories/ToggleCategory";
import Dropdown from "../components/Inputs/Dropdown";
import DropdownMulti from "../components/Inputs/DropdownMulti";
import AdminListButton from "../components/Buttons/AdminListButton";
import InputDefault from "../components/Inputs/InputDefault";
import GroupSize from "../components/Blocks/GroupSize";
import SelectedButton from "../components/Buttons/SelectedButton";
import LoaderData from "../components/Loaders/LoaderData";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
  const [valueExtra, setValueExtra] = useState("");
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
  const [formList, setFormList] = useState([
    "Очная",
    "Заочная",
    "Очная ССО",
    "Заочная ССО",
  ]);
  const [planList, setPlanList] = useState(["Бюджет", "Контракт"]);
  const [groupList, setGroupList] = useState([
    "38.03.05 «Бизнес-информатика»",
    "23.03.01 «Технология транспортных процессов ОПУТ / ОБД»",
    "20.04.01 «Техносферная безопасность» (Маг)",
    "23.03.03 «Эксплуатация транспортно-технологических машин и комплексов»",
    "23.05.01 «Наземные транспортно-технологические средства» (Маг)",
    "20.03.01 «Техносферная безопасность»",
    "38.04.02 «Менеджмент» (Маг)",
    "38.03.02 «Менеджмент»",
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
  const [extraList, setExtraList] = useState([
    "Нет",
    "а) наличие золотого, серебряного или бронзового знака отличия Государственного физкультурно-спортивного комплекса «Готов к труду и обороне Донецкой Народной Республики» – 2 балла",
    "б) наличие полученных в образовательных организациях Донецкой Народной Республики документов об образовании или об образовании и о квалификации с отличием – 5 баллов",
    "в) наличие Золотой медали «За особые успехи в учении» – 7 баллов",
    "г) наличие Серебряной медали «За особые успехи в учении» – 5 баллов",
    "д) волонтерская (добровольческая) деятельность - 2 балла",
  ]);

  const getIndividualScore = (data) => {
    let extraScore;

    switch (data.get("extra")) {
      case extraList[0]:
        extraScore = 0;
        break;
      case extraList[1]:
        extraScore = 2;
        break;
      case extraList[2]:
        extraScore = 5;
        break;
      case extraList[3]:
        extraScore = 7;
        break;
      case extraList[4]:
        extraScore = 6;
        break;
      case extraList[5]:
        extraScore = 2;
        break;
      default:
        extraScore = 0;
    }

    return extraScore;
  };

  const getTotalScore = (data) => {
    return (
      data.get("scoreRussian") +
      data.get("scoreMath") +
      data.get("scoreForeign") +
      data.get("scoreProfileSubject") +
      data.get("scoreGIA") +
      getIndividualScore(data)
    );
  };

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
    setValueExtra("");
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
        person.set(
          "averageScoreCertificate",
          Number(valueAverageScoreCertificate)
        );
        person.set("scoreRussian", Number(valueScoreRussian));
        person.set("scoreMath", Number(valueScoreMath));
        person.set("profileSubject", valueProfileSubject);
        person.set("scoreProfileSubject", Number(valueScoreProfileSubject));
        person.set("averageScoreDegree", Number(valueAverageScoreDegree));
        person.set("scoreGIA", Number(valueScoreGIA));
        person.set("scoreForeign", Number(valueScoreForeign));
        person.set("averageScoreMiddle", Number(valueAverageScoreMiddle));
        person.set("extra", valueExtra);
        person.set("score", getTotalScore(person));
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
      setValueDateDocument(person.get("documentsDate"));
      setValueDataID(person.get("personalID"));
      setValueName(person.get("name"));
      setValueAdress(person.get("adress"));
      setValueBirthday(person.get("birthday"));
      setValueICode(person.get("icode"));
      setValueIdentityDocument(person.get("identityDocument"));
      setValuePreviouslyEducation(person.get("previouslyEducation"));
      setValueAverageScoreCertificate(person.get("averageScoreCertificate"));
      setValueScoreRussian(person.get("scoreRussian"));
      setValueScoreMath(person.get("scoreMath"));
      setValueProfileSubject(person.get("profileSubject"));
      setValueScoreProfileSubject(person.get("scoreProfileSubject"));
      setValueAverageScoreDegree(person.get("averageScoreDegree"));
      setValueScoreGIA(person.get("scoreGIA"));
      setValueScoreForeign(person.get("scoreForeign"));
      setValueAverageScoreMiddle(person.get("averageScoreMiddle"));
      setValueExtra(person.get("extra"));
      setValueScore(person.get("score"));
      setValueFaculty(person.get("faculty"));
      setValueForm(person.get("formEducation"));
      setValueGroup(person.get("category"));
      setValueProgram(person.get("program"));
      setValuePlan(person.get("plan"));
      setValuePrivileges(person.get("privileges"));
      setValuePrimary(person.get("primary"));
      setValueForeignLang(person.get("foreignLang"));
      setValuePhone(person.get("phone"));
      setValueParent(person.get("parent"));
      setValueStatus(person.get("status"));
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
      valueExtra !== "" &&
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
      person.set(
        "averageScoreCertificate",
        Number(valueAverageScoreCertificate)
      );
      person.set("scoreRussian", Number(valueScoreRussian));
      person.set("scoreMath", Number(valueScoreMath));
      person.set("profileSubject", valueProfileSubject);
      person.set("scoreProfileSubject", Number(valueScoreProfileSubject));
      person.set("averageScoreDegree", Number(valueAverageScoreDegree));
      person.set("scoreGIA", Number(valueScoreGIA));
      person.set("scoreForeign", Number(valueScoreForeign));
      person.set("averageScoreMiddle", Number(valueAverageScoreMiddle));
      person.set("extra", valueExtra);
      person.set("score", getTotalScore(person));
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
        "Должны быть заполнены поля:\n-Дата подачи документов\n-№ личного дела\n-ФИО\n-Адрес проживания\n-Дата рождения\n-ИНН\n-Данные документа удостоверяющего личность\n-Данные документа о ранее полученном образовании\n-Факультет\n-Форма обучения\n-Направление подготовки/специальность\n-Образовательная программа\n-План\n-Инностранный язык, который изучался\n-Телефон для связи\n-Статус"
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

  const unique = (array) => {
    return array.filter((item, index) => {
      return array.indexOf(item) === index;
    });
  };

  const getFacultyCount = (facultyName) => {
    const count = unique(
      studentsData.filter((list) => list.get("faculty") === facultyName)
    );
    return count.length;
  };

  const getFormEducationCount = (formName) => {
    const count = unique(
      studentsData.filter((list) => list.get("formEducation") === formName)
    );
    return count.length;
  };

  const groupNameChart = groupSizeData.map((size) => size.get("groupName"));
  const groupSizeChart = groupSizeData.map((list) =>
    getStudentsInGroup(list.get("groupName"))
  );

  console.log(getFacultyCount("ДТ"));

  const data = {
    labels: groupNameChart,
    datasets: [
      {
        label: "Кол-во студентов",
        data: groupSizeChart,
        backgroundColor: [
          "rgba(255, 102, 102, 1)",
          "rgba(102, 102, 255, 1)",
          "rgba(102, 178, 255, 1)",
          "rgba(102, 255, 178, 1)",
          "rgba(255, 102, 255, 1)",
          "rgba(178, 255, 102, 1)",
          "rgba(255, 102, 178, 1)",
          "rgba(102, 255, 255, 1)",
        ],
        borderColor: [
          "rgba(0,0,0, .2)",
          "rgba(0,0,0, .2)",
          "rgba(0,0,0, .2)",
          "rgba(0,0,0, .2)",
          "rgba(0,0,0, .2)",
          "rgba(0,0,0, .2)",
          "rgba(0,0,0, .2)",
          "rgba(0,0,0, .2)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const dataFaculty = {
    labels: ["ТиИТ", "ДТ"],
    datasets: [
      {
        label: "Кол-во студентов",
        data: [getFacultyCount("ТиИТ"), getFacultyCount("ДТ")],
        backgroundColor: ["rgba(102, 102, 255, 1)", "rgba(255, 102, 102, 1)"],
        borderColor: ["rgba(0,0,0, .2)", "rgba(0,0,0, .2)"],
        borderWidth: 1,
      },
    ],
  };

  const dataTest = {
    labels: ["Заочная", "Очная", "Заочная ССО", "Очная ССО"],
    datasets: [
      {
        label: "Кол-во студентов",
        data: [
          getFormEducationCount("Заочная"),
          getFormEducationCount("Очная"),
          getFormEducationCount("Заочная ССО"),
          getFormEducationCount("Очная ССО"),
        ],
        backgroundColor: [
          "rgba(255, 102, 102, 1)",
          "rgba(102, 102, 255, 1)",
          "rgba(102, 178, 255, 1)",
          "rgba(102, 255, 178, 1)",
        ],
        borderColor: [
          "rgba(0,0,0, .2)",
          "rgba(0,0,0, .2)",
          "rgba(0,0,0, .2)",
          "rgba(0,0,0, .2)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const option = {
    legend: {
      display: false,
    },
  };

  return (
    <div className="page max">
      {/* <div id="admin-secure">
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
      </div> */}

      <div className="panel">
        <h3 className="admin-groups-title">Указать кол-во мест</h3>
        <div className="admin-groups">
          <div className="admin-update-btn-cont left">
            <input
              className="admin-group-size-input"
              type={"number"}
              max={50}
              min={1}
              placeholder={"Кол-во мест..."}
              onChange={(e) => setCurrentGroupSize(e.target.value)}
            />
          </div>
          <div className="separator"></div>

          {groupSizeData !== null &&
          groupSizeData !== undefined &&
          groupSizeData.length > 0 ? (
            groupSizeData.map((list) => {
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
            })
          ) : (
            <LoaderData />
          )}
        </div>

        <h3 className="admin-groups-title">Добавить / редактировать данные</h3>
        <div className="admin-groups">
          <Input
            title="№ личного дела"
            type="text"
            maxLength={9}
            value={valueDataID}
            onChange={(e) => setValueDataID(e.target.value)}
          />
          <Input
            title="Дата подачи документов"
            type="date"
            maxLength={15}
            value={valueDateDocument}
            onChange={(e) => setValueDateDocument(e.target.value)}
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
          <Dropdown
            title="Дополнительный балл/ причины начисления"
            size={"max"}
            list={extraList}
            setFilter={setValueExtra}
            value={valueExtra}
            onChange={(e) => setValueExtra(e.target.value)}
          />
          {/* <Input
          title="Дополнительный балл/ причины начисления"
          type="number"
          value={valueExtraScore}
          onChange={(e) => setValueExtraScore(e.target.value)}
        /> */}
          {/* <Input
          title="Конкурсный балл"
          type="number"
          value={valueScore}
          onChange={(e) => setValueScore(e.target.value)}
        /> */}
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
            title="Направление подготовки / специальность"
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
            <button className="admin-add-new" onClick={addPerson}>
              Добавить личное дело
            </button>
            <button className="admin-add-new" onClick={onEditConfirm}>
              Редактировать
            </button>
          </div>
        </div>

        <h3 className="admin-groups-title">Карточки</h3>
        <div className="admin-groups">
          <div className="admin-update-btn-cont">
            <div id="admin-list-count">
              Кол-во студентов: {studentsData.length}
            </div>
            <button id="admin-update-list" onClick={fetchStudents}>
              Обновить
            </button>
          </div>
          {studentsData !== null &&
          studentsData !== undefined &&
          studentsData.length > 0 ? (
            studentsData.map((data, value) => {
              return (
                <AdminListButton
                  key={value}
                  status={data.get("status") === "Зачислен"}
                  title={`${value + 1}) №${data.get("personalID")}, ${data.get(
                    "icode"
                  )}`}
                  onEditUser={() => onEditUser(data.id)}
                  onDeleteUser={() => onDeleteUser(data.id)}
                />
              );
            })
          ) : (
            <LoaderData />
          )}
        </div>

        <h3 className="admin-groups-title">Статистика</h3>
        <div className="admin-groups">
          <div className="chart-content">
            <div className="chart half">
              <Doughnut options={{ maintainAspectRatio: true }} data={data} />
            </div>
            <div className="chart half">
              <Pie options={{ maintainAspectRatio: true }} data={dataFaculty} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
