/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:27:41
 * @modify date 2021-07-15 13:27:48
 * @desc [description]
 */

import { useCallback, useEffect } from "react";
import { useState } from "react";
import { Checkbox, Table } from "semantic-ui-react";
import { JIYTableHeaderContext } from "../models/JIYContexts";

/**
 * JIYTableHeader
 * @param param - See {@link JIYTableHeaderContext}
 * @returns - Table Header Component
 */
function JIYTableHeader<T>({
  headers,
  records,
  ordering,
  setHeaders,
  setRecords,
  setOrdering,
}: JIYTableHeaderContext<T>): JSX.Element {
  const [selectAll, setSelectAll] = useState(false);

  const handleChange = useCallback(() => {
    setSelectAll(!selectAll);
  }, [selectAll]);

  useEffect(() => {
    setRecords(records.map((obj) => ({ ...obj, isSelected: selectAll })));
  }, [selectAll]);

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
