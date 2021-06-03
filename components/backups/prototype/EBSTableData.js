import { Grid, Table } from "semantic-ui-react";
import EBSCellRow from "./EBSCellRow";
import EBSTableHeader from "./EBSTableHeader";
import EBSTablePagination from "./EBSTablePagination";

export default function EBSTableData({ columnData, rowData }) {

    return (
        <Grid padded>
            <Grid.Column>
                <Grid padded>
                    <Grid.Row>
                        <h2>Sequences</h2>
                    </Grid.Row>
                    <Grid.Row>
                        <Table celled>

                            {/* for Flexible table, it needs to be fixed in the future */}
                            <EBSTableHeader columnData={columnData} />

                            <Table.Body>
                                {/* for Flexible table, it needs to be fixed in the future */}
                                {rowData && rowData.map(row =>
                                    <EBSCellRow row={row} />
                                )}
                            </Table.Body>

                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell colSpan='3'>

                                        <EBSTablePagination />

                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </Table>
                    </Grid.Row>
                </Grid>
            </Grid.Column>
        </Grid>
    )

}