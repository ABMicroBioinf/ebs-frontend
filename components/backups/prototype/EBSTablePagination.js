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
        filters,
        filtered,
        page,
        pageSize,
        pageCount,
        paginated,
    } = rowData

    const handlePageChange = (e, data) => {
        let page = data.activePage
        let results = []
        results = filtered.length > 0
            ? filtered.slice((page - 1) * pageSize, ((page - 1) * pageSize) + pageSize)
            : origin.slice((page - 1) * pageSize, ((page - 1) * pageSize) + pageSize)
        setRowData({
            ...rowData,
            type: 'PAGINATE_DATA',
            page: page,
            paginated: results
        })
    }

    const handlePageSizeChange = (e, data) => {
        let pageSize = data.value

        let pageCount = 0
        if (filtered.length > 0) {
            pageCount = filtered.length % pageSize > 0
                ? (Math.floor(filtered.length / pageSize)) + 1
                : (Math.floor(filtered.length / pageSize))
        } else {
            pageCount = origin.length % pageSize > 0
                ? (Math.floor(origin.length / pageSize)) + 1
                : (Math.floor(origin.length / pageSize))
        }

        let results = []
        results = filtered.length > 0
            ? filtered.slice((page - 1) * pageSize, ((page - 1) * pageSize) + pageSize)
            : origin.slice((page - 1) * pageSize, ((page - 1) * pageSize) + pageSize)

        setRowData({
            ...rowData,
            type: 'PAGINATE_DATA',
            page: 1,
            pageSize: pageSize,
            pageCount: pageCount,
            paginated: results
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