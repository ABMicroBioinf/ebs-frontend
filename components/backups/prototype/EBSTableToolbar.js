/**
 * Author: Jongil Yoon
 */

import { useCallback, useEffect, useReducer, useRef } from "react";
import { Dropdown, Grid, Input } from "semantic-ui-react";


/**
 * Search Tool
 */
function Search(props) {

    const { rowData, setRowData } = props

    const initialSearchState = {
        loading: false,
        searchValue: '',
    }
    
    function searchReducer(state, action) {
        switch (action.searchType) {
            case 'CLEAN_QUERY':
                return initialSearchState
            case 'START_SEARCH':
                return { ...state, loading: true, searchValue: action.searchQuery }
            case 'FINISH_SEARCH':
                return { ...state, loading: false, searchValue: action.searchQuery }
            case 'NOT_FOUND':
                return { ...state, loading: false }
    
            default:
                throw new Error()
        }
    }

    const [searchState, dispatchSearch] = useReducer(searchReducer, initialSearchState)
    const { searchValue } = searchState

    const handleSearchChange = useCallback((e, data) => {
        dispatchSearch({ searchType: 'START_SEARCH', searchQuery: data.value })
        if (data.value.length === 0) {
            dispatchSearch({ searchType: 'CLEAN_QUERY' })
            setRowData({
                type: 'SET_HISTORY',
                module: 'search',
                search: ''
            })
            setRowData({
                type: 'APPLY_HISTORY',
            })
            return
        }

        dispatchSearch({
            searchType: 'FINISH_SEARCH',
            searchQuery: data.value
        })
        setRowData({
            type: 'SET_HISTORY',
            module: 'search',
            search: data.value
        })
        setRowData({
            type: 'APPLY_HISTORY',
        })
    }, [])

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


/**
 * Column Selector
 */
function ColumnSelector(props) {

    const { columnData, rowData, setRowData } = props
    const { ORIGIN, history, dataset } = rowData
    const { order, search, columns, sort, pagination } = history
    const { page, pageSize, pageCount } = pagination

    const handleCheck = useCallback(e => {
        setRowData({
            type: 'SET_HISTORY',
            module: 'columns',
            column: e.currentTarget.value
        })
        setRowData({
            type: 'APPLY_HISTORY',
        })
    }, [])

    const handleBlur = useCallback(e => {
        if (e && e.relatedTarget === null) {
            // setToggleParent(false)
            // console.log('relatedtarget exist')
        }
    }, [])

    return (
        <Dropdown text='columns'>
            <Dropdown.Menu>
                {columnData &&
                    columnData.map((column, index) => (
                        <Dropdown.Item key={index} disabled={column.primary}>
                            <input
                                onChange={handleCheck}
                                onBlur={handleBlur}
                                value={column.name}
                                defaultChecked={column.display}
                                type="checkbox"
                            />
                            <label>{column.name}</label>
                        </Dropdown.Item>
                    ))
                }
            </Dropdown.Menu>
        </Dropdown>
    )

}


/**
 * Toolbar Component
 * @param {*} props 
 * @returns 
 */
export default function EBSTableToolbar(props) {

    const { columnData, rowData, setRowData } = props
    const { ORIGIN, history, dataset } = rowData
    const { order, search, columns, pagination } = history
    const { page, pageSize, pageCount } = pagination

    return (
        <Grid container columns='equal'>
            <Grid.Row>
                <Grid.Column textAlign="left">
                    {(() => {
                        return (
                            'Showing ' +
                            ((Number(page) - 1) * Number(pageSize) + (dataset.length > 0 ? 1 : 0)).toString() +
                            ' - ' +
                            (Number(pageSize) > dataset.length ? ORIGIN.length : (Number(page) * Number(pageSize))).toString() +
                            ' of ' +
                            ORIGIN.length
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

                    <ColumnSelector
                        columnData={columnData}
                        rowData={rowData}
                        setRowData={setRowData}
                    />

                </Grid.Column>
            </Grid.Row>
        </Grid>
    )

}