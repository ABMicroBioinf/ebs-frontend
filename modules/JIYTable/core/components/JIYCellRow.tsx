/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:27:15
 * @modify date 2021-07-15 13:27:22
 * @desc [description]
 */

import Link from "next/link";
import React from "react";
import { Table } from "semantic-ui-react";
import { JIYCellRowContext } from "../models/JIYContexts";
import JIYCellHeading from "./JIYCellHeading";

/**
 * @param param - See {@link EBSTableRecordContext}
 * @returns - Cell Row Component
 */
function JIYCellRow<T>({
  primaryField,
  path,
  record,
  setRecords,
}: JIYCellRowContext<T>): JSX.Element {
  return (
    <Table.Row>
      <Table.Cell>
        <JIYCellHeading record={record} setRecords={setRecords} />
      </Table.Cell>
      {record &&
        Object.entries(record.data).map(
          ([key, value], index) => (
            <Table.Cell key={index}>
              {/* {primaryField !== undefined &&
              primaryField !== null &&
              primaryField.value === key ? (
                <Link href={`${path}/${value}`}>{value}</Link>
              ) : (
                { value }
              )} */}
              {value}
            </Table.Cell>
          )
          // <Table.Cell key={index}>{value}</Table.Cell>
        )}
    </Table.Row>
  );
}

export default JIYCellRow;
