/**
 * Author: Jongil Yoon
 */

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

    const { columnData, rowData, setRowData } = props
    const { dataset, primary } = rowData

    return (
        <Grid padded>
            <Grid.Column>
                <Grid padded>
                    <Grid.Row>
                        <h2>Sequences</h2>
                    </Grid.Row>
                    <Grid.Row>
                        <EBSTableToolbar
                            columnData={columnData}
                            rowData={rowData}
                            setRowData={setRowData}
                        />
                    </Grid.Row>
                    <Grid.Row>
                        <Table sortable celled>

                            <EBSTableHeader
                                columnData={columnData}
                                rowData={rowData}
                                setRowData={setRowData}
                            />

                            <Table.Body>
                                {dataset.map((row, index) => <EBSCellRow row={row} key={index} primary={primary} />)}
                            </Table.Body>

                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell colSpan={columnData.length + 1}>

                                        <EBSTablePagination
                                            rowData={rowData}
                                            setRowData={setRowData}
                                        />

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