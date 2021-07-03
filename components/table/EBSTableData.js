/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import { useCallback, useEffect } from "react";
import EBSCellRow from "./EBSCellRow";
import EBSTableHeader from "./EBSTableHeader";
import EBSTableTools from "./EBSTableTools";
import { useEBSData } from "./EBSDataView";

import { Grid, Table } from "semantic-ui-react";

// helers
const pick = (obj, keys) => {
  return keys
    .map((k) => (k.value in obj ? { [k.value]: obj[k.value] } : {}))
    .reduce((res, o) => Object.assign(res, o), {});
};

/**
 * A top level table component layouts entire structure of data table
 * @param {*} columData, rowData
 * @returns An entire layout of a table
 */
export default function EBSTableData() {
  const { columnData, rowData, setRowData } = useEBSData();
  const { dataset, history } = rowData;
  const { columns } = history;

  const getEBSCellRow = useCallback(() => {
    if (columns && dataset.length > 0) {
      const keys = columns.filter((colState) => colState.display);
      return dataset.map((row, index) => {
        const rowObj = pick(row, keys);
        return <EBSCellRow row={rowObj} key={index} />;
      });
    } else {
      return (
        <Table.Row>
          <Table.Cell colSpan={columnData.length + 1}>not found</Table.Cell>
        </Table.Row>
      );
    }
  }, [dataset, columnData]);

  useEffect(() => {
    setRowData({
      type: "APPLY_HISTORY",
    });
  }, []);

  return (
    <Grid padded>
      <Grid.Column>
        <Grid padded>
          <Grid.Row>
            <h2>Sequences</h2>
          </Grid.Row>
          <Grid.Row>
            <EBSTableTools />
          </Grid.Row>
          <Grid.Row className="ebs-table-temporary">
            <Table sortable celled collapsing striped size="small">
              <EBSTableHeader />
              <Table.Body>{getEBSCellRow()}</Table.Body>
            </Table>
          </Grid.Row>
        </Grid>
      </Grid.Column>
    </Grid>
  );
}
