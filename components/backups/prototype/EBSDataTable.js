import { useReducer, useState } from "react"
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
         * 1. apply filters
         * 2. apply sort
         * 3. apply pagination
         */
        let origin = data.rows
        let filters = []
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
            filters: filters,
            filtered: filtered,
            page: page,
            pageSize: pageSize,
            pageCount: pageCount,
            paginated: paginated,
        }
    })()

    const dataReducer = (state, action) => {
        switch (action.type) {
            case 'LOAD_DATA':
                return { ...state, origin: action.origin }
            case 'FILTER_DATA':
                return { ...state, filters: action.filters, filtered: action.filtered, paginated: action.paginated }
            case 'PAGINATE_DATA':
                return { ...state, page: action.page, pageSize: action.pageSize, pageCount: action.pageCount, paginated: action.paginated }

            default:
                throw new Error()
        }
    }
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
