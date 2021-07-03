/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import { Table } from "semantic-ui-react";

export default function EBSCellRow(props) {
  const { row } = props;

  return (
    <Table.Row>
      {row &&
        Object.values(row).map((value, index) => (
          <Table.Cell key={index}>{value}</Table.Cell>
        ))}
      {/* <Table.Cell>
        <Link href={`/sequences/${Object.values(row)[primary]}`}>details</Link>
      </Table.Cell> */}
    </Table.Row>
  );
}
