import React from "react";
import ToggleCategory from "../components/Categories/ToggleCategory";
import ComboBoxCategory from "../components/Categories/DropdownCategory";
import FilterGroups from "../components/Groups/FilterGroups";
import ListButton from "../components/Buttons/ListButton";
import SearchGroups from "../components/Groups/SearchGroups";
import Parse from "parse/dist/parse.min.js";
import students from "../image/undraw_newsletter_re_wrob.svg";
import "./page.css";
import LoaderData from "../components/Loaders/LoaderData";

const Enrollment = () => {
  const [headers, setHeaders] = React.useState([
    { name: "№ п/п" },
    { name: "№ личного дела" },
    { name: "ФИО" },
    { name: "Серия документа" },
    { name: "Конкурсный балл" },
    { name: "Наличие льгот" },
    { name: "Преимущественное право зачисления" },
  ]);
  const [headersSearch, setHeadersSearch] = React.useState([
    { name: "Направление подготовки / специальность" },
    { name: "ФИО" },
    { name: "Факультет" },
    { name: "Образовательная программа" },
    { name: "План" },
    { name: "Форма обучения" },
  ]);
  const [groups, setGroups] = React.useState([]);
  const [query, setQuery] = React.useState("");

  // Filters
  const [filterEnable, setFilterEnable] = React.useState("Категории");
  const [filterFaculty, setFilterFaculty] = React.useState("ТиИТ");
  const [filterProgram, setFilterProgram] = React.useState("");
  const [filterPlan, setFilterPlan] = React.useState("Контракт");
  const [filterEducation, setFilterEducation] = React.useState("");
  const [filterGroup, setFilterGroup] = React.useState("");

  const onChange = (event) => setQuery(event.target.value);

  const [groupsList, setGroupsList] = React.useState([
    "38.03.05 «Бизнес-информатика»",
    "23.03.01 «Технология транспортных процессов ОПУТ / ОБД»",
    "20.04.01 «Техносферная безопасность» (Маг)",
    "23.03.03 «Эксплуатация транспортно-технологических машин и комплексов»",
    "23.05.01 «Наземные транспортно-технологические средства» (Маг)",
    "20.03.01 «Техносферная безопасность»",
    "38.04.02 «Менеджмент» (Маг)",
    "38.03.02 «Менеджмент»",
  ]);

  const [formList, setFormList] = React.useState([
    "Очная",
    "Заочная",
    "Очная ССО",
    "Заочная ССО",
  ]);

  const [programList, setProgramList] = React.useState([
    "Бакалавриат",
    "Магистратура",
    "Специалитет",
  ]);

  const filterStudents = groups.filter((group) => {
    return group.get("personalID").toLowerCase().includes(query.toLowerCase());
  });

  const checkCategories = (group) => {
    if (filterGroup !== "" && group.get("category").indexOf(filterGroup)) {
      return (
        group.get("faculty").indexOf(filterFaculty) !== -1 &&
        group.get("program").indexOf(filterProgram) !== -1 &&
        // group.get("plan").indexOf(filterPlan) !== -1 &&
        group.get("formEducation").indexOf(filterEducation) !== -1 &&
        group.get("category").indexOf(filterGroup) !== -1
      );
    }

    return (
      group.get("faculty").indexOf(filterFaculty) !== -1 &&
      group.get("program").indexOf(filterProgram) !== -1 &&
      // group.get("plan").indexOf(filterPlan) !== -1 &&
      group.get("formEducation").indexOf(filterEducation) !== -1
    );
  };

  const categoryStudents = groups.filter((group) => {
    return group.get("status") !== "Зачислен" ? checkCategories(group) : "";
  });

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

  let component;
  if (!query.trim() && filterEnable === "Все") {
    component = groups
      .sort((a, b) => b.get("score") - a.get("score"))
      .filter((group) => group.get("status") !== "Зачислен")
      .map((value, index) => {
        return (
          <ListButton
            key={index}
            path={`/profile/${value.get("personalID")}`}
            title={`${index + 1}) №${value.get("personalID")}, ${value.get(
              "icode"
            )}`}
          />
        );
      });
  } else if (!query.trim() && filterEnable === "Категории") {
    component = (
      <FilterGroups filter={categoryStudents} myGroup={filterGroup} />
    );
  } else if (query.trim()) {
    component = (
      <SearchGroups filter={filterStudents} groups={groups} query={query} />
    );
  }

  console.log(component === null);
  console.log(component === undefined);

  return (
    <div className="page">
      <div className="groups pHorizontal space">
        <div className="img-row">
          <h1 className="undraw-title">Конкурс</h1>
          <img
            className="undraw-img"
            src={students}
            style={{ objectPosition: "top" }}
            alt="..."
            width={380}
            height={150}
          />
        </div>
      </div>
      <ToggleCategory
        title="Список"
        buttonOne="Все"
        buttonTwo="Категории"
        setFilter={setFilterEnable}
        defaultValue={1}
      />

      <div
        style={{
          display: filterEnable === "Категории" ? "block" : "none",
        }}
      >
        <div className="category-title">Категории</div>
        <ToggleCategory
          title="Факультет"
          buttonOne="ДТ"
          buttonTwo="ТиИТ"
          setFilter={setFilterFaculty}
          defaultValue={1}
        />
        <ComboBoxCategory
          title="Образовательная программа"
          groupList={programList}
          setFilter={setFilterProgram}
        />
        {/* <ToggleCategory
          title="План"
          buttonOne="Бюджет"
          buttonTwo="Контракт"
          setFilter={setFilterPlan}
          defaultValue={1}
        /> */}
        <ComboBoxCategory
          title="Форма обучения"
          groupList={formList}
          setFilter={setFilterEducation}
        />
        <ComboBoxCategory
          title="Направление подготовки / специальность"
          groupList={groupsList}
          setFilter={setFilterGroup}
        />
      </div>

      <div id="search-wrapper">
        <i className="fas fa-search"></i>
        <input
          maxLength="30"
          onChange={onChange}
          value={query}
          type="search"
          id="search-student"
          autoComplete="false"
          placeholder="Найти по № личного дела"
        />
      </div>
      <div className="groups-search">
        {component !== null && component !== undefined && groups.length > 0 ? (
          component
        ) : (
          <LoaderData />
        )}
      </div>
    </div>
  );
};
export default Enrollment;
