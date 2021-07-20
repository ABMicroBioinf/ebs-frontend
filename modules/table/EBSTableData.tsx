/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:27:30
 * @modify date 2021-07-15 13:27:35
 * @desc [description]
 */
import { useCallback } from "react";

import { EBSTableInstanceStateContext } from "./interfaces/EBSContexts";
import { pick } from "./helpers/EBSGizmos";

import EBSCellRow from "./EBSCellRow";
import EBSTableHeader from "./EBSTableHeader";
import EBSTableTools from "./EBSTableTools";

import { Grid, Table } from "semantic-ui-react";

/**
 * A top level table component layouts entire structure of data table
 * @param param - See {@link EBSTableInstanceStateContext}
 * @returns - Table Component
 */
export default function EBSTableData({
  ebsTableState,
  setEBSTableState,
}: EBSTableInstanceStateContext): JSX.Element {
  const { title, placementURI, headers, records } = ebsTableState;

  const getEBSCellRow = useCallback(() => {
    if (headers && records.length > 0) {
      const keys = headers.filter((colState) => colState.display);
      return records.map((record, index) => {
        const rowObj = { ...record, data: pick(record.data, keys) };
        return (
          <EBSCellRow
            primary={headers.find((header) => header.primary)}
            record={rowObj}
            placementURI={placementURI}
            setEBSTableState={setEBSTableState}
            key={index}
          />
        );
      });
    } else {
      return (
        <Table.Row>
          <Table.Cell colSpan={headers.length + 1}>not found</Table.Cell>
        </Table.Row>
      );
    }
  }, [records, headers]);

  return (
    <Grid padded>
      <Grid.Column>
        <Grid padded>
          <Grid.Row>
            <h2>{title}</h2>
          </Grid.Row>
          <Grid.Row>
            <EBSTableTools
              ebsTableState={ebsTableState}
              setEBSTableState={setEBSTableState}
            />
          </Grid.Row>
          <Grid.Row className="ebs-table-temporary">
            <Table sortable celled collapsing striped size="small">
              <EBSTableHeader
                ebsTableState={ebsTableState}
                setEBSTableState={setEBSTableState}
              />
              <Table.Body>{getEBSCellRow()}</Table.Body>
            </Table>
          </Grid.Row>
        </Grid>
      </Grid.Column>
    </Grid>
  );
}
