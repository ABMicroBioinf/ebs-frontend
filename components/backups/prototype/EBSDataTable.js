/**
 * Author: Jongil Yoon
 */

import _ from 'lodash'
import { useCallback, useReducer, useState } from "react"
import EBSTableData from "./EBSTableData"


/**
 * A Wrapper component used for state management
 * @param {data} data
 * @returns <EBSTableData />
 */
export default function EBSDatatable({ data, primary }) {

    const CUSTOM_COLUMNS = data.headers.map((heading, index) =>
        primary === index
            ? { name: heading, display: true, primary: true }
            : { name: heading, display: true, primary: false }
    )
    const CUSTOM_ROWS = data.rows.slice()

    /**
     * Temporary
     * Data search and filter need to be implemented in backend
     * This state management is implemented for development
     */
    const initialDatasetState = (() => {

        const DEFAULT_DATASET = CUSTOM_ROWS
        const DEFAULT_PAGE = 1
        const DEFAULT_PAGE_SIZE = 20
        const DEFAULT_SEARCH_KEYWORD = ''
        const DEFAULT_SORT = { column: null, direction: null }
        const DEFALUT_COLUMNS = CUSTOM_COLUMNS
        const DEFAULT_PAGE_COUNT = (() => (
            DEFAULT_DATASET.length % DEFAULT_PAGE_SIZE > 0
                ? (Math.floor(DEFAULT_DATASET.length / DEFAULT_PAGE_SIZE)) + 1
                : (Math.floor(DEFAULT_DATASET.length / DEFALUT_PAGE_SIZE))
        ))()

        let history = {
            order: [],
            search: DEFAULT_SEARCH_KEYWORD,
            columns: DEFALUT_COLUMNS,
            sort: DEFAULT_SORT,
            pagination: {
                page: DEFAULT_PAGE,
                pageSize: DEFAULT_PAGE_SIZE,
                pageCount: DEFAULT_PAGE_COUNT,
            }
        }

        let dataset = DEFAULT_DATASET
        const ORIGIN = DEFAULT_DATASET

        return {
            ORIGIN: ORIGIN,
            history: history,
            dataset: dataset,
            primary: primary
        }
    })()

    const dataReducer = useCallback((state, action) => {
        const { ORIGIN, history, dataset } = state
        const { order, search, columns, sort, pagination } = history
        const { page, pageSize, pageCount } = pagination

        const pick = (obj, keys) => {
            return keys.map(k => k in obj ? { [k]: obj[k] } : {})
                .reduce((res, o) => Object.assign(res, o), {})
        }

        switch (action.type) {
            case 'RESET_DATASET':
                return initialDatasetState

            case 'SET_HISTORY':
                return {
                    ...state,
                    history: {
                        order: action.module
                            ? order.includes(action.module)
                                ? [...order]
                                : [...order, action.module]
                            : order,
                        search: action.search ? action.search : search,
                        columns: action.column
                            ? columns.map(column => {
                                if (column.name === action.column) {
                                    return { ...column, display: !column.display }
                                }
                                return column
                            })
                            : columns,
                        sort: action.sort
                            ? sort.column === action.sort
                                ? {
                                    ...sort,
                                    direction:
                                        sort.direction === 'asc' ? 'desc' : 'asc',
                                }
                                : {
                                    column: action.sort,
                                    direction: 'asc',
                                }
                            : sort,
                        pagination: {
                            ...pagination,
                            page: action.page ? action.page : page,
                            pageSize: action.pageSize ? action.pageSize : pageSize,
                        }
                    },
                }

            case 'APPLY_HISTORY':
                let results = ORIGIN
                order.forEach(module => {
                    if (module !== null && module !== undefined && module !== '') {
                        switch (module) {

                            case 'search':
                                results = results.filter(row =>
                                    JSON.stringify(Object.values(row)).includes(search)
                                )
                                break

                            case 'columns':
                                results = results.map(data =>
                                    pick(data, columns.filter(colState => colState.display && colState)
                                        .map(colState => colState.name))
                                )
                                break

                            case 'sort':
                                results = _.orderBy(results, (obj) => {
                                    return parseFloat(obj[sort.column])
                                }, [sort.direction])
                                break


                            default:
                                throw new Error()

                        }
                    }
                })
                return {
                    ...state,
                    dataset: results.slice(  // pagination
                        (page - 1) * pageSize,
                        ((page - 1) * pageSize) + pageSize,
                    ),
                    history: {
                        ...history,
                        pagination: {
                            ...pagination,
                            pageCount: results.length % pageSize > 0
                                ? (Math.floor(results.length / pageSize)) + 1
                                : (Math.floor(results.length / pageSize))
                        }
                    }
                }

            default:
                throw new Error()
        }
    }, [])
    /**
     * Above codes are Temporary
     */



    const [columnData, setColumnData] = useState(CUSTOM_COLUMNS)
    const [rowData, setRowData] = useReducer(dataReducer, initialDatasetState)

    // DEBUG
    // useEffect(() => {
    //     console.log(rowData)
    // }, [rowData])

    return (columnData && rowData && <EBSTableData
        columnData={columnData}
        rowData={rowData}
        setRowData={setRowData}
    />)

}
