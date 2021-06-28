/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import { Table } from "semantic-ui-react";

export default function EBSTableHeader(props) {
  const { rowData, setRowData } = props;
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
                  sort.column === colState.name
                    ? sort.direction === "asc"
                      ? "ascending"
                      : "descending"
                    : null
                }
                onClick={() => {
                  setRowData({
                    type: "SET_HISTORY",
                    module: "sort",
                    sort: colState.name,
                  });
                  setRowData({
                    type: "APPLY_HISTORY",
                  });
                }}
                key={index}
              >
                {colState.name}
              </Table.HeaderCell>
            ))}
        <Table.HeaderCell>Details</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  );
}
