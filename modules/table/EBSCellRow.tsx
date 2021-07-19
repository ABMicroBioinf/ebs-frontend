/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:27:15
 * @modify date 2021-07-15 13:27:22
 * @desc [description]
 */
import { useCallback } from "react";
import { Checkbox, Table } from "semantic-ui-react";

function EBSCellRow({ record, setEBSTableState }) {
  const handleChange = useCallback(() => {
    setEBSTableState({
      type: "SELECT_RECORD",
      record: { ...record, isSelected: !record.isSelected },
    });
  }, [record]);

  return (
    <Table.Row>
      <Table.Cell>
        <Checkbox checked={record.isSelected} onChange={handleChange} />
      </Table.Cell>
      {record &&
        Object.values(record.data).map((value, index) => (
          <Table.Cell key={index}>{value}</Table.Cell>
        ))}
      {/* <Table.Cell>
        <Link href={`/sequences/${Object.values(row)[primary]}`}>details</Link>
      </Table.Cell> */}
    </Table.Row>
  );
}

export default EBSCellRow;
