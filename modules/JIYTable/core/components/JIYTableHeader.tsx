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
import { JIYTableHeaderContext } from "../models/JIYContexts";

/**
 * @param param - See {@link EBSTableInstanceStateContext}
 * @returns - Table Header Component
 */
function JIYTableHeader({
  headers,
  ordering,
  setHeaders,
  setOrdering,
}: JIYTableHeaderContext): JSX.Element {
  const [selectAll, setSelectAll] = useState(null);

  const handleChange = useCallback(() => {
    console.log("Select All");
  }, []);

  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>
          <Checkbox checked={selectAll} onChange={handleChange} />
        </Table.HeaderCell>
        {headers.length > 0 &&
          headers
            .filter((colState) => colState.display === "visible")
            .map((colState, index) => (
              <Table.HeaderCell
                sorted={
                  ordering !== null
                    ? ordering.column === colState.value
                      ? ordering.direction
                      : null
                    : null
                }
                onClick={() => {
                  if (ordering !== null && ordering !== undefined) {
                    if (colState.value === ordering.column) {
                      setOrdering({
                        column: colState.value,
                        direction:
                          ordering.direction === "ascending"
                            ? "descending"
                            : "ascending",
                      });
                    } else {
                      setOrdering({
                        column: colState.value,
                        direction: "ascending",
                      });
                    }
                  } else {
                    setOrdering({
                      column: colState.value,
                      direction: "ascending",
                    });
                  }
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

export default JIYTableHeader;
