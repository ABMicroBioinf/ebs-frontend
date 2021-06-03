import { Dropdown, Grid, Pagination } from "semantic-ui-react";


export default function EBSTablePagination(props) {

    const {
        pageCount,
        setPage,
    } = props

    const handlePageChange = (e, data) => {
        setPage(data.activePage)
    }

    return (
        <Grid padded columns='equal'>
            <Grid.Column textAlign='left'>
                <label>Show </label>
                <Dropdown text={20 + ""}>
                    <Dropdown.Menu>
                    </Dropdown.Menu>
                </Dropdown>
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