import React from "react";
import TableSearch from "./table-search";
import "./table-header.scss";
import TableExport from "./table-export";
import TableFilter from "./table-filter";
import { ExportReactCSV } from "components/shared/table-component/table-header/ExportReactCSV";

export default function TableHeader({
  setSearchValue,
  searchValue,
  noFilter,
  setCurrentPage,
  placeholder,
  setFilterMode,
  filterMode,
  csvData,
  fileName,
}) {
  return (
    <div className="table-header">
      <TableSearch
        setSearchValue={setSearchValue}
        setCurrentPage={setCurrentPage}
        placeholder={placeholder}
        searchValue={searchValue}
      />
      {!noFilter ? (
        <TableFilter setFilterMode={setFilterMode} filterMode={filterMode} />
      ) : (
        <></>
      )}
      <ExportReactCSV csvData={csvData} fileName={fileName}></ExportReactCSV>
    </div>
  );
}
