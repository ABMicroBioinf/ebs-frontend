/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:27:41
 * @modify date 2021-07-15 13:27:48
 * @desc [description]
 */
import { useCallback } from "react";
import { useState } from "react";
import { Checkbox, Table } from "semantic-ui-react";
import {
  EBSTableInstanceStateContext,
  EBSTabularHeaderContext,
} from "./interfaces/EBSContexts";

/**
 * EBSTableHeader
 * @param param - See {@link EBSTableInstanceStateContext}
 * @returns - Table Header Component
 */
function EBSTableHeader({
  ebsTableState,
  setEBSTableState,
}: EBSTableInstanceStateContext): JSX.Element {
  const { stateChain, headers, records } = ebsTableState;
  const { sort } = stateChain;

  const [selectAll, setSelectAll] = useState(false);

  const handleChange = useCallback(() => {
    setSelectAll(!selectAll);
    setEBSTableState({
      type: !selectAll ? "SELECT_ALL_RECORDS" : "DESELECT_ALL_RECORDS",
    });
  }, [records]);

  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>
          <Checkbox checked={selectAll} onChange={handleChange} />
        </Table.HeaderCell>
        {headers &&
          headers
            .filter(
              (colState: EBSTabularHeaderContext) =>
                colState.display && colState
            )
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
                  setEBSTableState({
                    type: "TOGGLE_SORT",
                    sortColumn: colState.value,
                    sortDataType: colState.type,
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

export default EBSTableHeader;
