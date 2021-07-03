/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import { Table } from "semantic-ui-react";
import { useEBSData } from "./EBSDataView";

export default function EBSTableHeader() {
  const { rowData, setRowData } = useEBSData();
  const { history } = rowData;
  const { columns, sort } = history;

  return (
    <Table.Header>
      <Table.Row>
        {columns &&
          columns
            .filter((colState) => colState.display && colState)
            .map((colState, index) => (
              <Table.HeaderCell
                sorted={
                  sort.column === colState.value
                    ? sort.direction === "asc"
                      ? "ascending"
                      : "descending"
                    : null
                }
                onClick={() => {
                  setRowData({
                    type: "SET_HISTORY",
                    module: "sort",
                    sort: colState.value,
                    dataType: colState.type,
                  });
                  setRowData({
                    type: "APPLY_HISTORY",
                  });
                }}
                key={index}
              >
                {colState.alias ? colState.alias : colState.value}
              </Table.HeaderCell>
            ))}
        {/* <Table.HeaderCell>Details</Table.HeaderCell> */}
      </Table.Row>
    </Table.Header>
  );
}
