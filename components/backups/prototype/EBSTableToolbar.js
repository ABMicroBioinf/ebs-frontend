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

    const [searchState, dispatchSearch] = useReducer(searchReducer, initialSearchState)
    const { rowData, setRowData } = props
    const { searchValue, searchResults } = searchState
    const { origin, filters, filtered, page, pageSize } = rowData

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
        }, 300)
    }, [])

    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current)
        }
    }, [])

    useEffect(() => {
        let dataset = filtered.length > 0 ? filtered : origin
        let results = searchResults.length > 0 ? searchResults : dataset
        setRowData({
            ...rowData,
            type: 'FILTER_DATA',
            filters: filters.indexOf('search') === 0 ? [...filters, 'search'] : [...filters],
            filtered: results,
            paginated: results.slice((page - 1) * pageSize, ((page - 1) * pageSize) + pageSize)

        })
    }, [searchState])

    return (
        <Input
            onChange={handleSearchChange}
            value={searchValue}
            icon="search"
            placeholder="Search..."
            type="text"
        />
    )

}


export default function EBSTableToolbar(props) {

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

    return (
        <Grid container columns='equal'>
            <Grid.Row>
                <Grid.Column textAlign="left">
                    {(() => {
                        let dataset = filtered.length > 0 ? filtered : origin
                        return (
                            'Showing ' +
                            ((Number(page) - 1) * Number(pageSize) + (dataset.length > 0 ? 1 : 0)).toString() +
                            ' - ' +
                            ((Number(page) * Number(pageSize)) > dataset.length ? dataset.length : (Number(page) * Number(pageSize))).toString() +
                            ' of ' +
                            dataset.length
                        )
                    })()}
                </Grid.Column>
                <Grid.Column textAlign="right">
                    <Search
                        rowData={rowData}
                        setRowData={setRowData}
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