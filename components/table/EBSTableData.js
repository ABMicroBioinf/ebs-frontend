/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import { useEffect } from "react";
import EBSCellRow from "./EBSCellRow";
import EBSTableHeader from "./EBSTableHeader";
import EBSTableTools from "./EBSTableTools";
import { useEBSData } from "./EBSDataView";

import { Grid, Table } from "semantic-ui-react";

/**
 * A top level table component layouts entire structure of data table
 * @param {*} columData, rowData
 * @returns An entire layout of a table
 */
export default function EBSTableData() {
  const { columnData, rowData, setRowData } = useEBSData();
  const { dataset } = rowData;

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

              <Table.Body>
                {dataset.length > 0 ? (
                  dataset.map((row, index) => (
                    <EBSCellRow row={row} key={index} />
                  ))
                ) : (
                  <Table.Row>
                    <Table.Cell colSpan={columnData.length + 1}>
                      not found
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </Grid.Row>
        </Grid>
      </Grid.Column>
    </Grid>
  );
}
