// @ts-check
/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:27:15
 * @modify date 2021-07-15 13:27:22
 * @desc [description]
 */
import { useCallback } from "react";
import { Checkbox, Table } from "semantic-ui-react";

export default function EBSCellRow(props) {
  const { row, setRowData } = props;

  const handleChange = useCallback(() => {
    setRowData({
      type: "SET_SELECTION",
      row: { ...row, isSelected: !row.isSelected },
    });
    setRowData({
      type: "APPLY_HISTORY",
    });
  }, [row]);

  return (
    <Table.Row>
      <Table.Cell>
        <Checkbox checked={row.isSelected} onChange={handleChange} />
      </Table.Cell>
      {row &&
        Object.values(row.data).map((value, index) => (
          <Table.Cell key={index}>{value}</Table.Cell>
        ))}
      {/* <Table.Cell>
        <Link href={`/sequences/${Object.values(row)[primary]}`}>details</Link>
      </Table.Cell> */}
    </Table.Row>
  );
}
