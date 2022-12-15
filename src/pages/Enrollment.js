import React from "react";
import ToggleCategory from "../components/Categories/ToggleCategory";
import ComboBoxCategory from "../components/Categories/DropdownCategory";
import FilterGroups from "../components/Groups/FilterGroups";
import ListButton from "../components/Buttons/ListButton";
import SearchGroups from "../components/Groups/SearchGroups";
import Parse from "parse/dist/parse.min.js";
import students from "../image/undraw_newsletter_re_wrob.svg";
import "./page.css";

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
    { name: "Специальность" },
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
  const [filterProgram, setFilterProgram] = React.useState("Бакалавриат");
  const [filterPlan, setFilterPlan] = React.useState("Контракт");
  const [filterEducation, setFilterEducation] = React.useState("Заочная");
  const [filterGroup, setFilterGroup] = React.useState("");

  const onChange = (event) => setQuery(event.target.value);

  const [groupsList, setGroupsList] = React.useState([
    "«Технология транспортных процессов ОПУТ»",
    "«Эксплуатация транспортно-технологических машин и комплексов»",
    "«Технология транспортных процессов ОБД",
    "«Менеджмент»",
    "«Бизнес-информатика»",
    "«Техносферная безопасность»",
    "«Наземные транспортно-технологические средства»",
  ]);

  const filterStudents = groups.filter((group) => {
    return group.get("icode").toLowerCase().includes(query.toLowerCase());
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
      .filter((group) => group.get("status") !== "Зачислен")
      .map((value, index) => {
        return (
          <ListButton
            key={index}
            path={`/profile/${value.get("personalID")}`}
            title={`${index + 1}) ${value.get("icode")}, №${value.get(
              "personalID"
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

  return (
    <div className="page">
      <div className="groups space">
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
        <ToggleCategory
          title="Образовательная программа"
          buttonOne="Бакалавриат"
          buttonTwo="Магистратура"
          setFilter={setFilterProgram}
          defaultValue={0}
        />
        {/* <ToggleCategory
          title="План"
          buttonOne="Бюджет"
          buttonTwo="Контракт"
          setFilter={setFilterPlan}
          defaultValue={1}
        /> */}
        <ToggleCategory
          title="Форма обучения"
          buttonOne="Очная"
          buttonTwo="Заочная"
          setFilter={setFilterEducation}
          defaultValue={1}
        />
        <ComboBoxCategory
          title="Специальность"
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
          placeholder="Найти по ИНН"
        />
      </div>
      <div id="groups-search">{component}</div>
    </div>
  );
};
export default Enrollment;
