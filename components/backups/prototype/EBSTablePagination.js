import { Dropdown, Grid, List, Menu, Pagination } from "semantic-ui-react";


const pageSizeOptions = [
    { key: 1, text: '5', value: 5 },
    { key: 2, text: '10', value: 10 },
    { key: 3, text: '20', value: 20 },
    { key: 4, text: '50', value: 50 },
    { key: 5, text: '100', value: 100 },
]


export default function EBSTablePagination(props) {

    const {
        rowData,
        pageSize,
        pageCount,
        setPage,
        setPageSize,
        setPageCount,
    } = props
    const { rows, filters, filteredRows } = rowData

    const handlePageChange = (e, data) => {
        setPage(data.activePage)
    }

    const handlePageSizeChange = (e, data) => {
        setPageSize(data.value)

        const records = filteredRows.length > 0 ? filteredRows : rows
        setPageCount(
            (records.length % data.value) > 0
                ? (Math.floor(records.length / data.value)) + 1
                : (Math.floor(records.length / data.value))
        )

        setPage(1)
    }

    return (
        <Grid padded columns='equal'>
            <Grid.Column textAlign='left'>
                <label>Show </label>
                <Menu compact>
                    <Dropdown
                        onChange={handlePageSizeChange}
                        text={pageSize + ""}
                        options={pageSizeOptions}
                        compact
                        selection
                    />
                </Menu>
                <label> rows</label>
            </Grid.Column>
            <Grid.Column textAlign='right'>
                <Pagination
                    boundaryRange={0}
                    defaultActivePage={1}
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    siblingRange={1}
                    totalPages={pageCount}
                    onPageChange={handlePageChange}
                />
            </Grid.Column>
        </Grid>
    )
}