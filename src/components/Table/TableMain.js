import React from "react";
import "./Table.css";

function TableMain({ isShow, headers, tableData }) {
  return (
    <table className={`table-main ${isShow ? "" : "hide"} `}>
      <thead>
        <tr>
          {headers.map((header) => {
            return <th>{header.name}</th>;
          })}
        </tr>
      </thead>
      {tableData.map((table) => {
        return (
          <tr>
            <td>{table.left}</td>
            <td> {table.right}</td>
          </tr>
        );
      })}
    </table>
  );
}
export default TableMain;
