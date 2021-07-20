/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:27:15
 * @modify date 2021-07-15 13:27:22
 * @desc [description]
 */
import Link from "next/link";
import { Table } from "semantic-ui-react";
import EBSCellHeading from "./EBSCellHeading";
import { EBSTableRecordContext } from "./interfaces/EBSContexts";

/**
 * EBSCellRow
 * @param param - See {@link EBSTableRecordContext}
 * @returns - Cell Row Component
 */
function EBSCellRow({
  primary,
  record,
  placementURI,
  setEBSTableState,
}: EBSTableRecordContext): JSX.Element {
  return (
    <Table.Row>
      <Table.Cell>
        <EBSCellHeading
          primary={primary}
          record={record}
          placementURI={placementURI}
          setEBSTableState={setEBSTableState}
        />
      </Table.Cell>
      {record &&
        Object.entries(record.data).map(([key, value], index) => {
          return index === 0 ? (
            <Table.Cell key={index}>
              {primary !== undefined && primary.value === key ? (
                <Link href={`/${placementURI}/${value}`}>{value}</Link>
              ) : (
                { value }
              )}
            </Table.Cell>
          ) : (
            <Table.Cell key={index}>{value}</Table.Cell>
          );
        })}
    </Table.Row>
  );
}

export default EBSCellRow;
