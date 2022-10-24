import React from "react";
import ToggleCategory from "../components/Categories/ToggleCategory";
import ComboBoxCategory from "../components/Categories/DropdownCategory";
import FilterGroups from "../components/Groups/FilterGroups";
import ListButton from "../components/Buttons/ListButton";
import SearchGroups from "../components/Groups/SearchGroups";
import data from "../data/studentsData";
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
    { name: "Группа" },
    { name: "ФИО" },
    { name: "Факультет" },
    { name: "Образовательная программа" },
    { name: "План" },
    { name: "Форма обучения" },
  ]);
  const [groups, setGroups] = React.useState(data);

  const [query, setQuery] = React.useState("");

  // Filters
  const [filterEnable, setFilterEnable] = React.useState("Все");
  const [filterFaculty, setFilterFaculty] = React.useState("ДТ");
  const [filterProgram, setFilterProgram] = React.useState("Бакалавриат");
  const [filterPlan, setFilterPlan] = React.useState("Бюджет");
  const [filterEducation, setFilterEducation] = React.useState("Очная");
  const [filterGroup, setFilterGroup] = React.useState("");

  const onChange = (event) => setQuery(event.target.value);

  const [groupsList, setGroupsList] = React.useState([
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

  const filterStudents = groups.filter((group) => {
    return group.name.toLowerCase().includes(query.toLowerCase());
  });

  const checkCategories = (group) => {
    if (filterGroup !== "" && group.category.indexOf(filterGroup)) {
      return group.faculty.indexOf(filterFaculty) === 1
        ? true
        : false &&
            group.program === filterProgram &&
            group.plan === filterPlan &&
            group.formEducation === filterEducation &&
            group.category === filterGroup;
    }
    return group.faculty.indexOf(filterFaculty) === 1
      ? true
      : false &&
          group.program === filterProgram &&
          group.plan === filterPlan &&
          group.formEducation === filterEducation;
  };

  const categoryStudents = groups.filter((group) => {
    return checkCategories(group);
  });

  let component;
  if (!query.trim() && filterEnable === "Все") {
    component = groups
      .filter((group) => group.isReceived !== "Поступил")
      .map((value, index) => {
        return (
          <div key={index} id="group-search">
            <ListButton
              key={index}
              path={`/profile/${value.id}`}
              title={`${index + 1}. ${value.name}`}
            />
          </div>
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
      <ToggleCategory
        title="Список"
        buttonOne="Все"
        buttonTwo="Категории"
        setFilter={setFilterEnable}
      />

      <div
        style={{
          display: filterEnable === "Категории" ? "block" : "none",
        }}
      >
        <div id="category-title">Категории</div>
        <ToggleCategory
          title="Факультет"
          buttonOne="ДТ"
          buttonTwo="ТиИТ"
          setFilter={setFilterFaculty}
        />
        <ToggleCategory
          title="Образовательная программа"
          buttonOne="Бакалавриат"
          buttonTwo="Магистратура"
          setFilter={setFilterProgram}
        />
        <ToggleCategory
          title="План"
          buttonOne="Бюджет"
          buttonTwo="Контракт"
          setFilter={setFilterPlan}
        />
        <ToggleCategory
          title="Форма обучения"
          buttonOne="Очная"
          buttonTwo="Заочная"
          setFilter={setFilterEducation}
        />
        <ComboBoxCategory
          title="Группа"
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
      <div id="groups">{component}</div>
    </div>
  );
};
export default Enrollment;
