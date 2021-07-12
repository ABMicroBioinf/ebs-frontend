/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import { useCallback } from "react";
import { useState } from "react";
import { Checkbox, Table } from "semantic-ui-react";

export default function EBSTableHeader(props) {
  const { rowData, setRowData } = props;
  const { dataset, history } = rowData;
  const { columns, sort } = history;

  const [selectAll, setSelectAll] = useState(false);

  const handleChange = useCallback(() => {
    setSelectAll(!selectAll);
    setRowData({
      type: !selectAll ? "SELECT_ALL" : "DESELECT_ALL",
    });
    setRowData({
      type: "APPLY_HISTORY",
    });
  }, [dataset]);

  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>
          <Checkbox checked={selectAll} onChange={handleChange} />
        </Table.HeaderCell>
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
      </Table.Row>
    </Table.Header>
  );
}
