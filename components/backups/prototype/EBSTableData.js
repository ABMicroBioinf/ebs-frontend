import { Grid, Table } from "semantic-ui-react";
import EBSCellRow from "./EBSCellRow";
import EBSTableHeader from "./EBSTableHeader";
import EBSTablePagination from "./EBSTablePagination";
import EBSTableToolbar from "./EBSTableToolbar";


/**
 * A top level table component layouts entire structure of data table
 * @param {*} columData, rowData 
 * @returns An entire layout of a table
 */
export default function EBSTableData(props) {

    const {
        dataCount,
        columnData,
        rowData,
        pageSize,
        page,
        dispatchRowData,
    } = props
    const { rows, filters, filteredRows } = rowData

    return (
        <Grid padded>
            <Grid.Column>
                <Grid padded>
                    <Grid.Row>
                        <h2>Sequences</h2>
                    </Grid.Row>
                    <Grid.Row>
                        <EBSTableToolbar
                            dataCount={dataCount}
                            rowData={rowData}
                            pageSize={pageSize}
                            page={page}
                            dispatchRowData={dispatchRowData}
                        />
                    </Grid.Row>
                    <Grid.Row>
                        <Table celled>

                            {/* for Flexible table, it needs to be fixed in the future */}
                            <EBSTableHeader columnData={columnData} />

                            <Table.Body>
                                {/* for Flexible table, it needs to be fixed in the future */}
                                {
                                    filteredRows.length > 0
                                        ? filteredRows.map((row, index) => <EBSCellRow row={row} key={index} />)
                                        : rows.map((row, index) => <EBSCellRow row={row} key={index} />)
                                }
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