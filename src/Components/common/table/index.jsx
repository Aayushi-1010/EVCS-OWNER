import React from "react";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
import { useFilters, useGlobalFilter, useSortBy, useTable } from "react-table";
import style from "./table.module.scss";
import { strictValidArrayWithLength } from "../../../utils/common";

function Table(props) {
  const {
    columns,
    data,
    loading,
    tableTitle,
    tableHeader
  } = props;
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useFilters,
      useGlobalFilter,
      useSortBy
    );
  return (
    <div className={style.tableContainer}>
      {tableTitle && (
        <div>
          <label>{tableTitle}</label>
        </div>
      )}
      {tableHeader}
      <table {...getTableProps()}>
        {loading && <div className={style.loader}>Loading...</div>}
        <thead className={style["table-header"]}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={style["title"]}
                >
                  {column.render("Header")}
                  {column.isSorted && (
                    <span>
                      {column.isSortedDesc && (
                        <BsArrowDownShort color="#10044a" size={15} />
                      )}
                      {!column.isSortedDesc && (
                        <BsArrowUpShort color="#10044a" size={15} />
                      )}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {strictValidArrayWithLength(data) && (
          <tbody {...getTableBodyProps()} className={style["table-body"]}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className={style["data-row"]}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()} className={style["data"]}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
      {!strictValidArrayWithLength(data) && !loading && (
        <div className={style["blank-data-tag"]}>No data found</div>
      )}
    </div>
  );
}

export default Table;
