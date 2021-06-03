import { useReducer, useState } from "react"
import EBSTableData from "./EBSTableData"


/**
 * A Wrapper component used for state management
 * @param {data} data
 * @returns <EBSTableData />
 */
export default function EBSDatatable({ data }) {

    /**
     * Data search and filter need to be implemented in backend
     * This state management is implemented for development
     */
    const initialRowDataState = {
        rows: data.rows,
        filters: [],
        filteredRows: [],
    }

    const rowDataReducer = (state, action) => {
        switch (action.type) {
            case 'LOAD_DATA':
                return { ...state, rows: action.rows }
            case 'FILTER_DATA':
                return { ...state, filters: action.filters, filteredRows: action.filteredRows }

            default:
                throw new Error()
        }
    }
    /**
     * Above codes are Temporary
     */

    const [dataCount, setDataCount] = useState(data.rows.length)
    const [columnData, setColumnData] = useState(data.headers)
    const [rowData, dispatchRowData] = useReducer(rowDataReducer, initialRowDataState)
    const [pageSize, setPageSize] = useState(20)
    const [pageCount, setPageCount] = useState(
        (dataCount % pageSize) > 0
            ? (Math.floor(dataCount / pageSize)) + 1
            : (Math.floor(dataCount / pageSize))
    )
    const [page, setPage] = useState(dataCount > 0 ? 1 : 0)
    const [hitMin, setHitMin] = useState(true)
    const [hitMax, setHitMax] = useState(false)
    const [sortedOn, setSortedOn] = useState('')
    const [sortedOrder, setSortedOrder] = useState('ASC') // ASC or DSC
    const [enabledColumns, SetEnabledColumns] = useState(
        columnData.map(header => ({
            name: header,
            enabled: true
        }))
    )

    return (data && <EBSTableData
        dataCount={dataCount}
        columnData={columnData}
        rowData={rowData}
        pageSize={pageSize}
        page={page}
        dispatchRowData={dispatchRowData}
    />)

}
