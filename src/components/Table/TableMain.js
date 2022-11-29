import React from "react";
import "./Table.css";

function TableMain({ isShow, headers, tableData }) {
  return (
    <table className={`table-main ${isShow ? "" : "hide"} `}>
      <thead>
        <tr>
          {headers.map((header) => {
            return <th key={header.name}>{header.name}</th>;
          })}
        </tr>
      </thead>
      {tableData.map((table) => {
        return (
          <tr key={table.left}>
            <td>{table.left}</td>
            <td> {table.right}</td>
          </tr>
        );
      })}
    </table>
  );
}
export default TableMain;
