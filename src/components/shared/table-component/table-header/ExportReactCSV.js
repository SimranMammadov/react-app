import React from "react";
import { CSVLink } from "react-csv";
import {
  ButtonGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import "./table-header.scss";

export const ExportReactCSV = ({ csvData, fileName }) => {
  return (
    <div className="table-export">
      <ButtonGroup>
        <UncontrolledDropdown>
          <DropdownToggle caret>Export</DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              <CSVLink data={csvData} filename={fileName}>
                Export as .csv
              </CSVLink>
            </DropdownItem>
            <DropdownItem>Export as .excl</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </ButtonGroup>
    </div>
  );
};
