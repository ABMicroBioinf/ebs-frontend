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
  record,
  placementURI,
  setEBSTableState,
}: EBSTableRecordContext): JSX.Element {
  return (
    <Table.Row>
      <Table.Cell>
        <EBSCellHeading
          record={record}
          placementURI={placementURI}
          setEBSTableState={setEBSTableState}
        />
      </Table.Cell>
      {record &&
        Object.values(record.data).map((value, index) => {
          console.log(record.data);
          return index === 0 ? (
            <Table.Cell key={index}>
              {/* <Link href={`/${placementURI}/${Object.values(record)[primary]}`}> */}
              <Link href={`/${placementURI}/${Object.values(record)}`}>
                {value}
              </Link>
            </Table.Cell>
          ) : (
            <Table.Cell key={index}>{value}</Table.Cell>
          );
        })}
    </Table.Row>
  );
}

export default EBSCellRow;
