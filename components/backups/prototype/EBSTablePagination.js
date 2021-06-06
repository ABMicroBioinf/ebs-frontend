import { Dropdown, Grid, Menu, Pagination } from "semantic-ui-react";


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
        setRowData,
    } = props

    const {
        origin,
        filtered,
        page,
        pageSize,
        pageCount,
    } = rowData

    const handlePageChange = (e, data) => {
        const page = data.activePage
        const dataset = filtered.length > 0 ? filtered : origin
        setRowData({
            ...rowData,
            type: 'PAGINATE_DATA',
            dataset: dataset,
            page: page,
            currentPageSize: pageSize,
        })
    }

    const handlePageSizeChange = (e, data) => {
        const pageSize = data.value
        const dataset = filtered.length > 0 ? filtered : origin
        setRowData({
            ...rowData,
            type: 'CHANGE_PAGESIZE',
            dataset: dataset,
            currentPage: page,
            pageSize: pageSize,
        })
    }

    return (
        <Grid padded columns='equal'>
            <Grid.Column textAlign='left'>
                <label>Show </label>
                <Menu compact>
                    <Dropdown
                        onChange={handlePageSizeChange}

                        text={pageSize.toString()}
                        options={pageSizeOptions}
                        compact
                        selection
                    />
                </Menu>
                <label> rows</label>
            </Grid.Column>
            <Grid.Column textAlign='right'>
                <Pagination
                    totalPages={pageCount}
                    onPageChange={handlePageChange}

                    boundaryRange={0}
                    defaultActivePage={1}
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    siblingRange={1}
                />
            </Grid.Column>
        </Grid>
    )
}