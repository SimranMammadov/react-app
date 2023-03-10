import React from "react";
import { useEffect, useMemo, useState } from "react";
import TableComponent from "components/shared/table-component/table-component";
import TableHeader from "components/shared/table-component/table-header";
import Pagination from "components/shared/pagination/pagination";
import dayjs from "dayjs";
import { NavLink } from "react-router-dom";
import { getallReports } from "core/api";
import stroke from "assets/images/common/stroke.png";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { ExportReactCSV } from "components/shared/table-component/table-header/ExportReactCSV";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import products from "../../db.json";

const Report = ({ data, setReturnedItemFunc, ...props }) => {
  console.log(products);
  const PageSize = process.env.REACT_APP_PAGE_SIZE;
  let navigate = useNavigate();
  const isBetween = require("dayjs/plugin/isBetween");
  const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
  dayjs.extend(isSameOrAfter);
  dayjs.extend(isBetween);

  const excludedHeader = ["url", "id", "reportAppId", "reportId"];
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [reports, setReports] = useState([]);
  const [noFilter, setNoFilter] = useState(true);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    getReports();
  }, []);

  const getReports = async () => {
    const response = await getallReports();
    // console.log(response);

    setReports(
      response.data.map((dt) => ({
        ...dt,
        render: () => (
          <NavLink
            onClick={(e) => {
              e.preventDefault();
              navigate(`/report/app/${dt.id}`);
            }}
          >
            Keçid et <img src={stroke} />
          </NavLink>
        ),
      }))
    );
  };
  const currentTableData = useMemo(() => {
    let filterData = reports;

    if (searchValue) {
      filterData = [
        ...filterData.filter((item) => {
          return item.agency
            ?.toLowerCase()
            .includes(searchValue?.toLowerCase());
        }),
      ];
    }
    setSearchData(filterData);
    setTotalCount(filterData.length);
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filterData.slice(firstPageIndex, lastPageIndex);
  }, [reports, searchValue, currentPage]);
  // console.log(reports);

  const _export = React.useRef(null);
  const excelExport = () => {
    if (_export.current !== null) {
      _export.current.save();
    }
  };
  const data2 = currentTableData;
  return (
    <div className="container__page">
      <ExcelExport ref={_export} data={data2}>
        <TableHeader
          setSearchValue={setSearchValue}
          setCurrentPage={setCurrentPage}
          placeholder={"Qurum-a görə axtar..."}
          searchValue={searchValue}
          noFilter={noFilter}
          csvData={currentTableData}
          fileName={"report"}
        />
        <TableComponent
          data={currentTableData}
          excluded={excludedHeader}
          searchData={searchData}
          // data={products}
        ></TableComponent>
        <button onClick={excelExport}>kilk</button>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={totalCount}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </ExcelExport>
    </div>
  );
};

export default Report;
