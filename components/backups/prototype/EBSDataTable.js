import { useCallback, useReducer, useState } from "react"
import EBSTableData from "./EBSTableData"


/**
 * A Wrapper component used for state management
 * @param {data} data
 * @returns <EBSTableData />
 */
export default function EBSDatatable({ data }) {

    /**
     * Temporary
     * Data search and filter need to be implemented in backend
     * This state management is implemented for development
     */
    const initialDataState = (() => {
        /**
         * Order is important
         * 1. apply enabled columns
         * 2. apply filters
         * 3. apply sort
         * 4. apply pagination
         * 
         * 'paginated' is an array of data applied all methods above.
         */
        let origin = data.rows
        let filtered = []
        let page = 1
        let pageSize = 20
        let pageCount = (() => (
            origin.length % pageSize > 0
                ? (Math.floor(origin.length / pageSize)) + 1
                : (Math.floor(origin.length / pageSize))
        ))()
        let paginated = (() => (
            origin.slice((page - 1) * pageSize, ((page - 1) * pageSize) + pageSize)
        ))()

        return {
            origin: origin,
            filtered: filtered,
            page: page,
            pageSize: pageSize,
            pageCount: pageCount,
            paginated: paginated,
        }
    })()

    const dataReducer = useCallback((state, action) => {
        switch (action.type) {
            case 'LOAD_DATA':
                return { ...state, origin: action.origin }
            case 'FILTER_DATA':
                return {
                    ...state,
                    filtered: action.founds,
                    paginated: action.founds
                        .slice(
                            (action.currentPage - 1) * action.currentPageSize,
                            ((action.currentPage - 1) * action.currentPageSize) + action.currentPageSize
                        )
                }
            case 'SORT_DATA':
                if (action.target === 'filtered') {
                    return {
                        ...state,
                        filtered: action.dataset,
                        paginated: action.dataset
                            .slice(
                                (action.currentPage - 1) * action.currentPageSize,
                                ((action.currentPage - 1) * action.currentPageSize) + action.currentPageSize
                            )
                    }
                } else if (action.target === 'origin') {
                    return {
                        ...state,
                        origin: action.dataset,
                        paginated: action.dataset
                            .slice(
                                (action.currentPage - 1) * action.currentPageSize,
                                ((action.currentPage - 1) * action.currentPageSize) + action.currentPageSize
                            )
                    }
                } else {
                    throw new Error()
                }
            case 'PAGINATE_DATA':
                return {
                    ...state,
                    page: action.page,
                    paginated: action.dataset
                        .slice(
                            (action.page - 1) * action.currentPageSize,
                            ((action.page - 1) * action.currentPageSize) + action.currentPageSize
                        )
                }
            case 'CHANGE_PAGESIZE':
                return {
                    ...state,
                    pageSize: action.pageSize,
                    pageCount: action.dataset.length % action.pageSize > 0
                        ? (Math.floor(action.dataset.length / action.pageSize)) + 1
                        : (Math.floor(action.dataset.length / action.pageSize)),
                    paginated: action.dataset
                        .slice(
                            (action.currentPage - 1) * action.pageSize,
                            ((action.currentPage - 1) * action.pageSize) + action.pageSize
                        )
                }

            default:
                throw new Error()
        }
    }, [])
    /**
     * Above codes are Temporary
     */



    const [columnData, setColumnData] = useState(data.headers)
    const [rowData, setRowData] = useReducer(dataReducer, initialDataState)

    return (columnData && rowData && <EBSTableData
        columnData={columnData}
        rowData={rowData}
        setRowData={setRowData}
    />)

}
