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

    const { searchState, onSearchChange, filters, dispatchRowData } = props
    const { searchValue, searchResults } = searchState

    useEffect(() => {
        dispatchRowData({
            type: 'FILTER_DATA',
            filters: filters.indexOf('search') === -1 ? [...filters, 'search'] : [...filters],
            filteredRows: searchResults,
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
        dataCount,
        columnData,
        rowData,
        pageSize,
        page,
        dispatchRowData,
    } = props
    const { rows, filters, filteredRows } = rowData
    const { loading, searchResults, searchValue } = searchState

    const timeoutRef = useRef()

    const handleSearchChange = useCallback((e, data) => {
        dispatchSearch({ searchType: 'START_SEARCH', searchQuery: data.value })
        timeoutRef.current = setTimeout(() => {
            if (data.value.length === 0) {
                dispatchSearch({ searchType: 'CLEAN_QUERY' })
                return
            }
            dispatchSearch({
                searchType: 'FINISH_SEARCH',
                searchResults: filteredRows.length > 0
                    ? filteredRows.filter(row => JSON.stringify(Object.values(row)).includes(data.value))
                    : rows.filter(row => JSON.stringify(Object.values(row)).includes(data.value))
            })
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
                    Showing {(Number(page) - 1) * Number(pageSize) + (dataCount > 0 ? 1 : 0)} - {(Number(page) * Number(pageSize)) > dataCount ? dataCount : (Number(page) * Number(pageSize))} of {dataCount}
                </Grid.Column>
                <Grid.Column textAlign="right">
                    <Search
                        onSearchChange={handleSearchChange}
                        searchState={searchState}
                        filters={filters}
                        dispatchRowData={dispatchRowData}
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