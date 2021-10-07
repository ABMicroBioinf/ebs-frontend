/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:27:15
 * @modify date 2021-07-15 13:27:22
 * @desc [description]
 */

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import { pick } from "../libs/gizmos";
import { JIYCellRowContext } from "../models/JIYContexts";
import JIYCellHeading from "./JIYCellHeading";

/**
 * JIYCellRow
 * @param param0 - See {@link JIYCellRowContext}
 * @returns - Cell Row Component
 */
function JIYCellRow<T>({
  primaryField,
  path,
  isSelectedAll,
  selectedItems,
  headers,
  records,
  record,
  index,
  setRecords,
  setSelectedAll,
  setSelectedItems,
}: JIYCellRowContext<T>): JSX.Element {
  const [row, setRow] = useState(record.data);

  const getValue = (key, value) => {
    if (primaryField.value === key) {
      return <Link href={`${path}/${value}`}>{value}</Link>;
    } else {
      return value;
    }
  };

  useEffect(() => {
    const keys = headers.filter((colState) => colState.display === "visible");
    setRow(pick(record.data, keys));
  }, []);

  return (
    <Table.Row>
      <Table.Cell>
        <JIYCellHeading
          isSelectedAll={isSelectedAll}
          selectedItems={selectedItems}
          record={record}
          records={records}
          index={index}
          setRecords={setRecords}
          setSelectedAll={setSelectedAll}
          setSelectedItems={setSelectedItems}
        />
      </Table.Cell>
      {row &&
        Object.entries(row).map(([key, value], index) => (
          <Table.Cell key={index}>{getValue(key, value)}</Table.Cell>
        ))}
    </Table.Row>
  );
}

export default JIYCellRow;
