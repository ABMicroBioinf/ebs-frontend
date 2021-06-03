import { useState } from "react"
import EBSTableData from "./EBSTableData"


export default function EBSDatatable({ data }) {

    const [dataCount, setDataCount] = useState(data.rows.length)
    const [columnData, setColumnData] = useState(data.headers)
    const [rowData, setRowData] = useState(data.rows)
    const [pageSize, setPageSize] = useState(20)
    const [pageCount, setPageCount] = useState(
        (dataCount % pageSize) > 0
            ? (Math.floor(dataCount / pageSize)) + 1
            : (Math.floor(dataCount / pageSize))
    )
    const [page, setPage] = useState(dataCount > 0 ? 1 : 0)
    const [hitMin, setHitMin] = useState(true)
    const [hitMax, setHitMax] = useState(false)
    const [keyword, setKeyword] = useState('')
    const [sortedOn, setSortedOn] = useState('')
    const [sortedOrder, setSortedOrder] = useState('ASC') // ASC or DSC
    const [enabledColumns, SetEnabledColumns] = useState(
        columnData.map(header => ({
            name: header,
            enabled: true
        }))
    )

    return (data && <EBSTableData columnData={columnData} rowData={rowData} />)

}
