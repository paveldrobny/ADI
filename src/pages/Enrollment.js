import React from "react";
import GroupCategory from "../components/GroupCategory";
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
  const [filterEducation, setFilterEducation] = React.useState("Очная");
  const [filterPlan, setFilterPlan] = React.useState("Очная");

  const unique = (array) => {
    return array.filter((item, index) => {
      return array.indexOf(item) === index;
    });
  };
  const onChange = (event) => setQuery(event.target.value);

  const categories = unique(groups.map((group) => group.category));
  const filterStudents = groups.filter((group) => {
    return group.name.toLowerCase().includes(query.toLowerCase());
  });

  let component;
  if (!query.trim()) {
    component = categories.map((value, index) => {
      return (
        <GroupsDefault
          key={index}
          value={value}
          groups={groups}
          headers={headers}
        />
      );
    });
  } else if (query.trim()) {
    component = (
      <GroupsSearch
        filter={filterStudents}
        groups={groups}
        query={query}
        headersSearch={headersSearch}
      />
    );
  }
  // } else if (query.trim() && filterProducts.length) {
  //   component = filterProducts.map((card) => {
  //     return <Card key={card.id} card={card} />;
  //   });
  // } else if (query.trim() && !filterProducts.length) {
  //   component = <NotFound text={query} />;

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
        <GroupCategory title="Факультет" buttonOne="ДТ" buttonTwo="ТиИТ" />
        <GroupCategory
          title="Образовательная программа"
          buttonOne="Бакалавриат"
          buttonTwo="Магистратура"
        />
        <GroupCategory title="План" buttonOne="Бюджет" buttonTwo="Контракт" />
        <GroupCategory
          title="Форма обучения"
          buttonOne="Очная"
          buttonTwo="Заочная"
          setFilter={setFilterEducation}
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
