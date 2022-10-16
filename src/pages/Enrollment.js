import React from "react";
import GroupCategory from "../components/Categories";
import ListCategory from "../components/Categories/ListCategory";
import GroupsCategory from "../components/Groups/GroupsCategory";
import GroupsDefault from "../components/Groups/GroupsDefault";
import GroupsSearch from "../components/Groups/GroupsSearch";
import data from "../studentsData";
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

  const unique = (array) => {
    return array.filter((item, index) => {
      return array.indexOf(item) === index;
    });
  };
  const onChange = (event) => setQuery(event.target.value);

  const categories = unique(groups.map((group) => group.category));

  const [groupsList, setGroupsList] = React.useState(categories);

  const filterStudents = groups.filter((group) => {
    return group.name.toLowerCase().includes(query.toLowerCase());
  });

  const checkCategories = (group) => {
    if (filterGroup !== "") {
      return (
        group.faculty === filterFaculty &&
        group.program === filterProgram &&
        group.plan === filterPlan &&
        group.formEducation === filterEducation &&
        group.category === filterGroup
      );
    }
    return (
      group.faculty === filterFaculty &&
      group.program === filterProgram &&
      group.plan === filterPlan &&
      group.formEducation === filterEducation
    );
  };

  const categoryStudents = groups.filter((group) => {
    return checkCategories(group);
  });

  let component;
  if (!query.trim() && filterEnable === "Все") {
    component = categories.map((value, index) => {
      return <GroupsDefault key={index} value={value} groups={groups} />;
    });
  } else if (!query.trim() && filterEnable === "Категории") {
    component = (
      <GroupsCategory filter={categoryStudents} myGroup={filterGroup} />
    );
  } else if (query.trim()) {
    component = (
      <GroupsSearch filter={filterStudents} groups={groups} query={query} />
    );
  }

  return (
    <div className="page">
      <GroupCategory
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
        <GroupCategory
          title="Факультет"
          buttonOne="ДТ"
          buttonTwo="ТиИТ"
          setFilter={setFilterFaculty}
        />
        <GroupCategory
          title="Образовательная программа"
          buttonOne="Бакалавриат"
          buttonTwo="Магистратура"
          setFilter={setFilterProgram}
        />
        <GroupCategory
          title="План"
          buttonOne="Бюджет"
          buttonTwo="Контракт"
          setFilter={setFilterPlan}
        />
        <GroupCategory
          title="Форма обучения"
          buttonOne="Очная"
          buttonTwo="Заочная"
          setFilter={setFilterEducation}
        />
        <ListCategory
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
