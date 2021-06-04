import { useCallback, useEffect, useReducer, useRef } from "react";
import { Dropdown, Grid, Input } from "semantic-ui-react";


const initialSearchState = {
    loading: false,
    searchResults: [],
    searchValue: '',
}

function searchReducer(state, action) {
    switch (action.searchType) {
        case 'CLEAN_QUERY':
            return initialSearchState
        case 'START_SEARCH':
            return { ...state, loading: true, searchValue: action.searchQuery }
        case 'FINISH_SEARCH':
            return { ...state, loading: false, searchResults: action.searchResults }
        case 'UPDATE_SELECTION':
            return { ...state, value: action.searchSelection }

        default:
            throw new Error()
    }
}

const Search = props => {

    const { searchState, onSearchChange, rowData, setRowData } = props
    const { filters } = rowData
    const { searchValue, searchResults } = searchState

    useEffect(() => {
        setRowData({
            ...rowData,
            type: 'FILTER_DATA',
            filters: filters.indexOf('search') === -1 ? [...filters, 'search'] : [...filters],
            filtered: searchResults,
        })
    }, [searchState])

    return (
        <Input
            onChange={onSearchChange}
            value={searchValue}
            icon="search"
            placeholder="Search..."
            type="text"
        />
    )

}


export default function EBSTableToolbar(props) {

    const [searchState, dispatchSearch] = useReducer(searchReducer, initialSearchState)

    const {
        columnData,
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
        paginated
    } = rowData

    const timeoutRef = useRef()

    const handleSearchChange = useCallback((e, data) => {
        dispatchSearch({ searchType: 'START_SEARCH', searchQuery: data.value })
        timeoutRef.current = setTimeout(() => {
            if (data.value.length === 0) {
                dispatchSearch({ searchType: 'CLEAN_QUERY' })
                return
            }

            const results = filtered.length > 0
                ? filtered.filter(row => JSON.stringify(Object.values(row)).includes(data.value))
                : origin.filter(row => JSON.stringify(Object.values(row)).includes(data.value))

            dispatchSearch({
                searchType: 'FINISH_SEARCH',
                searchResults: results
            })

            // if (results.length > pageSize) {
            //     setPageCount(results.length % pageSize > 0
            //         ? (Math.floor(results.length / pageSize)) + 1
            //         : (Math.floor(results.length / pageSize))
            //     )
            // } else {
            //     setPageCount(1)
            // }

        }, 300)
    }, [])

    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current)
        }
    }, [])

    return (
        <Grid container columns='equal'>
            <Grid.Row>
                <Grid.Column textAlign="left">
                    Showing {(Number(page) - 1) * Number(pageSize) + (paginated.length > 0 ? 1 : 0)} - {(Number(page) * Number(pageSize)) > paginated.length ? paginated.length : (Number(page) * Number(pageSize))} of {paginated.length}
                </Grid.Column>
                <Grid.Column textAlign="right">
                    <Search
                        rowData={rowData}
                        setRowData={setRowData}

                        searchState={searchState}

                        onSearchChange={handleSearchChange}
                    />
                </Grid.Column>
                <Grid.Column textAlign="right">
                    <Dropdown text='columns'>
                        <Dropdown.Menu>
                            {columnData.map((column, index) => <Dropdown.Item key={index}>{column}</Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )

}